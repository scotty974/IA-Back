import { z } from "zod";

const postBoteValidation = z.object({
  
  content: z.string(),
});

export default postBoteValidation;
