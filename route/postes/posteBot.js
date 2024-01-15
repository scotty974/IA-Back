import express from "express";
import { PrismaClient } from "@prisma/client";
import { getRandomBot } from "./randomBot.js";
import { expressjwt } from "express-jwt";
import postBoteValidation from "./posteBotValidation.js";
import createHttpError from "http-errors";
import genPrompt from "./prompt/generatePrompt.js";
const router = express.Router();
const prisma = new PrismaClient();

const auth = expressjwt({
  secret: process.env["JWT_KEY"],
  algorithms: ["HS256"],
});

router.post("/poste-bot", async (req, res, next) => {
  let posteData;
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();
  try {
    posteData = postBoteValidation.parse(req.body);
  } catch (error) {
    return next(createHttpError(400, "Invalid data"));
  }

genPrompt()
const id = await getRandomBot()

  await prisma.posts.create({
    data: {
      content: posteData.content,
      bot : {connect :{id : id}},
      created_at: isoDate,
      like : 0
    },
  });
  return res
    .status(200)
    .json({ status: 'success', message: "Création du poste" });



});

export default router;
