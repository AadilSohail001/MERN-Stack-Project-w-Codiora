const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [3, "Name must be at least 3 characters"],
            maxlength: [50, "Name cannot exceed 50 characters"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true
        },

        technology: {
            type: String,
            required: [true, "Technology is required"],
            enum: {
                values: [
                    "React.js",
                    "Node.js",
                    "Express.js",
                    "MongoDB",
                    "MERN Stack",
                    "Java",
                    "Python",
                    "Flutter"
                ],
                message: "Please select a valid technology."
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Student",
    studentSchema
);