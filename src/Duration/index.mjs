export class Duration {
  constructor(...parts) {
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

  static from(string) {
    const parts = string.match(re)?.slice(1) || [];
    return new Duration(...parts.map(Number));
  }

  //#endregion
}

const props =
  "years,months,weeks,days,hours,minutes,seconds,milliseconds,microseconds,nanoseconds".split(
    ","
  );

const codes = "YMWDHMS".split("");

const re =
  /P(?:(\d+(?:[\.,]\d+)?)Y)?(?:(\d+(?:[\.,]\d+)?)M)?(?:(\d+(?:[\.,]\d+)?)W)?(?:(\d+(?:[\.,]\d+)?)D)?(?:T(?:(\d+(?:[\.,]\d+)?)H)?(?:(\d+(?:[\.,]\d+)?)M)?(?:(\d+)(?:[\.,](?:(\d{0,3})(?:(\d{0,3})(?:(\d{0,3})))?))?S)?)?/;

props.map((prop, index) =>
  Object.defineProperty(Duration.prototype, prop, {
    get() {
      return this.parts[index] || 0;
    },
  })
);
