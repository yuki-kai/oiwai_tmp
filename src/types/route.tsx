import { CelebrationDto } from "./celebration";

export type RootStackParamList = {
  Add: undefined;
  Detail: {
    celebration: CelebrationDto;
  };
};
