-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `Posts_userId_fkey`;

-- AlterTable
ALTER TABLE `posts` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
