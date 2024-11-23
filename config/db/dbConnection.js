require("dotenv").config();
const mongoose = require("mongoose");

const dbUrl = process.env.DBURL || "mongodb://localhost:27017/authServiceDb";

const dbConnection = async () => {
	try {
		await mongoose.connect(dbUrl);
		console.log("Database connection successful");
	} catch (error) {
		console.error(`Database connection error: ${error.message}`);
		process.exit(1);
	}
};

module.exports = dbConnection;
