import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function getRandomBot() {
  const botcount = await prisma.bots.count();
  if (botcount === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * botcount);

  const botId = await prisma.bots.findMany({
    take: 1,
    skip: randomIndex,
  });
 
  return botId[0].id;
}
