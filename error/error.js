const notFoundHandler = (req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
};

const serverError = (error, req, res, next) => {
	res.status(error.status || 500).json({
		success: false,
		data: { message: error.message || "Server error" },
	});
};

module.exports = {
	serverError,
	notFoundHandler,
};
