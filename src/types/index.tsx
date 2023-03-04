export const DAYS_IN_YEAR = 364;
export const MONTHS_IN_YEAR = 13;
export const DAYS_IN_MONTH = DAYS_IN_YEAR * MONTHS_IN_YEAR;

export type Luminary = {
  title: string;
  r1: number;
  r2: number;
  t1: {
    from: Date;
    to: Date;
  };
  t2: {
    from: Date;
    to: Date;
  };
  orbitColor: string;
};
