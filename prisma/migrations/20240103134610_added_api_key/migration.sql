-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_clerkUserId_key" ON "profile"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "profile_key_key" ON "profile"("key");
