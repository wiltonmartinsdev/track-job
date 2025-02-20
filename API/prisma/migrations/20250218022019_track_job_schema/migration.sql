-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
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
    "process_phase" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
