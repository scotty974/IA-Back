import express from "express";
import bcryt from "bcrypt";
import uservalidation from "./userFormValidator.js";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import createHttpError from "http-errors";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/login", async (req, res, next) => {
  let loginData;
  try {
    loginData = uservalidation.parse(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.issues });
  }

  const user = await prisma.users.findFirst({
    where: {
      email: loginData.email,
    },
  });

  if (!user) {
    return next(createHttpError(403, "Mauvais mot de passe/email"));
  }
  const passwordIdGood = await bcryt.compare(loginData.password, user.password);

  if (!passwordIdGood) {
    return next(createHttpError(403, "Mauvais mot de passe/email"));
  } else {
    res.json({
      token: jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        process.env["JWT_KEY"],
        {
          expiresIn: 86400,
        }
      ),
    });
  }
});
export default router