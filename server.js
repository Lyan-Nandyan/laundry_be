import express from "express";
import dotenv from "dotenv";
import PelangganRoute from "./routes/PelangganRoute.js";
import LayananRoute from "./routes/LayananRoute.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/pelanggan", PelangganRoute);
app.use("/layanan", LayananRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Laundry API is running",
    time: new Date().toString(),
  });
});

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();