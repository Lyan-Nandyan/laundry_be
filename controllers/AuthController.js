import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

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

    const { data } = await axios.post(
      `${process.env.KEYCLOAK_AUTH_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
      params
    );

    // hanya kirim token ke FE
    res.json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const refreshToken = async (req, res) => {
  const { refresh_token } = req.body;

  try {
    const params = new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token
    });

    const { data } = await axios.post(
      `${process.env.KEYCLOAK_AUTH_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
      params
    );

    res.json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const logout = async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    const params = new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      refresh_token,
    });

    const url = `${process.env.KEYCLOAK_AUTH_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`;

    const { status } = await axios.post(url, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      validateStatus: () => true, // supaya kita handle error manual
    });

    if (status === 204 || status === 200) {
      return res.json({ message: "Logged out successfully" });
    }

    res.status(status).json({ message: "Logout request failed at Keycloak" });
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

