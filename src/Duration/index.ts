export class Duration {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  microseconds: number;
  nanoseconds: number;

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
    this.years = years || 0;
    this.months = months || 0;
    this.weeks = weeks || 0;
    this.days = days || 0;
    this.hours = hours || 0;
    this.minutes = minutes || 0;
    this.seconds = seconds || 0;
    this.milliseconds = milliseconds || 0;
    this.microseconds = microseconds || 0;
    this.nanoseconds = nanoseconds || 0;
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

      const hasNanoseconds =
        this.milliseconds || this.microseconds || this.nanoseconds;

      if (this.seconds || hasNanoseconds) parts.push(this.seconds.toString());

      if (hasNanoseconds) {
        parts.push(".");
        parts.push(this.milliseconds.toString().padStart(3, "0"));
        parts.push(this.microseconds.toString().padStart(3, "0"));
        parts.push(this.nanoseconds.toString().padStart(3, "0"));
      }

      if (this.seconds || hasNanoseconds) parts.push("S");
    }
    return parts.join("");
  }
}
