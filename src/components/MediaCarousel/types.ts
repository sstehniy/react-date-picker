import { Link } from "../../types";

export type Photo = {
  src: string;
  alt: string;
  text?: string;
  links?: Link[];
};
