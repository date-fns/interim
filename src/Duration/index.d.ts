export class Duration {
  constructor(
    years?: number | undefined,
    months?: number | undefined,
    weeks?: number | undefined,
    days?: number | undefined,
    hours?: number | undefined,
    minutes?: number | undefined,
    seconds?: number | undefined,
    milliseconds?: number | undefined,
    microseconds?: number | undefined,
    nanoseconds?: number | undefined
  );

  toString(): string;

  get years(): number;

  get months(): number;

  get weeks(): number;

  get days(): number;

  get hours(): number;

  get minutes(): number;

  get seconds(): number;

  get milliseconds(): number;

  get microseconds(): number;

  get nanoseconds(): number;

  static from(string: string): Duration;
}
