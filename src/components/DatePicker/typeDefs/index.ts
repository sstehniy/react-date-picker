export enum DateType {
  SINGLE,
  DOUBLE,
}

export type SelectedDateData = {
  fromDate?: DateScalars;
  toDate?: DateScalars;
};

export type DateScalars = {
  day: string;
  month: string;
  year: string;
};

export type DateData = {
  date: number;
  day: number;
  month: number;
  year: number;
  disabled: boolean;
};
