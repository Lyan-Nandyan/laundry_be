import jwt from "jsonwebtoken";

export const apiProtect = (roles = []) => async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    // Verifikasi token JWT (tanpa redirect)
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded) return res.status(401).json({ message: "Invalid token" });

    // Ambil roles
    const userRoles =
      decoded.payload?.realm_access?.roles || [];

    // Jika role tidak cocok
    if (roles.length && !roles.some((r) => userRoles.includes(r))) {
      return res.status(403).json({ message: "Forbidden: Role not allowed" });
    }

    next();
  } catch (err) {
    console.error("Token validation error:", err.message);
    return res.status(401).json({ message: "Unauthorized or expired token" });
  }
};
