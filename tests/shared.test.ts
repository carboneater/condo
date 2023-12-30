import { Temporal } from "@js-temporal/polyfill";
import type { ActionType } from "../schema";
import {
  getActionTypeEmoji,
  instantToISODateString,
  stillValidLogEntries,
  upcomingTasks,
} from "../shared";
import { describe, expect, test } from "vitest";

describe("GetActionTypeEmoji", () => {
  test("Inspection", () =>
    expect(getActionTypeEmoji("inspection")).to.equal("🔍"));
  test("Lifetime", () => expect(getActionTypeEmoji("lifetime")).to.equal("🪦"));
  test("Maintenance", () =>
    expect(getActionTypeEmoji("maintenance")).to.equal("🛠️"));
  test("Repair", () => expect(getActionTypeEmoji("repair")).to.equal("🧰"));
  test("Unknown", () =>
    expect(getActionTypeEmoji("unknown" as ActionType)).to.equal("⁉"));
});

describe("instantToDateString", () => {
  test(() => instantToISODateString(Temporal.Now.instant()));
});

describe("Still Valid Log Entries", () => {
  test("Acquisition Date but no maintenance yet, no TTL", () =>
    expect(
      stillValidLogEntries({
        assets: {
          1: {
            acquisitionDate: Temporal.Instant.from("2012-01-01T00:00:00Z"),
            id: -1,
            name: "test",
            ttl: {
              // Default to 1y inspection
            },
          },
        },
        logs: [],
      }),
    ).to.deep.equal([]));
});

describe("Upcoming Tasks", () => {
  test("Acquisition Date but no Maintenance Yet, 9Mo TTL", () => {
    expect(
      upcomingTasks(
        {
          1: {
            acquisitionDate: Temporal.Instant.from("2012-01-01T00:00:00Z"),
            id: 1,
            name: "test",
            ttl: {
              inspection: "270d",
            },
          },
        },
        [],
      ),
    ).to.deep.equal([
      {
        assetId: 1,
        instant: Temporal.Instant.from("2012-09-27T00:00:00Z"),
        type: "inspection",
      },
    ]);
  });

  test("Acquisition Date but no Maintenance Yet, default TTL", () => {
    expect(
      upcomingTasks(
        {
          1: {
            acquisitionDate: Temporal.Instant.from("2012-01-01T00:00:00Z"),
            id: 1,
            name: "test",
            ttl: {},
          },
        },
        [],
      ),
    ).to.deep.equal([]);
  });
});
