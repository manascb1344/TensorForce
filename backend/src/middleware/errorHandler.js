class ErrorHandler {
    static handleError(err, req, res, next) {
        console.error("Error:", err);

        if (err.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: Object.values(err.errors).map(e => e.message)
            });
        }

        if (err.name === "MongoError" && err.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Duplicate entry found"
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

    static notFound(req, res, next) {
        res.status(404).json({
            success: false,
            message: "Route not found"
        });
    }
}

export default ErrorHandler;
