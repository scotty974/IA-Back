import { z } from "zod";
// un objetc pour valider le form de la création de post 
const postValidation = z.object({
  userId: z.number(),
  content: z.string(),
});

export default postValidation;
