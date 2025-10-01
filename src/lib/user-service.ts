
import { prisma } from "@/lib/prisma";

export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      expertise: {
        include: {
          expertise: true,
        },
      },
      availability: true,
    },
  });
}

// We can add functions to update user profile details here later
/*
export async function updateUser(userId: string, data: Partial<Prisma.UserUpdateInput>) {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
}
*/
