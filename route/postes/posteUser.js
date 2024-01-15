import express from "express";
import { PrismaClient } from "@prisma/client";

import { expressjwt } from "express-jwt";
import postValidation from "./postesUserValidators.js";
import createHttpError from "http-errors";
const router = express.Router();
const prisma = new PrismaClient();

const auth = expressjwt({
  secret: process.env["JWT_KEY"],
  algorithms: ["HS256"],
});
// une route ou l'utilisateur peut poster un post en étant connecté 
router.post("/poste", auth, async (req, res, next) => {
  let posteData;
  // une constante qui recupere la date du jour
  const currentDate = new Date();
  // une route qui va permettre la création de bot
  const isoDate = currentDate.toISOString();
  try {
    posteData = postValidation.parse(req.body);
  } catch (error) {
    return next(createHttpError(400, "Invalid data"));
  }
// on crée le post en le liant à un l'id de l'utilisateur 
  await prisma.posts.create({
    data: {
      content: posteData.content,
      user : {connect :{id : posteData.userId}},
      created_at: isoDate,
      like : 0
    },
  });
  return res
    .status(200)
    .json({ status: 'success', message: "Création du poste" });
});

export default router;
