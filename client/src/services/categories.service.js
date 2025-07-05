import { db } from "../firebase/firebase";
import {
  collection,
  query,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const categoriesCollectionRef = collection(db, "categories");

class CategoriesService {
  addCategory = async (newCategory) => {
    try {
      const id = uuidv4();
      await setDoc(doc(db, "categories", id), newCategory);
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };

  updateCategory = async (id, updatedCategory) => {
    const categoryDoc = doc(db, "categories", id);
    const obj = { id: id, category: updatedCategory };
    try {
      await updateDoc(categoryDoc, obj);
    } catch (error) {
      console.error("Error updating category: ", error);
    }
  };

  deleteCategory = async (id) => {
    const categoryDoc = doc(db, "categories", id);
    try {
      await deleteDoc(categoryDoc);
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };

  getCategories = (callback) => {
    const q = query(collection(db, "categories"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const categoriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(categoriesData); // Trigger the callback with the data
    });

    // Return the unsubscribe function to stop listening when needed
    return unsubscribe;
  };
}

export default new CategoriesService();
