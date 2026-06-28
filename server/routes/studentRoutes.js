const router =
    require("express").Router();

const Student =
    require("../models/Student");

/*
CREATE
*/

router.post(
    "/register",

    async (req, res) => {

        try {

            const data =
                new Student(
                    req.body
                );

            await data.save();

            res.json({

                message:
                    "Saved Successfully",

                student:
                    data

            });

        }

        catch (error) {

            res
                .status(500)
                .json({

                    message:
                        "Failed",

                    error

                });

        }

    });

/*
READ + SEARCH
*/

router.get(
    "/students",

    async (req, res) => {

        try {

            const search =
                req.query.search || "";

            const data =
                await Student.find({

                    name: {

                        $regex:
                            search,

                        $options:
                            "i"

                    }

                });

            res.json(
                data
            );

        }

        catch (error) {

            res
                .status(500)
                .json({

                    message:
                        "Fetch Failed",

                    error

                });

        }

    });

/*
UPDATE
*/

router.put(
    "/students/:id",

    async (req, res) => {

        try {

            const updated =
                await Student
                    .findByIdAndUpdate(

                        req.params.id,

                        req.body,

                        {

                            new: true

                        }

                    );

            res.json({

                message:
                    "Updated",

                student:
                    updated

            });

        }

        catch (error) {

            res
                .status(500)
                .json({

                    message:
                        "Update Failed",

                    error

                });

        }

    });

/*
DELETE
*/

router.delete(
    "/students/:id",

    async (req, res) => {

        try {

            await Student
                .findByIdAndDelete(

                    req.params.id

                );

            res.json({

                message:
                    "Deleted"

            });

        }

        catch (error) {

            res
                .status(500)
                .json({

                    message:
                        "Delete Failed",

                    error

                });

        }

    });

module.exports =
    router;
