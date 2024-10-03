import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some authors
  const author1 = await prisma.author.create({
    data: {
      name: 'Author One',
      bio: 'This is a bio for Author One',
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: 'Author Two',
      bio: 'This is a bio for Author Two',
    },
  });

  // Create some genres
  const genre1 = await prisma.genre.create({
    data: {
      name: 'Fiction',
      description: 'Fictional works.',
    },
  });

  const genre2 = await prisma.genre.create({
    data: {
      name: 'Non-Fiction',
      description: 'Non-fictional works.',
    },
  });

  // Create some users
  const user1 = await prisma.user.create({
    data: {
      name: 'User One',
      email: 'useronesdasd@example.com',
      password: 'password123', // Nên mã hóa mật khẩu trong thực tế
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'User Two',
      email: 'usertwoadsd@example.com',
      password: 'password123', // Nên mã hóa mật khẩu trong thực tế
    },
  });

  // Create a book and link it to authors and genres
  const book = await prisma.book.create({
    data: {
      title: 'Sample Book',
      publishedDate: new Date(),
      price: 19.99,
      summary: 'This is a summary of the sample book.',
      authors: {
        create: [
          { author: { connect: { id: author1.id } } },
          { author: { connect: { id: author2.id } } },
        ],
      },
      genres: {
        create: [
          { genre: { connect: { id: genre1.id } } },
          { genre: { connect: { id: genre2.id } } },
        ],
      },
    },
  });

  console.log({ author1, author2, genre1, genre2, user1, user2, book });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
