import { Temporal } from "@js-temporal/polyfill";

export type ActionType =
  | "inspection"
  | "maintenance"
  | "new"
  | "repair"
  | "thrash";
export type TTLKeys = ActionType | "lifetime";

export interface Asset {
  acquisitionDate: Temporal.Instant;
  decomissionDate?: Temporal.PlainDate;
  id: number;
  name: string;
  ttl?: TTL;
  unit?: number;
}

export interface Building {
  constructionDate: Temporal.PlainDate;
  id: number
  unitsCount: number
}

export interface LogEntry {
  assetId: number;
  date: Temporal.Instant;
  type: ActionType;
}

export type TTL = Partial<Record<TTLKeys, number | string>>;

export interface UpcomingEntries {
  assetId: number;
  instant: Temporal.Instant;
  type: TTLKeys;
}
