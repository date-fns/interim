export class Duration {
  constructor(...parts) {
    let sum = 0;
    this.parts = parts.map((part) => {
      sum += part;
      return Math.abs(part);
    });
    this.sign_ = Math.sign(sum);
  }

  //#region prototype

  get sign() {
    return this.sign_;
  }

  get blank() {
    return this.sign_ === 0;
  }

  abs() {
    return new Duration(...this.parts);
  }

  toString() {
    let string = `${this.sign_ === -1 ? "-" : ""}P`;
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

  valueOf() {
    throw new TypeError();
  }

  //#endregion

  //#region static

  static from(source) {
    let parts;
    if (typeof source === "string") {
      const [sign, ...strs] = source.match(re)?.slice(1) || [];
      const mul = sign === "-" ? -1 : 1;
      parts = strs.map((str) => +str * mul);
    }
    return new Duration(...(parts || props.map((prop) => source[prop])));
  }

  //#endregion
}

const props =
  "years,months,weeks,days,hours,minutes,seconds,milliseconds,microseconds,nanoseconds".split(
    ","
  );

const codes = "YMWDHMS".split("");

const re =
  /(-?)P(?:(\d+(?:[\.,]\d+)?)Y)?(?:(\d+(?:[\.,]\d+)?)M)?(?:(\d+(?:[\.,]\d+)?)W)?(?:(\d+(?:[\.,]\d+)?)D)?(?:T(?:(\d+(?:[\.,]\d+)?)H)?(?:(\d+(?:[\.,]\d+)?)M)?(?:(\d+)(?:[\.,](?:(\d{0,3})(?:(\d{0,3})(?:(\d{0,3})))?))?S)?)?/;

props.map((prop, index) =>
  Object.defineProperty(Duration.prototype, prop, {
    get() {
      return this.parts[index] || 0;
    },
  })
);
