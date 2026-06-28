import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../styles/Records.css";

function Records() {

    const [list,
        setList] =
        useState([]);

    const [open,
        setOpen] =
        useState(false);

    const [search,
        setSearch] =
        useState("");

    const [editing,
        setEditing] =
        useState(null);

    const [editForm,
        setEditForm] =
        useState({

            name: "",
            email: "",
            technology: ""

        });

    const fetchData =
        useCallback(
            async () => {

                try {

                    const res =
                        await axios.get(

                            `http://localhost:5000/api/students?search=${search}`

                        );

                    setList(
                        res.data
                    );

                }

                catch (error) {

                    console.log(
                        error
                    );

                }

            },
            [
                search
            ]
        );

    useEffect(() => {

        if (open) {

            fetchData();

        }

    }, [open, fetchData]);

    const deleteStudent =
        async (id) => {

            const confirmDelete =
                window.confirm(

                    "Delete this record?"

                );

            if (!confirmDelete)
                return;

            try {

                await axios.delete(

                    `http://localhost:5000/api/students/${id}`

                );

                fetchData();

            }

            catch (error) {

                console.log(
                    error
                );

            }

        };

    const editStudent =
        (item) => {

            setEditing(
                item._id
            );

            setEditForm({

                name:
                    item.name,

                email:
                    item.email,

                technology:
                    item.technology

            });

        };

    const updateStudent =
        async (id) => {

            try {

                await axios.put(

                    `http://localhost:5000/api/students/${id}`,

                    editForm

                );

                setEditing(
                    null
                );

                fetchData();

                alert(
                    "Updated Successfully"
                );

            }

            catch (error) {

                console.log(
                    error
                );

            }

        };

    return (

        <>

            <button
                className="records-btn"
                onClick={() =>

                    setOpen(
                        true
                    )

                }

            >

                View Saved Records

            </button>

            {

                open && (

                    <div
                        className="modal-overlay"
                        onClick={() =>

                            setOpen(
                                false
                            )

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

                                    Student Management

                                </h2>

                                <button
                                    className="close-btn"

                                    onClick={() =>

                                        setOpen(
                                            false
                                        )

                                    }

                                >

                                    ✕

                                </button>

                            </div>

                            <input

                                className="search-input"

                                placeholder=
                                "Search student"

                                value={
                                    search
                                }

                                onChange={(e) =>

                                    setSearch(
                                        e.target.value
                                    )

                                }

                            />

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

                                                No records found

                                            </div>

                                        )

                                        :

                                        list.map((item) => (

                                            <div
                                                className="student-card"

                                                key={
                                                    item._id
                                                }

                                            >

                                                {

                                                    editing === item._id

                                                        ?

                                                        (

                                                            <>

                                                                <input

                                                                    className="edit-input"

                                                                    value={
                                                                        editForm.name
                                                                    }

                                                                    onChange={(e) =>

                                                                        setEditForm({

                                                                            ...editForm,

                                                                            name:
                                                                                e.target.value

                                                                        })

                                                                    }

                                                                />

                                                                <input

                                                                    className="edit-input"

                                                                    value={
                                                                        editForm.email
                                                                    }

                                                                    onChange={(e) =>

                                                                        setEditForm({

                                                                            ...editForm,

                                                                            email:
                                                                                e.target.value

                                                                        })

                                                                    }

                                                                />

                                                                <input

                                                                    className="edit-input"

                                                                    value={
                                                                        editForm.technology
                                                                    }

                                                                    onChange={(e) =>

                                                                        setEditForm({

                                                                            ...editForm,

                                                                            technology:
                                                                                e.target.value

                                                                        })

                                                                    }

                                                                />

                                                                <div
                                                                    className="actions"
                                                                >

                                                                    <button

                                                                        className="save-btn"

                                                                        onClick={() =>

                                                                            updateStudent(
                                                                                item._id
                                                                            )

                                                                        }

                                                                    >

                                                                        Save

                                                                    </button>

                                                                    <button

                                                                        className="cancel-btn"

                                                                        onClick={() =>

                                                                            setEditing(
                                                                                null
                                                                            )

                                                                        }

                                                                    >

                                                                        Cancel

                                                                    </button>

                                                                </div>

                                                            </>

                                                        )

                                                        :

                                                        (

                                                            <>

                                                                <div className="student-info">

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

                                                                <div
                                                                    className="actions"
                                                                >

                                                                    <button

                                                                        className="edit-btn"

                                                                        onClick={() =>

                                                                            editStudent(
                                                                                item
                                                                            )

                                                                        }

                                                                    >

                                                                        Edit

                                                                    </button>

                                                                    <button

                                                                        className="delete-btn"

                                                                        onClick={() =>

                                                                            deleteStudent(
                                                                                item._id
                                                                            )

                                                                        }

                                                                    >

                                                                        Delete

                                                                    </button>

                                                                </div>

                                                            </>

                                                        )

                                                }

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
