-- CreateTable
CREATE TABLE "Estudiante" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "nivel" TEXT NOT NULL DEFAULT 'Principiante',
    "especialidad" TEXT NOT NULL DEFAULT 'Soprano',
    "fechaInscripcion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL DEFAULT 'Activo',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_email_key" ON "Estudiante"("email");
