require("dotenv").config();

const mongoose = require("mongoose");

const dbUrl = process.env.DBURL || "mongodb://localhost:27017/authServiceDb";

const dbConnection = async () => {
	try {
		await mongoose.connect(dbUrl);
		console.log("database Connection success ");
	} catch (error) {
		console.log(`server error occurs:${error.message}`);
		process.exit(1);
	}
};

module.exports = dbConnection;
