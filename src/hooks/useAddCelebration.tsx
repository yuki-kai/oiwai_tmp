import { Celebration } from "../models/Celebration";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../utils/Auth";
import { CelebrationRepository } from "../repositories/celebration.repository";

const useAddCelebration = () => {
  const { currentUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const addCelebration = (celebration: Celebration) => {
    console.log("useAddCelebration: " + celebration);
    const celebrationRepository = new CelebrationRepository(currentUser!.uid!);
    celebrationRepository.createCelebration(celebration)
      .then((docRef) => {
        console.log("成功" + docRef);
        navigation.goBack();
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
