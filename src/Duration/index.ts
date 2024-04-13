export class Duration {
  years: number | undefined;
  months: number | undefined;
  weeks: number | undefined;
  days: number | undefined;
  hours: number | undefined;
  minutes: number | undefined;
  seconds: number | undefined;
  milliseconds: number | undefined;
  microseconds: number | undefined;
  nanoseconds: number | undefined;

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
  ) {
    Object.assign(this, {
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
      microseconds,
      nanoseconds,
    });
  }

  toString() {
    const parts = ["P"];
    if (this.years) parts.push(`${this.years}Y`);
    if (this.months) parts.push(`${this.months}M`);
    if (this.weeks) parts.push(`${this.weeks}W`);
    if (this.days) parts.push(`${this.days}D`);
    if (
      this.hours ||
      this.minutes ||
      this.seconds ||
      this.milliseconds ||
      this.microseconds ||
      this.nanoseconds
    ) {
      parts.push("T");
      if (this.hours) parts.push(`${this.hours}H`);
      if (this.minutes) parts.push(`${this.minutes}M`);
      if (this.seconds) parts.push(this.seconds.toString());
      if (this.milliseconds || this.microseconds || this.nanoseconds)
        parts.push(".");
      if (this.milliseconds) parts.push(`${this.milliseconds}`);
      if (this.microseconds) parts.push(`${this.microseconds}`);
      if (this.nanoseconds) parts.push(`${this.nanoseconds}`);
      if (this.seconds) parts.push("S");
      return parts.join("");
    }
  }
}
