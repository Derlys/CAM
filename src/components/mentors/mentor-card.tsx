"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCreateSession } from "@/features/sessions/data-access/use-create-session";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";

type Mentor = {
  id: string;
  name?: string | null;
  image?: string | null;
  expertise?: { name: string }[];
};

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  const { user, getAccessToken } = usePrivy();

  const { mutate: requestSession, isPending } = useCreateSession();

  const handleRequestSession = async () => {
    if (!user) {
      toast.error("You must be logged in to request a session.");
      return;
    }
    try {
      const token = await getAccessToken();
      if (!token) {
        toast.error("Authentication token not found.");
        return;
      }
      requestSession(
        { mentorId: mentor.id, token },
        {
          onSuccess: () => toast.success("Session requested!"),
          onError: (err: any) => toast.error(err?.message ?? "Failed to create session"),
        }
      );
    } catch (error) {
      console.error("Error getting token:", error);
      toast.error("Failed to authenticate.");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={mentor.image ?? ""} alt={mentor.name ?? "Mentor"} />
          <AvatarFallback>{mentor.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div><CardTitle>{mentor.name}</CardTitle></div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">Expertise:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {mentor.expertise?.map((exp) => (
            <span key={exp.name} className="px-2 py-1 text-xs bg-secondary rounded-full">
              {exp.name}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={handleRequestSession} disabled={isPending} className="w-full">
          {isPending ? "Requesting..." : "Request Session"}
        </Button>
      </CardFooter>
    </Card>
  );
}
