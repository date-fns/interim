import { describe, expect, it } from "vitest";
import { Duration } from ".";

describe("Duration", () => {
  describe("class", () => {
    describe("constructor", () => {
      it("creates a new instance", () => {
        const duration = new Duration(1, 2, 3, 4, 5, 6, 7, 987, 654, 321);
        expect(duration.toString()).toBe("P1Y2M3W4DT5H6M7.987654321S");
      });

      it("allows to create negative ", () => {
        const duration = new Duration(
          -1,
          -2,
          -3,
          -4,
          -5,
          -6,
          -7,
          -987,
          -654,
          -321
        );
        expect(duration.toString()).toBe("-P1Y2M3W4DT5H6M7.987654321S");
      });
    });

    describe("from", () => {
      describe("string", () => {
        it("cretes a new instance", () => {
          const duration = Duration.from("P1Y2M3W4DT5H6M7.987654321S");
          expect(duration.toString()).toBe("P1Y2M3W4DT5H6M7.987654321S");
        });

        it("parses date-only", () => {
          const duration = Duration.from("P2W4D");
          expect(duration.toString()).toBe("P2W4D");
        });

        it("parses time-only", () => {
          const duration = Duration.from("PT2H");
          expect(duration.toString()).toBe("PT2H");
        });

        it("parses seconds", () => {
          const duration = Duration.from("PT2S");
          expect(duration.toString()).toBe("PT2S");
        });

        it("parses nanoseconds", () => {
          const duration = Duration.from("PT0.000000001S");
          expect(duration.toString()).toBe("PT0.000000001S");
        });

        it("supports commas", () => {
          const duration = Duration.from("PT0,000000001S");
          expect(duration.toString()).toBe("PT0.000000001S");
        });

        it("allows sign", () => {
          const duration = Duration.from("-P1Y2M3W4DT5H6M7.987654321S");
          expect(duration.toString()).toBe("-P1Y2M3W4DT5H6M7.987654321S");
        });
      });

      describe("Duration-like", () => {
        it("cretes a new instance", () => {
          const duration = Duration.from({
            years: 1,
            months: 2,
            weeks: 3,
            days: 4,
            hours: 5,
            minutes: 6,
            seconds: 7,
            milliseconds: 987,
            microseconds: 654,
            nanoseconds: 321,
          });
          expect(duration.toString()).toBe("P1Y2M3W4DT5H6M7.987654321S");
        });
      });
    });

    describe("compare", () => {
      it.todo("compares two instances");
    });
  });

  describe("prototype", () => {
    describe("properties", () => {
      describe("years", () => {
        it("returns the years part of the duration", () => {
          expect(new Duration(1).years).toBe(1);
          expect(new Duration().years).toBe(0);
        });
      });

      describe("months", () => {
        it("returns the months part of the duration", () => {
          expect(new Duration(1, 2).months).toBe(2);
          expect(new Duration(1).months).toBe(0);
        });
      });

      describe("weeks", () => {
        it("returns the weeks part of the duration", () => {
          expect(new Duration(1, 2, 3).weeks).toBe(3);
          expect(new Duration(1, 2).weeks).toBe(0);
        });
      });

      describe("days", () => {
        it("returns the days part of the duration", () => {
          expect(new Duration(1, 2, 3, 4).days).toBe(4);
          expect(new Duration(1, 2, 3).days).toBe(0);
        });
      });

      describe("hours", () => {
        it("returns the hours part of the duration", () => {
          expect(new Duration(1, 2, 3, 4, 5).hours).toBe(5);
          expect(new Duration(1, 2, 3, 4).hours).toBe(0);
        });
      });

      describe("minutes", () => {
        it("returns the minutes part of the duration", () => {
          expect(new Duration(1, 2, 3, 4, 5, 6).minutes).toBe(6);
          expect(new Duration(1, 2, 3, 4, 5).minutes).toBe(0);
        });
      });

      describe("seconds", () => {
        it("returns the seconds part of the duration", () => {
          expect(new Duration(1, 2, 3, 4, 5, 6, 7).seconds).toBe(7);
          expect(new Duration(1, 2, 3, 4, 5, 6).seconds).toBe(0);
        });
      });

      describe("milliseconds", () => {
        it("returns the milliseconds part of the duration", () => {
          expect(new Duration(1, 2, 3, 4, 5, 6, 7, 987).milliseconds).toBe(987);
          expect(new Duration(1, 2, 3, 4, 5, 6, 7).milliseconds).toBe(0);
        });
      });

      describe("microseconds ", () => {
        it("returns the microseconds part of the duration", () => {
          expect(new Duration(1, 2, 3, 4, 5, 6, 7, 987, 654).microseconds).toBe(
            654
          );
          expect(new Duration(1, 2, 3, 4, 5, 6, 7, 987).microseconds).toBe(0);
        });
      });

      describe("nanoseconds  ", () => {
        it("returns the nanoseconds part of the duration", () => {
          expect(
            new Duration(1, 2, 3, 4, 5, 6, 7, 987, 654, 321).nanoseconds
          ).toBe(321);
          expect(new Duration(1, 2, 3, 4, 5, 6, 7, 987, 654).nanoseconds).toBe(
            0
          );
        });
      });

      describe("sign", () => {
        it("returns -1 for a negative duration", () => {
          expect(new Duration(-1).sign).toBe(-1);
        });

        it("returns 0 for a zero-length duration", () => {
          expect(new Duration().sign).toBe(0);
        });

        it("returns 1 for a positive duration", () => {
          expect(new Duration(1).sign).toBe(1);
        });
      });

      describe("blank", () => {
        it("returns true if the duration is zero-length", () => {
          expect(new Duration().blank).toBe(true);
          expect(new Duration(0, 0, 0, 0, 0, 0, 0, 0, 0, 0).blank).toBe(true);
          expect(new Duration(1).blank).toBe(false);
        });
      });
    });

    describe("methods", () => {
      describe("with", () => {
        it("overrides the specified parts of the duration", () => {
          const duration = new Duration(1, 2, 3, 4, 5, 6, 7, 987, 654, 321);
          expect(
            duration
              .with({
                years: 3,
                weeks: 4,
                hours: 3,
                seconds: 0,
                microseconds: 343,
              })
              .toString()
          ).toBe("P3Y2M4W4DT3H6M0.987343321S");
        });
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
        it("always return a positive duration", () => {
          expect(new Duration(-1).abs().sign).toBe(1);
          expect(new Duration().abs().sign).toBe(0);
          expect(new Duration(1).abs().sign).toBe(1);
        });

        it("returns a new instance", () => {
          const duration = new Duration(-1);
          expect(duration.abs()).not.toBe(duration);
        });
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
        it("throws TypeError", () => {
          expect(() => new Duration().valueOf()).toThrow(TypeError);
        });
      });
    });
  });
});
