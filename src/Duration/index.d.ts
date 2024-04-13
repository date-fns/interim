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
}
