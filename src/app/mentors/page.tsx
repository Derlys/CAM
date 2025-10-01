import MentorList from '@/components/mentors/mentor-list'
import { getMentors } from '@/lib/mentor-service'

export default async function MentorsPage() {
  const mentors = await getMentors();

  return (
    <main className="p-8">
      <h1 className="text-white text-2xl mb-4">All Mentors</h1>
      <MentorList mentors={mentors} />
    </main>
  );
}
