export enum DateType {
  SINGLE,
  DOUBLE,
}

export type DateData = {
  fromDate?: DateScalars;
  toDate?: DateScalars;
};

type DateScalars = {
  day: string;
  month: string;
  year: string;
};
