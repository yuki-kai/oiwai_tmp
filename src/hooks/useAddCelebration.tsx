import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Celebration } from "../models/Celebration";

const useAddCelebration = () => {
  const addCelebration = (celebration: Celebration) => {
    console.log("useAddCelebration: " + celebration);
    const collectionPath = collection(db, celebration.path);
    addDoc(collectionPath, { ...celebration.toDto() })
      .then((docRef) => {
        console.log("成功" + docRef);
      })
      .catch((error) => {
        console.log("失敗" + error);
      })
      .finally(() => {
        console.log("終了");
      });
  };

  return { addCelebration };
};

export default useAddCelebration;
