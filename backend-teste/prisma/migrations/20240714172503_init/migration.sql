-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "topics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "forumId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "topics_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "foruns" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "topics_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" INTEGER NOT NULL,
    "forumId" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,
    CONSTRAINT "comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "foruns" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tag" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "foruns" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "foruns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserStarsTopic" (
    "topicId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "topicId"),
    CONSTRAINT "UserStarsTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserStarsTopic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TagToTopic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TagToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TagToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "topics" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_usuario_key" ON "users"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_usuario_email_idx" ON "users"("usuario", "email");

-- CreateIndex
CREATE INDEX "topics_title_content_idx" ON "topics"("title", "content");

-- CreateIndex
CREATE INDEX "comments_forumId_topicId_idx" ON "comments"("forumId", "topicId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_tag_key" ON "tags"("tag");

-- CreateIndex
CREATE INDEX "tags_tag_idx" ON "tags"("tag");

-- CreateIndex
CREATE INDEX "foruns_userId_name_id_idx" ON "foruns"("userId", "name", "id");

-- CreateIndex
CREATE INDEX "UserStarsTopic_userId_topicId_idx" ON "UserStarsTopic"("userId", "topicId");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToTopic_AB_unique" ON "_TagToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToTopic_B_index" ON "_TagToTopic"("B");
