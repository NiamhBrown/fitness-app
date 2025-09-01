import "./utils/loadEnv.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `✅ Server running at http://localhost:${PORT} (local) or via render URL in production.`
  );
});
