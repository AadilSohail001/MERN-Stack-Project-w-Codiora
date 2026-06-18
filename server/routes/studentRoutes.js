const router =
    require("express").Router();

const Student =
    require("../models/Student");

router.post("/register",
    async (req, res) => {

        try {

            const data =
                new Student(req.body);

            await data.save();

            res.json({
                message: "Saved"
            });

        }

        catch (error) {

            res.status(500)
                .json(error);

        }

    });

router.get("/students",
    async (req, res) => {

        const data =
            await Student.find();

        res.json(data);

    });

module.exports =
    router;