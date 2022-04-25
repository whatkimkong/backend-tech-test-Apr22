import Log from "./src/error-handling/Log";

/** START SERVER */
const app = require("./app");

// 👇 App access to port:
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  Log.info(`Server listening on port http://localhost:${PORT}`);
});
