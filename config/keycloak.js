import Keycloak from "keycloak-connect";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

// optional session, tapi bukan untuk auth
const memoryStore = new session.MemoryStore();

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "super-secret-session",
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
});

// Keycloak dalam mode API (tanpa auto redirect)
export const keycloak = new Keycloak(
  { store: memoryStore },
  {
    realm: process.env.KEYCLOAK_REALM,
    "auth-server-url": process.env.KEYCLOAK_AUTH_URL,
    "ssl-required": "none",
    resource: process.env.KEYCLOAK_CLIENT_ID,
    "confidential-port": 0,
    "verify-token-audience": true,
    credentials: {
      secret: process.env.KEYCLOAK_CLIENT_SECRET,
    },
    "use-resource-role-mappings": true,
    bearerOnly: true, // Tidak pakai redirect
  }
);
