import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../utils/Auth";
import { CelebrationRepository } from "../repositories/celebration.repository";
import { CelebrationDto } from "../types/celebration";

const useEditCelebration = () => {
  const { currentUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const editCelebration = (celebration: CelebrationDto) => {
    console.log("useAddCelebration: " + celebration);
    const celebrationRepository = new CelebrationRepository(currentUser!.uid!);
    celebrationRepository.editCelebration(celebration)
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

  return { editCelebration };
};

export default useEditCelebration;
