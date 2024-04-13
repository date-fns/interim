const codes = "YMWDHMS".split("");

export class Duration {
  constructor(...parts) {
    this.parts = parts.map((part) => part || 0);
  }

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
      if (index === 6) secString += `${value}`;

      if (index > 6) {
        nsString += `${value.toString().padStart(3, "0")}`;
        if (value) addNs = true;
      }
    }

    if (addNs) timeString += `${secString}.${nsString}S`;
    else if (this.parts[6]) timeString += `${secString}S`;

    if (timeString) string += `T${timeString}`;

    return string;
  }
}
