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
    select_primary: string;
    select_secondary: string;
    btn_primary: string;
    btn_primary_hover: string;
    btn_secondary: string;
    btn_secondary_hover: string;
    btn_danger: string;
    btn_danger_hover: string;
  };
  shadow: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    md_invert: string;
    button: string;
    button_sm: string;
  };
}

export const theme: ITheme = {
  color: {
    background_primary: "#E2E1E0",
    background_secondary: "#fafafa",
    background_active: "#437DDB",
    background_alternative: "#D7D6D5",
    text_primary: "#fafafa",
    text_secondary: "#756F6C",
    select_primary: "#74C2E1",
    select_secondary: "#B5DCEC",
    btn_primary: "#2976CE",
    btn_primary_hover: "#2261AA",
    btn_danger: "#E60451",
    btn_danger_hover: "#C90345",
    btn_secondary: "#E0E0E0",
    btn_secondary_hover: "#CCCCCC",
  },
  shadow: {
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    xxl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    md_invert:
      "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    button: "0px 5px 17px 0 rgba(0, 0, 0, 0.4)",
    button_sm:
      "0 1px 5px 0 rgba(0, 0, 0, 0.4), 0 1px 5px 0 rgba(0, 0, 0, 0.06)",
  },
};
