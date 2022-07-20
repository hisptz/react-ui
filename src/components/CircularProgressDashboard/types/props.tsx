export type CircularDashboardProps = {
  strokeStyle?: {
    width?: number | string;
    color?: string;
    [key: string]: any;
  };
  textStyle?: {
    color?: string;
    fontSize?: number | string;
    fontWeight?: number | string;
    [key: string]: any;
  };
  value?: number;
  numerator?: number;
  denominator?: number;
  size: string | number;
};
