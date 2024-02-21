const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("./swaggerOptions");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

// Swagger UI'ı '/api-docs' path'inde kullanılabilir hale getirin
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Diğer route'larınız...
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port ${"http://localhost:" + PORT}`)
);
