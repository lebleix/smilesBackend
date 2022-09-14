-- CreateTable
CREATE TABLE "Search" (
    "id" SERIAL NOT NULL,
    "flight" TEXT,
    "destination" TEXT,
    "origin" TEXT,
    "dateFrom" TEXT NOT NULL,
    "dateTo" TEXT NOT NULL,
    "min_miles" TEXT NOT NULL,
    "expired" BOOLEAN DEFAULT false,

    CONSTRAINT "Search_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BestPrice" (
    "id" SERIAL NOT NULL,
    "notified" BOOLEAN DEFAULT false,
    "bestMiles" INTEGER,
    "bestMilesdate" TEXT,
    "searchId" INTEGER NOT NULL,

    CONSTRAINT "BestPrice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BestPrice" ADD CONSTRAINT "BestPrice_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "Search"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
