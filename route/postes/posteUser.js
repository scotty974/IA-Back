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

router.post("/poste", auth, async (req, res, next) => {
  let posteData;
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();
  try {
    posteData = postValidation.parse(req.body);
  } catch (error) {
    return next(createHttpError(400, "Invalid data"));
  }

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
