import { Temporal } from "@js-temporal/polyfill";

export type ActionType = "inspection" | "maintenance" | "repair";
export type TTLKeys = ActionType | "lifetime";

export interface Asset {
  name: string;
  id: number;
  ttl?: TTL;
  unit?: number;
}

export interface LogEntry {
  assetId: number;
  date: string;
  type: ActionType;
}

export type TTL = Partial<Record<TTLKeys, number | string>>;

export interface UpcomingEntries {
  assetId: number;
  instant: Temporal.Instant;
  type: TTLKeys;
}
