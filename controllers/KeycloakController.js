import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = `${process.env.KEYCLOAK_AUTH_URL}/admin/realms/${process.env.KEYCLOAK_REALM}`;

export const getAdminToken = async () => {
  const tokenUrl = `${process.env.KEYCLOAK_AUTH_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;

  const params = new URLSearchParams({
    client_id: process.env.KEYCLOAK_CLIENT_ID,
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
    grant_type: "client_credentials",
  });

  const { data } = await axios.post(tokenUrl, params);
  return data.access_token;
};

// Create Keycloak user
export const createKeycloakUser = async (nama, no_hp) => {
  const token = await getAdminToken();

  const userData = {
    username: nama,
    enabled: true,
    credentials: [
      {
        type: "password",
        value: no_hp,
        temporary: false,
      },
    ],
  };

  await axios.post(`${BASE_URL}/users`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // Dapatkan ID user yang baru dibuat
  const search = await axios.get(`${BASE_URL}/users?username=${nama}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const userId = search.data[0]?.id;
  if (!userId) throw new Error("Gagal menemukan user baru di Keycloak");

  // Tambahkan role "pelanggan"
  const role = await axios.get(`${BASE_URL}/roles/pelanggan`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  await axios.post(
    `${BASE_URL}/users/${userId}/role-mappings/realm`,
    [role.data],
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return userId;
};

// Delete Keycloak user
export const deleteKeycloakUser = async (username) => {
  const token = await getAdminToken();
  const search = await axios.get(`${BASE_URL}/users?username=${username}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const userId = search.data[0]?.id;
  if (!userId) throw new Error("User tidak ditemukan di Keycloak");

  await axios.delete(`${BASE_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Ganti password sendiri dengan verifikasi password lama
export const changeOwnPasswordLogic = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  const userId = payload.sub;
  const username = payload.preferred_username;

  const { oldPassword, newPassword } = req.body;

  // Verifikasi password lama dengan login ulang ke Keycloak
  const params = new URLSearchParams({
    client_id: process.env.KEYCLOAK_CLIENT_ID,
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
    grant_type: "password",
    username,
    password: oldPassword,
  });

  try {
    await axios.post(
      `${process.env.KEYCLOAK_AUTH_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
      params
    );
  } catch {
    throw new Error("Password lama salah");
  }

  // Ganti password ke password baru
  await axios.put(
    `${BASE_URL}/users/${userId}/reset-password`,
    {
      type: "password",
      value: newPassword,
      temporary: false,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return "Password berhasil diubah";
};
