import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { Temporal } from "@js-temporal/polyfill";

import Logs from "../components/log.vue";
import { Asset, LogEntry } from "schema";

describe("Logs", () => {
  it("is a Vue instance", () => {
    expect(Logs).toBeTruthy;
    const wrapper = mount(Logs, {
      props: {
        assets: {
          1: {
            acquisitionDate: Temporal.Now.instant(),
            id: 1,
            name: "Test",
          },
          2: { acquisitionDate: Temporal.Now.instant(), id: 2, name: "Fail" },
        } as Record<number, Asset>,
        logs: [
          {
            assetId: 1,
            date: Temporal.Instant.from("2023-01-01T00:00:00Z"),
            type: "inspection",
          },
        ] as LogEntry[],
      },
    });
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.text()).to.contain("Test");
    expect(wrapper.text()).to.contain("2023-01-01");
    expect(wrapper.text()).not.to.contain("Fail");
  });
});
