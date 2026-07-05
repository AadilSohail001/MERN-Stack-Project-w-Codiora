const router = require("express").Router();
const validator = require("validator");
const Student = require("../models/Student");

/*
|--------------------------------------------------------------------------
| CREATE STUDENT
|--------------------------------------------------------------------------
*/

router.post("/register", async (req, res) => {

    try {

        let { name, email, technology } = req.body;

        name = name?.trim();
        email = email?.trim().toLowerCase();
        technology = technology?.trim();

        if (!name || !email || !technology) {

            return res.status(400).json({

                success: false,
                message: "All fields are required."

            });

        }

        const nameRegex = /^[A-Za-z\s]+$/;

        if (!nameRegex.test(name)) {

            return res.status(400).json({

                success: false,
                message: "Name can contain only letters and spaces."

            });

        }

        if (name.length < 3) {

            return res.status(400).json({

                success: false,
                message: "Name must be at least 3 characters."

            });

        }

        if (!validator.isEmail(email)) {

            return res.status(400).json({

                success: false,
                message: "Please enter a valid email."

            });

        }

        const existingStudent = await Student.findOne({

            email

        });

        if (existingStudent) {

            return res.status(409).json({

                success: false,
                message: "Email is already registered."

            });

        }

        const student = await Student.create({

            name,
            email,
            technology

        });

        res.status(201).json({

            success: true,
            message: "Application submitted successfully.",
            student

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error."

        });

    }

});

/*
|--------------------------------------------------------------------------
| READ + SEARCH + FILTER + PAGINATION
|--------------------------------------------------------------------------
*/

router.get("/students", async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const search = req.query.search || "";

        const technology = req.query.technology || "";

        let query = {

            name: {

                $regex: search,

                $options: "i"

            }

        };

        if (technology !== "") {

            query.technology = technology;

        }

        const totalStudents = await Student.countDocuments(query);

        const students = await Student.find(query)

            .skip(skip)

            .limit(limit);

        res.json({

            success: true,

            students,

            currentPage: page,

            totalPages: Math.ceil(totalStudents / limit),

            totalStudents

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: "Unable to fetch students."

        });

    }

});

/*
|--------------------------------------------------------------------------
| UPDATE STUDENT
|--------------------------------------------------------------------------
*/

router.put("/students/:id", async (req, res) => {

    try {

        let { name, email, technology } = req.body;

        name = name?.trim();
        email = email?.trim().toLowerCase();
        technology = technology?.trim();

        if (!name || !email || !technology) {

            return res.status(400).json({

                success: false,
                message: "All fields are required."

            });

        }

        if (!validator.isEmail(email)) {

            return res.status(400).json({

                success: false,
                message: "Invalid email address."

            });

        }

        const duplicateEmail = await Student.findOne({

            email,

            _id: {

                $ne: req.params.id

            }

        });

        if (duplicateEmail) {

            return res.status(409).json({

                success: false,
                message: "Email already exists."

            });

        }

        const updatedStudent = await Student.findByIdAndUpdate(

            req.params.id,

            {

                name,
                email,
                technology

            },

            {

                new: true,
                runValidators: true

            }

        );

        if (!updatedStudent) {

            return res.status(404).json({

                success: false,
                message: "Student not found."

            });

        }

        res.status(200).json({

            success: true,
            message: "Student updated successfully.",
            student: updatedStudent

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Update failed."

        });

    }

});

/*
|--------------------------------------------------------------------------
| DELETE STUDENT
|--------------------------------------------------------------------------
*/

router.delete("/students/:id", async (req, res) => {

    try {

        const deletedStudent = await Student.findByIdAndDelete(

            req.params.id

        );

        if (!deletedStudent) {

            return res.status(404).json({

                success: false,
                message: "Student not found."

            });

        }

        res.status(200).json({

            success: true,
            message: "Student deleted successfully."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Delete failed."

        });

    }

});

module.exports = router;