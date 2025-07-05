import { db, auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { createErrorResponse } from "../utils/errorHandler";

const usersCollectionRef = collection(db, "users");

class UserService {
  isUserExists = async (username) => {
    try {
      const q = query(usersCollectionRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      return false;
    }
  };

  addUser = async (newUser) => {
    try {
      const userExists = await this.isUserExists(newUser.username);
      if (userExists) {
        return createErrorResponse("User already exists");
      }

      const fakeEmail = `${newUser.username}@firebase.com`;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        fakeEmail,
        newUser.password
      ).catch((error) => {
        if (error === "Firebase: Error (auth/email-already-in-use).") {
          return createErrorResponse("User already exists");
        }
        return createErrorResponse(error.message);
      });

      const userId = userCredential.user.uid;
      const { password, ...userWithoutPassword } = newUser;
      const userWithRole = {
        ...userWithoutPassword,
        email: fakeEmail,
        role: newUser.role || "customer",
      };

      return await setDoc(doc(db, "users", userId), userWithRole);
    } catch (error) {
      return createErrorResponse("Error adding user");
    }
  };

  login = async (username, password) => {
    try {
      const fakeEmail = `${username}@firebase.com`;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        fakeEmail,
        password
      );

      const userId = userCredential.user.uid;

      // Fetch the user's role from Firestore
      const userDoc = await getDoc(doc(db, "users", userId));
      if (!userDoc.exists()) {
        return createErrorResponse(`User: ${username} not found`);
      }

      const userData = userDoc.data();
      return {
        data: {
          userId,
          username: userData.username,
          token: userCredential.user.accessToken,
          role: userData.role,
          agreeTerms: userData.agreeTerms,
        },
      };
    } catch (error) {
      if (
        error.message.includes("Firebase: Error (auth/invalid-credential).")
      ) {
        return createErrorResponse("Invalid credentials");
      }

      return createErrorResponse("Error logging in");
    }
  };

  updateUser = async (id, updatedUser) => {
    const userDoc = doc(db, "users", id);
    const userFromDb = await getDoc(userDoc);
    const obj = { id: id, ...updatedUser };
    try {
      // Update the user password in Firebase Auth
      if (updatedUser.password) {
        await this.updateUserPassword(
          updatedUser.password,
          userFromDb.data().password
        );
      }

      await updateDoc(userDoc, obj);
      return { data: true };
    } catch (error) {
      console.error("Error updating user: ", error);
      return createErrorResponse("Error updating user");
    }
  };

  updateUserPassword = async (newPassword, currentPassword) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No authenticated user found.");
      }

      // Fetch the user's email from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        throw new Error("User data not found in Firestore.");
      }

      const userData = userDoc.data();
      const email = userData.email;

      // Reauthenticate the user
      const reauthResponse = await this.reauthenticateUser(
        email,
        currentPassword
      );
      if (reauthResponse.error) {
        return reauthResponse;
      }

      // Update the password
      await updatePassword(user, newPassword);
      return { data: true };
    } catch (error) {
      console.error("Error updating password: ", error);
      return createErrorResponse(error.message || "Error updating password");
    }
  };

  reauthenticateUser = async (email, password) => {
    try {
      const credential = EmailAuthProvider.credential(email, password);
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No authenticated user found.");
      }

      await reauthenticateWithCredential(user, credential);
      return { data: true };
    } catch (error) {
      console.error("Error reauthenticating user: ", error);
      return createErrorResponse(
        error.message || "Error reauthenticating user"
      );
    }
  };

  deleteUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
      return { data: true };
    } catch (error) {
      console.error("Error deleting user: ", error);
      return createErrorResponse("Error deleting user");
    }
  };

  getUsers = (callback) => {
    const q = query(usersCollectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(usersData);
    });
    return unsubscribe;
  };

  getUserRole = async (id) => {
    try {
      const userDocRef = doc(db, "users", id);
      const userSnapshot = await getDoc(userDocRef);
      if (userSnapshot.exists()) {
        return { data: userSnapshot.data().role };
      } else {
        return createErrorResponse("No such user!");
      }
    } catch (error) {
      console.error("Error getting user role: ", error);
      return createErrorResponse("Error getting user role");
    }
  };

  isAdmin = async (id) => {
    const roleResponse = await this.getUserRole(id);
    if (roleResponse.error) return false;
    return roleResponse.data === "admin";
  };

  isCustomer = async (id) => {
    const roleResponse = await this.getUserRole(id);
    if (roleResponse.error) return false;
    return roleResponse.data === "customer";
  };
}

export default new UserService();
