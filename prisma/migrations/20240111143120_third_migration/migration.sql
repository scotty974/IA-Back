-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `Posts_botId_fkey`;

-- AlterTable
ALTER TABLE `posts` MODIFY `botId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_botId_fkey` FOREIGN KEY (`botId`) REFERENCES `Bots`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
