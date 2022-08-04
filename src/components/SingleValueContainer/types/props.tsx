export type SingleValueContainerProps = {
  title: string;
  singleValueItems: Array<SingleValue>;
  animationDuration?: number;
  animationDelay?: number;
};

export type SingleValue = {
  label: string;
  value: number;
  percentage?: number;
  color?: string;
  animationDuration?: number;
  animationDelay?: number;
};
