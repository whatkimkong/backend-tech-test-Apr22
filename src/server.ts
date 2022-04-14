/** START SERVER */
const app = require("./app");

// 👇 App access to port:
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
