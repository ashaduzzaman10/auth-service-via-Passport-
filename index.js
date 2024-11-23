require("dotenv").config();
const app = require("./app");
const dbConnection = require("./config/db/dbConnection");

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await dbConnection();
    console.log(`Server is running on http://localhost:${PORT}`);
});