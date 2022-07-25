export type SingleValueContainerProps = {
  title: string;
  singleValueItems: Array<SingleValue>;
};

export type SingleValue = {
  label: string;
  value: number | string;
  percentage?: number;
  color?: string;
};
