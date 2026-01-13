import { z } from "zod";
const ID_REGEX =
  /(^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$)|(^[a-f\d]{24}$)/i;

export const IdValueSchema = (message: string = "Invalid ID format") => {
  return z.string().trim().regex(ID_REGEX, message);
};
