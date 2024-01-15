import { z } from "zod";
// un object de validation pour la création de post avec le bot
const postBoteValidation = z.object({
  
  content: z.string(),
});

export default postBoteValidation;
