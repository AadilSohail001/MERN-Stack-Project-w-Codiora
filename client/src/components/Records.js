import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Records.css";

function Records() {

    const [list, setList] =
        useState([]);

    const [open,
        setOpen] =
        useState(false);

    useEffect(() => {
        if (open) {

            fetchData();

        }
    }, [open]);

    const fetchData =
        async () => {

            try {

                const res =
                    await axios.get(
                        "http://localhost:5000/api/students"
                    );

                setList(
                    res.data
                );

            }

            catch (error) {

                console.log(error);

            }

        };

    return (

        <>

            <button
                className="records-btn"
                onClick={() =>
                    setOpen(true)
                }

            >

                View Saved Records

            </button>

            {

                open && (

                    <div
                        className="modal-overlay"
                        onClick={() =>
                            setOpen(false)
                        }
                    >

                        <div
                            className="modal-box"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            <div
                                className="modal-header"
                            >

                                <h2>
                                    Registered Students
                                </h2>

                                <button
                                    className="close-btn"
                                    onClick={() =>
                                        setOpen(false)
                                    }

                                >

                                    ✕

                                </button>

                            </div>

                            <div
                                className="students-container"
                            >

                                {

                                    list.length === 0

                                        ?

                                        (

                                            <div
                                                className="empty"
                                            >

                                                No registrations found

                                            </div>

                                        )

                                        :

                                        list.map((item) => (

                                            <div
                                                className="student-card"
                                                key={item._id}
                                            >

                                                <div className="student-name">
                                                    {item.name}
                                                </div>

                                                <div className="student-email">
                                                    {item.email}
                                                </div>

                                                <div className="student-tech">
                                                    {item.technology}
                                                </div>

                                            </div>

                                        ))

                                }

                            </div>

                        </div>

                    </div>

                )

            }

        </>

    );

}

export default Records;
