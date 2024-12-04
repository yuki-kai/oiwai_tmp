export type ColorTheme = {
  Backgroud: {
    primary: string;
    secondary: string;
  };  
  Text: {
    primary: string;
    secondary: string;
  }
};

const DEFAULT_THEME: ColorTheme = {
  Backgroud: {
    primary: "#862040", // ワインレッド
    secondary: "#fff4f7",
  },
  Text: {
    primary: "#ffffff",
    secondary: "#c9a333", // ゴールド
  },
};

const DARK_THEME: ColorTheme = {
  Backgroud: {
    primary: "#202f55", // ネイビー
    secondary: "#fff4f7",
  },
  Text: {
    primary: "#ffffff",
    secondary: "#c9a333",
  },
};

export const themes = {
  default: DEFAULT_THEME,
  dark: DARK_THEME,
};

