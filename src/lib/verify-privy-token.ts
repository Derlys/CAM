
import { createRemoteJWKSet, jwtVerify } from "jose";


const JWKS = createRemoteJWKSet(
  new URL("https://auth.privy.io/.well-known/jwks.json")
);

export async function verifyPrivyToken(token: string) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      audience: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
      issuer: "privy.io",
    });

    return { id: String(payload.sub), email: (payload as any).email };
  } catch (e) {
    console.error("[verifyPrivyToken] failed:", e);
    return null;
  }
}
