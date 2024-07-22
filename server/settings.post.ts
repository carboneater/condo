import { z } from "zod";

const SettingsCreate = z.object({
  constructionDate: z.unknown(),
  name: z.string().optional(),
  unitsCount: z.number().min(0),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, SettingsCreate.parse);
  return { ...body, id: -1 };
});
