-- CreateTable
CREATE TABLE "job-applications" (
    "id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "seniority_level" TEXT NOT NULL,
    "payment_currency" TEXT NOT NULL,
    "initial_salary" DECIMAL(8,2) NOT NULL DEFAULT 0.0,
    "current_salary" DECIMAL(8,2) NOT NULL DEFAULT 0.0,
    "vacancy_modality" TEXT NOT NULL,
    "work_regime" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job-applications_pkey" PRIMARY KEY ("id")
);
