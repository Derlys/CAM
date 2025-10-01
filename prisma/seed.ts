import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

  await prisma.session.deleteMany()
  await prisma.availability.deleteMany()
  await prisma.userExpertise.deleteMany()
  await prisma.expertise.deleteMany()
  await prisma.user.deleteMany()


  const expertises = await prisma.expertise.createMany({
    data: [
      { name: "JavaScript" },
      { name: "Python" },
      { name: "React" },
      { name: "Data Science" },
      { name: "UI/UX Design" },
    ],
    skipDuplicates: true,
  })

  const allExpertises = await prisma.expertise.findMany()


  const mentors = await Promise.all([
    prisma.user.create({
      data: {
        email: "alice@example.com",
        name: "Alice Johnson",
        expertise: {
          create: { expertiseId: allExpertises[0].id },
        },
        availability: {
          create: [
            {
              dayOfWeek: 1,
              startTime: new Date("2025-09-26T09:00:00Z"),
              endTime: new Date("2025-09-26T12:00:00Z"),
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        email: "bob@example.com",
        name: "Bob Smith",
        expertise: {
          create: { expertiseId: allExpertises[2].id },
        },
        availability: {
          create: [
            {
              dayOfWeek: 2,
              startTime: new Date("2025-09-26T14:00:00Z"),
              endTime: new Date("2025-09-26T18:00:00Z"),
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        email: "carol@example.com",
        name: "Carol White",
        expertise: {
          create: { expertiseId: allExpertises[3].id }, // Data Science
        },
        availability: {
          create: [
            {
              dayOfWeek: 3,
              startTime: new Date("2025-09-26T10:00:00Z"),
              endTime: new Date("2025-09-26T13:00:00Z"),
            },
          ],
        },
      },
    }),
  ])


  const mentees = await Promise.all([
    prisma.user.create({
      data: {
        email: "david@example.com",
        name: "David Lee",
      },
    }),
    prisma.user.create({
      data: {
        email: "eva@example.com",
        name: "Eva Green",
      },
    }),
  ])


  await prisma.session.create({
    data: {
      mentorId: mentors[0].id,
      menteeId: mentees[0].id,
      scheduledAt: new Date("2025-09-27T10:00:00Z"),
      duration: 60,
      status: "CONFIRMED",
    },
  })

  await prisma.session.create({
    data: {
      mentorId: mentors[1].id,
      menteeId: mentees[1].id,
      scheduledAt: new Date("2025-09-28T15:00:00Z"),
      duration: 45,
      status: "PENDING",
    },
  })

  console.log("✅ Seed completed!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
