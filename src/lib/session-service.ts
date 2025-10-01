import { prisma } from "@/lib/prisma";
import { SessionStatus } from "@prisma/client";

export async function createSession({ mentorId, menteeId, scheduledAt, duration }: {
  mentorId: string;
  menteeId: string;
  scheduledAt: Date;
  duration: number;
}) {
  return prisma.session.create({
    data: {
      mentorId,
      menteeId,
      scheduledAt,
      duration,
      status: SessionStatus.PENDING,
    },
  });
}
