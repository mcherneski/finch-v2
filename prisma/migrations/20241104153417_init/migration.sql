-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "cryptoFamiliarity" INTEGER NOT NULL,
    "interests" TEXT[],
    "walletAddress" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
