import type { ActionType, Asset, LogEntry } from "./schema";

export const assets = ref<Record<number, Asset>>(
  arrayToMap(
    [
      { id: 0, name: "Caulking" },
      { id: 1, name: "Fire Alarm" },
      { id: 2, name: "Front Door" },
      { id: 3, name: "Roof" },
      { id: 4, name: "Windows" },
    ].concat(
      [1, 2, 3, 4, 5, 6, 7, 8].flatMap((unit) => [
        { id: unit * 10, name: "Front Balcony Door", unit },
        { id: unit * 10 + 1, name: "Back Balcony Door", unit },
        { id: unit * 10 + 2, name: "Water Heater", unit },
      ])
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
  { assetId: 1, date: "2023-04", type: "inspection" },
  { assetId: 3, date: "2022-07", type: "repair" },
  { assetId: 0, date: "2020-01", type: "maintenance" },
]);

function arrayToMap<T extends object>(array: T[], index: keyof T) {
  return Object.fromEntries(array.map((entry) => [entry[index], entry]));
}
