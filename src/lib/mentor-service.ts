
import { prisma } from "@/lib/prisma";

// A user is a mentor if they have at least one availability or one expertise.
export async function getMentors() {
  const mentors = await prisma.user.findMany({
    where: {
      OR: [
        {
          availability: {
            some: {},
          },
        },
        {
          expertise: {
            some: {},
          },
        },
      ],
    },
    include: {
      expertise: {
        include: {
          expertise: true, // Include the actual expertise name
        },
      },
      availability: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  // We can refine the returned data structure here if needed
  return mentors.map((mentor: { id: any; name: any; email: any; expertise: any[]; availability: any }) => ({
    id: mentor.id,
    name: mentor.name,
    email: mentor.email,
    image: `https://i.pravatar.cc/150?u=${mentor.id}`,
    expertise: mentor.expertise.map((exp) => exp.expertise),
    availability: mentor.availability,
  }))
}
