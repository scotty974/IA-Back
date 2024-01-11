import { z } from "zod";

const postValidation = z.object({
  userId: z.number(),
  content: z.string(),
});

export default postValidation;
