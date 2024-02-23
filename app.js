const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("./swaggerOptions");

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Sadece bu kaynaktan gelen isteklere izin ver
  })
);

app.use(express.json());

// Swagger UI'ı '/api-docs' path'inde kullanılabilir hale getirin
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running on port ${"http://localhost:" + PORT}`)
);
