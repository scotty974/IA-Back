import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import uservalidation from "./userFormValidator.js";
import createHttpError from "http-errors";
import generatorUsername from "./generatorUsername.js";
const router = express.Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res, next) => {
  let registerData;
  try {
    // on recupere les données du form
    registerData = uservalidation.parse(req.body);
  } catch (error) {
    // on retourne une erreur si il y a un problème avec les données
    return res
      .status(400)
      .send({ error: "Erreur dans la récupération des données " });
  }
  // on va verifié si il y pas déjà un utilisateur avec ce compte
  const user = await prisma.users.findFirst({
    where: {
      id: registerData.id,
    },
  });
  if(user){
    return next(createHttpError(400, "Un compte existe déjà avec ce compte"))
  }else{
    const hashedPassword = await bcrypt.hash(registerData.password, 10)
    await prisma.users.create({
        data: {
            email : registerData.email, 
            password : hashedPassword, 
            username : generatorUsername()
            
        }
    })
  }


});
