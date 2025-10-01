'use client'

import { MentorCard } from "@/components/mentors/mentor-card";

// The type will be inferred from the getMentors function return type
// For now, we define it manually based on what MentorCard expects.
type Mentor = {
  id: string;
  name?: string | null;
  image?: string | null;
  expertise?: { name: string }[];
};

export default function MentorList({ mentors }: { mentors: Mentor[] }) {
  if (!mentors.length) {
    return <p>No mentors found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} mentor={mentor} />
      ))}
    </div>
  )
}