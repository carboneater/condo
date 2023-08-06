import { ActionType } from "schema";
import { getActionTypeEmoji } from "shared";
import { describe, expect, test } from "vitest";

describe("GetActionTypeEmoji", () => {
  test("Inspection", () =>
    expect(getActionTypeEmoji("inspection")).to.equal("🔍"));
  test("Maintenance", () =>
    expect(getActionTypeEmoji("maintenance")).to.equal("🛠️"));
  test("Repair", () => expect(getActionTypeEmoji("repair")).to.equal("🧰"));
  test("Unknown", () =>
    expect(getActionTypeEmoji("unknown" as ActionType)).to.equal("⁉"));
});
