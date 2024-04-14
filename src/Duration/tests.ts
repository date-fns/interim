import { describe, expect, it } from "vitest";
import { Duration } from ".";

describe("Duration", () => {
  describe("class", () => {
    describe("constructor", () => {
      it("creates a new instance", () => {
        const duration = new Duration(1, 2, 3, 4, 5, 6, 7, 987, 654, 321);
        expect(duration.toString()).toBe("P1Y2M3W4DT5H6M7.987654321S");
      });
    });

    describe("from", () => {
      it("cretes a new instance from a string", () => {
        const duration = Duration.from("P1Y2M3W4DT5H6M7.987654321S");
        expect(duration.toString()).toBe("P1Y2M3W4DT5H6M7.987654321S");
      });

      it.todo("cretes a new instance from a Duration-like object");
    });

    describe("compare", () => {
      it.todo("compares two instances");
    });
  });

  describe("prototype", () => {
    describe("properties", () => {
      describe("years", () => {
        it.todo("returns the years part of the duration");
      });

      describe("months", () => {
        it.todo("returns the months part of the duration");
      });

      describe("weeks", () => {
        it.todo("returns the weeks part of the duration");
      });

      describe("days", () => {
        it.todo("returns the days part of the duration");
      });

      describe("hours", () => {
        it.todo("returns the hours part of the duration");
      });

      describe("minutes", () => {
        it.todo("returns the minutes part of the duration");
      });

      describe("seconds", () => {
        it.todo("returns the seconds part of the duration");
      });

      describe("milliseconds", () => {
        it.todo("returns the milliseconds part of the duration");
      });

      describe("microseconds ", () => {
        it.todo("returns the microseconds part of the duration");
      });

      describe("nanoseconds  ", () => {
        it.todo("returns the nanoseconds part of the duration");
      });

      describe("sign", () => {
        it.todo("returns the sign of the duration");
      });

      describe("blank", () => {
        it.todo("returns true if the duration is zero-length");
      });
    });

    describe("methods", () => {
      describe("with", () => {
        it.todo("overrides the specified parts of the duration");
      });

      describe("add", () => {
        it.todo("adds two durations");
      });

      describe("subtract", () => {
        it.todo("subtracts two durations");
      });

      describe("negated", () => {
        it.todo("returns a duration with the sign negated");
      });

      describe("abs", () => {
        it.todo("returns a duration with the sign removed");
      });

      describe("round", () => {
        it.todo("rounds the duration to the specified precision");
      });

      describe("total", () => {
        it.todo("returns the total duration in the specified unit");
      });

      describe("toString", () => {
        it("formats only given parts", () => {
          const duration = new Duration(
            1,
            undefined,
            3,
            undefined,
            5,
            undefined
          );
          expect(duration.toString()).toBe("P1Y3WT5H");
        });

        it("omits time designator if time is missing", () => {
          const duration = new Duration(1, undefined, 3);
          expect(duration.toString()).toBe("P1Y3W");
        });

        it("formats seconds", () => {
          const duration = new Duration(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            1
          );
          expect(duration.toString()).toBe("PT1S");
        });

        it("formats seconds with nanoseconds", () => {
          const duration = new Duration(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            1
          );
          expect(duration.toString()).toBe("PT0.000000001S");
        });
      });

      describe("toJSON", () => {
        it.todo("returns a string representation of the duration");
      });

      describe("toLocaleString", () => {
        it.todo("returns the duration as a localized string");
      });

      describe("valueOf", () => {
        it.todo("overrides Object.prototype.valueOf and throws an exception");
      });
    });
  });
});
