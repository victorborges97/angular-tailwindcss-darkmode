/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed Users
    const user1 = await prisma.user.create({
        data: {
            name: 'John Doe',
            usuario: 'johndoe',
            email: 'john@example.com',
            imageUrl: 'https://example.com/john.jpg',
            password: 'senha1',
        }
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Jane Smith',
            usuario: 'janesmith',
            email: 'jane@example.com',
            imageUrl: 'https://example.com/jane.jpg',
            password: 'senha1',
        }
    });

    // Seed Forums
    const forum1 = await prisma.forum.create({
        data: {
            name: 'General Discussion',
            description: 'A place for general discussion',
            userId: user1.id,
            imageUrl: 'https://example.com/forum1.jpg'
        }
    });

    const forum2 = await prisma.forum.create({
        data: {
            name: 'Tech Talk',
            description: 'Discuss the latest in tech',
            userId: user2.id,
            imageUrl: 'https://wordpress-theme.spider-themes.net/docly/wp-content/uploads/2020/07/megaphone.png'
        }
    });

    // Seed Topics
    const topic1 = await prisma.topic.create({
        data: {
            title: 'Welcome to the forum!',
            slug: 'welcome-to-the-forum',
            content: 'This is the first topic in the forum.',
            authorId: user1.id,
            forumId: forum1.id
        }
    });

    const topic2 = await prisma.topic.create({
        data: {
            title: 'Discussing tech trends',
            slug: 'discussing-tech-trends',
            content: 'Let\'s talk about the latest trends in tech.',
            authorId: user2.id,
            forumId: forum2.id
        }
    });

    // Seed Comments
    await prisma.comment.create({
        data: {
            content: 'Thanks for the warm welcome!',
            authorId: user2.id,
            forumId: forum1.id,
            topicId: topic1.id
        }
    });

    await prisma.comment.create({
        data: {
            content: 'I\'m excited to discuss tech trends!',
            authorId: user1.id,
            forumId: forum2.id,
            topicId: topic2.id
        }
    });

    // Seed Tags
    const tag1 = await prisma.tag.create({
        data: {
            name: 'Introduction',
            tag: 'intro'
        }
    });

    const tag2 = await prisma.tag.create({
        data: {
            name: 'Tech',
            tag: 'tech'
        }
    });

    // Connect tags to topics
    await prisma.topic.update({
        where: { id: topic1.id },
        data: {
            tags: {
                connect: { id: tag1.id }
            }
        }
    });

    await prisma.topic.update({
        where: { id: topic2.id },
        data: {
            tags: {
                connect: { id: tag2.id }
            }
        }
    });

    // Seed UserStarsTopic
    await prisma.userStarsTopic.create({
        data: {
            userId: user1.id,
            topicId: topic1.id
        }
    });

    await prisma.userStarsTopic.create({
        data: {
            userId: user2.id,
            topicId: topic2.id
        }
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
