import session from "express-session";
import Keycloak from "keycloak-connect";
import dotenv from "dotenv";
dotenv.config();

// Simpan session Keycloak di memori server
const memoryStore = new session.MemoryStore();

// Middleware session untuk Express
export const sessionMiddleware = session({
  secret: "super-secret-session",
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
});

// Inisialisasi Keycloak
export const keycloak = new Keycloak(
  { store: memoryStore },
  {
    "realm": process.env.KEYCLOAK_REALM,
    "auth-server-url": process.env.KEYCLOAK_AUTH_URL,
    "ssl-required": "none",
    "resource": process.env.KEYCLOAK_CLIENT_ID,
    "credentials": {
      "secret": process.env.KEYCLOAK_CLIENT_SECRET,
    },
    "confidential-port": 0,
  }
);
