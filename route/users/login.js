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
    // on recupere les infos qui viennent du body
    loginData = uservalidation.parse(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.issues });
  }
// on va verifier si un utilisateur existe avec ce mail
  const user = await prisma.users.findFirst({
    where: {
      email: loginData.email,
    },
  });
// si il n'y a pas alors mauvais mot de passe ou email
  if (!user) {
    return next(createHttpError(403, "Mauvais mot de passe/email"));
  }
  // on va comparer les mot de passe en base et celui qui rentre
  const passwordIdGood = await bcryt.compare(loginData.password, user.password);
// si le mot de passe est bon alors tu sign un token sinon mot de passe ou email mauvais
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