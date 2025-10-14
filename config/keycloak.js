import session from "express-session";
import Keycloak from "keycloak-connect";
import dotenv from "dotenv";
dotenv.config();

const memoryStore = new session.MemoryStore();

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "super-secret-session",
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
});

export const keycloak = new Keycloak(
  { store: memoryStore },
  {
    realm: process.env.KEYCLOAK_REALM,
    "auth-server-url": process.env.KEYCLOAK_AUTH_URL,
    "ssl-required": "none",
    resource: process.env.KEYCLOAK_CLIENT_ID,
    "bearer-only": true,
    "verify-token-audience": true,
    credentials: {
      secret: process.env.KEYCLOAK_CLIENT_SECRET,
    },
    "use-resource-role-mappings": false,
  }
);
