declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}

interface ITheme {
  color: {
    background_primary: string;
    background_secondary: string;
    background_active: string;
    background_alternative: string;
    text_primary: string;
    text_secondary: string;
    primary: string;
    secondary: string;
  };
  shadow: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
}

export const theme: ITheme = {
  color: {
    background_primary: "#E2E1E0",
    background_secondary: "#fafafa",
    background_active: "#437DDB",
    background_alternative: "#D7D6D5",
    text_primary: "#292929",
    text_secondary: "#756F6C",
    primary: "#74C2E1",
    secondary: "#B5DCEC",
  },
  shadow: {
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    xxl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
};
