-- CreateTable
CREATE TABLE "MovieCache" (
    "id" SERIAL NOT NULL,
    "movieId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "responseBody" JSONB NOT NULL,

    CONSTRAINT "MovieCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieCache_movieId_key" ON "MovieCache"("movieId");
