export interface DurationLike {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
  microseconds?: number;
  nanoseconds?: number;
}

export type DurationSign = -1 | 0 | 1;

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

  abs(): Duration;

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

  get sign(): DurationSign;

  get blank(): boolean;

  static from(source: string | DurationLike): Duration;
}
