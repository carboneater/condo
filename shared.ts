import type {
  ActionType,
  Asset,
  LogEntry,
  TTL,
  TTLKeys,
  UpcomingEntries,
} from "./schema";
import { Temporal } from "@js-temporal/polyfill";
import ms from "ms";

type AssetMap = Record<number, Asset>;

export function getActionTypeEmoji(type: TTLKeys) {
  switch (type) {
    case "inspection":
      return "🔍";
      break;
    case "lifetime":
      return "🪦";
      break;
    case "maintenance":
      return "🛠️";
      break;
    case "repair":
      return "🧰";
      break;
    default:
      return "⁉";
  }
}

export function upcomingTasks(
  assets: Record<number, Asset>,
  logs: LogEntry[]
): UpcomingEntries[] {
  const activeLogs = stillValidLogEntries({ assets, logs }).concat(
    Object.values(assets)
      .filter(({ acquisitionDate }) => acquisitionDate)
      .map(({ acquisitionDate, id }) => ({
        assetId: id,
        date: acquisitionDate,
        type: "lifetime" as ActionType,
      }))
  );
  const assetsWithTTLs = filterAssetsWithTTLs(assets);

  const upcomingMap: Record<
    number,
    Partial<Record<TTLKeys, Temporal.Instant>>
  > = {};
  for (const { assetId, date, type } of activeLogs) {
    const asset = assetsWithTTLs[assetId];
    const ttl = asset?.ttl?.[type];
    if (ttl) {
      if (!upcomingMap[assetId]) {
        upcomingMap[assetId] = {};
      }
      const expiry = ttlExpiry(date, ttl);
      const instant = upcomingMap[assetId][type];
      if (instant) {
        if (Temporal.Instant.compare(instant, expiry) === -1) {
          upcomingMap[assetId][type] = expiry;
        }
      } else {
        upcomingMap[assetId][type] = expiry;
      }
    }
  }

  for (const [assetId, ttl, type] of Object.values(assetsWithTTLs)
    .filter((v) => v.ttl)
    .flatMap((v) =>
      Object.entries(v.ttl ?? ({} as TTL)).map(
        ([type, ttl]) => [v.id, ttl, type as TTLKeys] as const
      )
    )) {
    const asset = assetsWithTTLs[assetId];

    if (!upcomingMap[assetId]) {
      upcomingMap[assetId] = {};
    }
    if (!upcomingMap[assetId][type]) {
      upcomingMap[assetId][type] == Temporal.Now.instant();
    }
  }

  return Object.entries(upcomingMap)
    .flatMap(([assetId, v]) =>
      Object.entries(v).flatMap(([type, instant]) => ({
        assetId: Number(assetId),
        instant,
        type: type as TTLKeys,
      }))
    )
    .sort((a, b) => Temporal.Instant.compare(a.instant, b.instant));
}

function filterAssetsWithTTLs(assets: AssetMap): AssetMap {
  return Object.fromEntries(
    Object.entries(assets).filter(
      ([id, { ttl }]) => ttl && Object.values(ttl).some((value) => value)
    )
  );
}

function stillValidLogEntries({
  assets,
  cutoffDate,
  logs,
}: {
  assets: Record<number, Asset>;
  cutoffDate?: Temporal.Instant;
  logs: LogEntry[];
}): LogEntry[] {
  return logs.filter(({ assetId, date, type }) => {
    const ttl = assets[assetId]?.ttl;
    if (ttl) {
      const assetTTL = ttl[type];
      if (assetTTL) {
        return (
          Temporal.Instant.compare(
            ttlExpiry(date, assetTTL),
            cutoffDate || Temporal.Now.instant()
          ) === 1
        );
      } else {
        return false;
      }
    } else {
      return false;
    }
  });
}

function ttlExpiry(
  date: Temporal.Instant,
  ttl: number | string
): Temporal.Instant {
  return date.add(
    Temporal.Duration.from({
      milliseconds: typeof ttl === "number" ? ttl : ms(ttl),
    })
  );
}
