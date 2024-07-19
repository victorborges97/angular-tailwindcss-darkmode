/*
  Warnings:

  - Added the required column `slug` to the `topics` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_topics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "forumId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "topics_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "foruns" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "topics_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_topics" ("authorId", "content", "createdAt", "forumId", "id", "title", "updatedAt", "views") SELECT "authorId", "content", "createdAt", "forumId", "id", "title", "updatedAt", "views" FROM "topics";
DROP TABLE "topics";
ALTER TABLE "new_topics" RENAME TO "topics";
CREATE UNIQUE INDEX "topics_slug_key" ON "topics"("slug");
CREATE INDEX "topics_title_content_idx" ON "topics"("title", "content");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
