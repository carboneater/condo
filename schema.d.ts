export type ActionType = "inspection" | "maintenance" | "repair";

export interface Asset {
  name: string;
  id: number;
  ttl?: Partial<
    { lifetime?: number | string } & Record<ActionType, number | string>
  >;
  unit?: number;
}

export interface LogEntry {
  assetId: number;
  date: string;
  type: ActionType;
}
