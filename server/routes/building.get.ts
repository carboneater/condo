import { Temporal } from "@js-temporal/polyfill";
import { Building } from "~/schema";
import sql from "../../sql";

export default eventHandler(async () => {
  const result = await sql`SELECT * FROM buildings;`;
  return {
    constructionDate: Temporal.PlainDate.from(
      result[0].construction_date.toISOString().split("T")[0]
    ),
    id: result[0].id,
    name: result[0].name,
    unitsCount: result[0].unit_count,
  } as Building;
});
