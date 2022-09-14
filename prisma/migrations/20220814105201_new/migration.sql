-- DropForeignKey
ALTER TABLE "BestPrice" DROP CONSTRAINT "BestPrice_searchId_fkey";

-- AddForeignKey
ALTER TABLE "BestPrice" ADD CONSTRAINT "BestPrice_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "Search"("id") ON DELETE CASCADE ON UPDATE CASCADE;
