import {keycloak} from "../config/keycloak.js";

/**
 * Middleware custom untuk API.
 * - Jika tidak ada header Authorization → tampilkan 401
 * - Jika token invalid → tampilkan 403
 * - Jika valid → lanjut
 */
export const apiProtect = (role) => (req, res, next) => {
  const auth = req.headers.authorization;

  // jika tidak ada token
  if (!auth) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  // gunakan protect bawaan Keycloak, tapi tanpa redirect
  const protector = role ? keycloak.protect(`realm:${role}`) : keycloak.protect();
  protector(req, res, (err) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid or insufficient role" });
    }
    next();
  });
};
