import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = `${process.env.KEYCLOAK_AUTH_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect`;

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const params = new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      grant_type: "password",
      username,
      password,
    });

    const { data } = await axios.post(`${BASE_URL}/token`, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    // FE menyimpan kedua token ini (access + refresh)
    res.json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      token_type: data.token_type,
      scope: data.scope,
    });
  } catch (err) {
    console.error("LOGIN ERR:", err.response?.data || err.message);
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const refresh = async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    return res.status(400).json({ message: "refresh_token is required" });
  }

  try {
    const params = new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token,
    });

    const { data } = await axios.post(`${BASE_URL}/token`, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    res.json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      token_type: data.token_type,
      scope: data.scope,
    });
  } catch (err) {
    console.error("REFRESH ERR:", err.response?.data || err.message);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const logout = async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    return res.status(400).json({ message: "refresh_token is required" });
  }

  try {
    const params = new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      refresh_token,
    });

    await axios.post(`${BASE_URL}/logout`, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      validateStatus: () => true, // kita yang handle status
    });

    res.json({ message: "Logged out" });
  } catch (err) {
    console.error("LOGOUT ERR:", err.response?.data || err.message);
    res.status(500).json({ message: "Logout failed" });
  }
};
