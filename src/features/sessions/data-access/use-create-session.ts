import { useMutation } from "@tanstack/react-query";

type CreateSessionParams = { mentorId: string; token: string };
type ApiError = { error?: string };

async function createSession({ mentorId, token }: CreateSessionParams) {
  const res = await fetch("/api/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,

    },

    body: JSON.stringify({ mentorId }),
  });
  console.log("access token prefix", token?.slice(0, 12));



  const data = await res.json();

  if (!res.ok) {
    const msg = (data as ApiError)?.error || "Failed to create session";
    throw new Error(msg);
  }

  return data;
}

export function useCreateSession() {
  return useMutation({ mutationFn: createSession });
}
