-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "customerNumber" BIGINT NOT NULL,
    "monthReference" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "eletricPowerkWh" INTEGER NOT NULL,
    "eletricPowerValue" DOUBLE PRECISION NOT NULL,
    "eletricSCEEEkWh" INTEGER NOT NULL,
    "eletricSCEEEValue" DOUBLE PRECISION NOT NULL,
    "eletricGDIkWh" INTEGER NOT NULL,
    "eletricGDIValue" DOUBLE PRECISION NOT NULL,
    "publicLightingContribution" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);
