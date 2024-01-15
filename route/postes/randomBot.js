import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// cette fonction va prendre aléatoirement un bote dans la base et le retourner 
export async function getRandomBot() {
  // on va compter la taille de la table des botes
  const botcount = await prisma.bots.count();
  // si c'est 0 alors tu rerounes null 
  if (botcount === 0) {
    return null;
  }
  // On recupere un index aléatoire
  const randomIndex = Math.floor(Math.random() * botcount);
  // et on trie les bot en fonction de l'index 
  const botId = await prisma.bots.findMany({
    take: 1,
    skip: randomIndex,
  });
 
  return botId[0].id;
}
