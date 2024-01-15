import express from "express";
import { PrismaClient } from "@prisma/client";
import generatorUsername from "../users/generatorUsername.js";
import getRandomPersonality from "./PersonalityGenerator.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/bot", async (req, res, next) => {
  // une constante qui recupere la date du jour
  const currentDate = new Date();
  // il va transformé la date du jour
  const isoDate = currentDate.toISOString();
  // une route qui va permettre la création de bot
  try {
    const bot = await prisma.bots.create({
      data: {
        username: generatorUsername,
        profile_picture: 'none',
        created_at: isoDate,
        personality: getRandomPersonality(),
        report_nb: 0,
      },
    });
    res.json(bot);
  } catch (error) {
    console.log(error);
  }
});

export default router;
