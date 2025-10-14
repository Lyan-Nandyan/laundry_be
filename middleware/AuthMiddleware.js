import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import dotenv from "dotenv";
dotenv.config();

const client = jwksClient({
  jwksUri: `${process.env.KEYCLOAK_AUTH_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`,
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      console.error("Failed to get signing key:", err.message);
      return callback(err);
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

export const requireRoles = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid Authorization header" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
      token,
      getKey,
      {
        algorithms: ["RS256"],
        issuer: `${process.env.KEYCLOAK_AUTH_URL}/realms/${process.env.KEYCLOAK_REALM}`,
      },
      (err, decoded) => {
        if (err) {
          console.error("Token verification failed:", err.message);
          return res.status(401).json({ message: "Invalid or expired token" });
        }

        const userRoles = decoded?.realm_access?.roles || [];
        console.log("Token valid. Roles:", userRoles);

        req.user = decoded;

        if (roles.length && !roles.some((r) => userRoles.includes(r))) {
          return res.status(403).json({ message: "Forbidden: role not allowed" });
        }

        next();
      }
    );
  };
};
