export class Duration {
  //#region properties

  private parts: number[];

  //#endregion

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

  constructor(...parts: number[]) {
    this.parts = parts;
  }

  //#region prototype

  toString() {
    let string = "P";
    let timeString = "";
    let secString = "";
    let nsString = "";
    let addNs;

    for (let index = 0; index < 10; index++) {
      const value = this.parts[index];
      const code = codes[index];

      if (index < 4 && value) string += `${value}${code}`;
      if (index >= 4 && index < 6 && value) timeString += `${value}${code}`;
      if (index === 6) secString += `${value || 0}`;

      if (index > 6) {
        nsString += `${(value || 0).toString().padStart(3, "0")}`;
        if (value) addNs = true;
      }
    }

    if (addNs) timeString += `${secString}.${nsString}S`;
    else if (this.parts[6]) timeString += `${secString}S`;

    if (timeString) string += `T${timeString}`;

    return string;
  }

  //#endregion

  //#region static

  static from(string: string): Duration {
    const parts = string.match(re)?.slice(1) || [];
    const secWithNs = parts.pop();
    if (secWithNs) {
      const [sec, ns] = secWithNs.split(".");
      parts.push(sec!, ...(ns?.padEnd(3, "0").match(/\d{3}/g) || []));
    }

    return new Duration(...parts.map(Number));
  }

  //#endregion
}

const codes = "YMWDHMS".split("");

const re = new RegExp(
  `P${codes
    .map(
      (code) =>
        `${code === "H" ? "(?:T" : ""}(?:(\\d+(?:\\.\\d+)?)${code})?${
          code === "S" ? ")?" : ""
        }`
    )
    .join("")}`
);
