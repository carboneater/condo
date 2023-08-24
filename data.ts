import ms from "ms";
import type { ActionType, Asset, LogEntry } from "./schema";
import { Temporal } from "@js-temporal/polyfill";

export const assets = ref<Record<number, Asset>>(
  arrayToMap(
    (
      [
        {
          acquisitionDate: Temporal.Instant.from("2018-12-01T00:00:00Z"),
          id: 0,
          name: "Caulking",
          ttl: {
            inspection: ms("1y"),
            maintenance: ms("5y"),
            lifetime: ms("5y"),
          },
        },
        {
          acquisitionDate: Temporal.Instant.from("2011-01-01T00:00:00Z"),
          id: 1,
          name: "Fire Alarm",
          ttl: { inspection: ms("2y") },
        },
        {
          acquisitionDate: Temporal.Instant.from("2011-01-01T00:00:00Z"),
          id: 2,
          name: "Fire Extinguishers",
          ttl: { inspection: "1y" },
        },
        {
          acquisitionDate: Temporal.Instant.from("2011-01-01T00:00:00Z"),
          id: 3,
          name: "Front Door",
          ttl: { inspection: ms("1y") },
        },
        {
          acquisitionDate: Temporal.Instant.from("2011-01-01T00:00:00Z"),
          id: 4,
          name: "Roof",
          ttl: { inspection: ms("2y") },
        },
        {
          acquisitionDate: Temporal.Instant.from("2011-01-01T00:00:00Z"),
          id: 5,
          name: "Windows",
        },
      ] as Asset[]
    ).concat(
      [1, 2, 3, 4, 5, 6, 7, 8].flatMap((unit) => [
        {
          acquisitionDate: Temporal.Instant.from(
            `2011-${String(unit).padStart(2, "0")}-01T00:00:00Z`
          ),
          id: unit * 10,
          name: "Front Balcony Door",
          ttl: { inspection: ms("1y") },
          unit,
        },
        {
          acquisitionDate: Temporal.Instant.from(
            `2011-${String(unit).padStart(2, "0")}-01T00:00:00Z`
          ),
          id: unit * 10 + 1,
          name: "Back Balcony Door",
          ttl: { inspection: ms("1y") },
          unit,
        },
        {
          acquisitionDate: Temporal.Instant.from(
            `2013-${String(unit).padStart(2, "0")}-01T00:00:00Z`
          ),
          id: unit * 10 + 2,
          name: "Smoke Detector",
          ttl: { lifetime: ms("10y") },
          unit,
        },
        {
          acquisitionDate: Temporal.Instant.from(
            `2022-${String(unit).padStart(2, "0")}-01T00:00:00Z`
          ),
          id: unit * 10 + 3,
          name: "Water Heater",
          ttl: { lifetime: ms("10y") },
          unit,
        },
      ]) as Asset[]
    ),
    "id"
  )
);

export const actionTypes: ActionType[] = [
  "inspection",
  "maintenance",
  "repair",
];
export const logs = ref<LogEntry[]>([
  {
    assetId: 1,
    date: Temporal.Instant.from("2022-04-01T00:00:00Z"),
    type: "inspection",
  },
  {
    assetId: 3,
    date: Temporal.Instant.from("2022-10-01t00:00:00Z"),
    type: "inspection",
  },
  {
    assetId: 4,
    date: Temporal.Instant.from("2021-07-01T00:00:00Z"),
    type: "repair",
  },
  {
    assetId: 0,
    date: Temporal.Instant.from("2020-01-01T00:00:00Z"),
    type: "maintenance",
  },
]);

function arrayToMap<T extends object>(array: T[], index: keyof T) {
  return Object.fromEntries(array.map((entry) => [entry[index], entry]));
}
