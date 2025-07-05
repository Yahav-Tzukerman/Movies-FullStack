import { db } from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
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

const ordersCollectionRef = collection(db, "orders");

class OrdersService {
  addOrder = async (newOrder) => {
    try {
      const id = uuidv4();
      await setDoc(doc(db, "orders", id), newOrder);
    } catch (error) {
      console.error("Error adding order: ", error);
    }
  };

  updateOrder = async (id, updatedOrder) => {
    const orderDoc = doc(db, "orders", id);
    const obj = { id: id, order: updatedOrder };
    try {
      await updateDoc(orderDoc, obj);
    } catch (error) {
      console.error("Error updating order: ", error);
    }
  };

  deleteOrder = async (id) => {
    const orderDoc = doc(db, "orders", id);
    try {
      await deleteDoc(orderDoc);
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  };

  getOrders = (callback) => {
    const q = query(collection(db, "orders"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(ordersData); // Trigger the callback with the data
    });

    // Return the unsubscribe function to stop listening when needed
    return unsubscribe;
  };
}

export default new OrdersService();
