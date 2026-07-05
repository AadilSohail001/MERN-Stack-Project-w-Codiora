import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Records.css";

function StudentManagement() {

    const navigate = useNavigate();

    const [list, setList] = useState([]);

    const [search, setSearch] = useState("");

    const [technology, setTechnology] = useState("");

    const [editing, setEditing] = useState(null);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [editForm, setEditForm] = useState({

        name: "",

        email: "",

        technology: ""

    });

    const fetchData = useCallback(

        async () => {

            try {

                const res = await axios.get(

                    `http://localhost:5000/api/students?search=${search}&technology=${technology}&page=${page}&limit=5`

                );

                setList(

                    Array.isArray(res.data.students)

                        ? res.data.students

                        : []

                );

                setTotalPages(

                    res.data.totalPages || 1

                );

            }

            catch (error) {

                console.log(error);

                toast.error("Unable to fetch records.");

            }

        },

        [search, technology, page]

    );

    useEffect(() => {

        fetchData();

    }, [fetchData]);

    const deleteStudent = async (id) => {

        const confirmDelete = window.confirm(

            "Delete this record?"

        );

        if (!confirmDelete)

            return;

        try {

            const res = await axios.delete(

                `http://localhost:5000/api/students/${id}`

            );

            toast.success(res.data.message);

            fetchData();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Delete Failed."

            );

        }

    };

    const editStudent = (item) => {

        setEditing(item._id);

        setEditForm({

            name: item.name,

            email: item.email,

            technology: item.technology

        });

    };

    const updateStudent = async (id) => {

        try {

            const res = await axios.put(

                `http://localhost:5000/api/students/${id}`,

                editForm

            );

            toast.success(res.data.message);

            setEditing(null);

            fetchData();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Update Failed."

            );

        }

    };

    return (

        <div className="student-page">

            <div className="student-page-container">

                <div className="modal-header">

                    <h2>

                        Student Management

                    </h2>

                    <button

                        className="close-btn"

                        onClick={() => navigate("/")}

                    >

                        ← Back

                    </button>

                </div>

                <div className="search-filter">

                    <input

                        className="search-input"

                        placeholder="Search by name..."

                        value={search}

                        onChange={(e) => {

                            setSearch(e.target.value);

                            setPage(1);

                        }}

                    />

                    <select

                        className="filter-select"

                        value={technology}

                        onChange={(e) => {

                            setTechnology(e.target.value);

                            setPage(1);

                        }}

                    >

                        <option value="">

                            All Technologies

                        </option>

                        <option value="React.js">

                            React.js

                        </option>

                        <option value="Node.js">

                            Node.js

                        </option>

                        <option value="Express.js">

                            Express.js

                        </option>

                        <option value="MongoDB">

                            MongoDB

                        </option>

                        <option value="MERN Stack">

                            MERN Stack

                        </option>

                        <option value="Flutter">

                            Flutter

                        </option>

                        <option value="Java">

                            Java

                        </option>

                        <option value="Python">

                            Python

                        </option>

                    </select>

                </div>

                <div className="table-container">

                    {

                        list.length === 0 ?

                            (

                                <div className="empty">

                                    No records found

                                </div>

                            )

                            :

                            (

                                <table className="students-table">

                                    <thead>

                                        <tr>

                                            <th>Name</th>

                                            <th>Email</th>

                                            <th>Technology</th>

                                            <th>Actions</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            list.map((item) => (

                                                editing === item._id ?

                                                    (

                                                        <tr key={item._id}>

                                                            <td>

                                                                <input

                                                                    className="edit-input"

                                                                    value={editForm.name}

                                                                    onChange={(e) =>

                                                                        setEditForm({

                                                                            ...editForm,

                                                                            name: e.target.value

                                                                        })

                                                                    }

                                                                />

                                                            </td>

                                                            <td>

                                                                <input

                                                                    className="edit-input"

                                                                    value={editForm.email}

                                                                    onChange={(e) =>

                                                                        setEditForm({

                                                                            ...editForm,

                                                                            email: e.target.value

                                                                        })

                                                                    }

                                                                />

                                                            </td>

                                                            <td>

                                                                <select

                                                                    className="filter-select"

                                                                    value={editForm.technology}

                                                                    onChange={(e) =>

                                                                        setEditForm({

                                                                            ...editForm,

                                                                            technology: e.target.value

                                                                        })

                                                                    }

                                                                >

                                                                    <option>React.js</option>

                                                                    <option>Node.js</option>

                                                                    <option>Express.js</option>

                                                                    <option>MongoDB</option>

                                                                    <option>MERN Stack</option>

                                                                    <option>Flutter</option>

                                                                    <option>Java</option>

                                                                    <option>Python</option>

                                                                </select>

                                                            </td>

                                                            <td>

                                                                <button

                                                                    className="save-btn"

                                                                    onClick={() => updateStudent(item._id)}

                                                                >

                                                                    Save

                                                                </button>

                                                                <button

                                                                    className="cancel-btn"

                                                                    onClick={() => setEditing(null)}

                                                                >

                                                                    Cancel

                                                                </button>

                                                            </td>

                                                        </tr>

                                                    )

                                                    :

                                                    (

                                                        <tr key={item._id}>

                                                            <td>{item.name}</td>

                                                            <td>{item.email}</td>

                                                            <td>

                                                                <span className="tech-badge">

                                                                    {item.technology}

                                                                </span>

                                                            </td>

                                                            <td>

                                                                <button

                                                                    className="edit-btn"

                                                                    onClick={() => editStudent(item)}

                                                                >

                                                                    Edit

                                                                </button>

                                                                <button

                                                                    className="delete-btn"

                                                                    onClick={() => deleteStudent(item._id)}

                                                                >

                                                                    Delete

                                                                </button>

                                                            </td>

                                                        </tr>

                                                    )

                                            ))

                                        }

                                    </tbody>

                                </table>

                            )

                    }

                </div>

                <div className="pagination">

                    <button

                        className="page-btn"

                        disabled={page === 1}

                        onClick={() =>

                            setPage(page - 1)

                        }

                    >

                        Previous

                    </button>

                    <span className="page-number">

                        Page <strong>{page}</strong> of <strong>{totalPages}</strong>

                    </span>

                    <button

                        className="page-btn"

                        disabled={

                            page === totalPages ||

                            totalPages === 0

                        }

                        onClick={() =>

                            setPage(page + 1)

                        }

                    >

                        Next

                    </button>

                </div>

            </div>

        </div>

    );

}

export default StudentManagement;