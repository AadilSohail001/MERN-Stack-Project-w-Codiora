import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Form.css";

function Form() {

    const [form, setForm] = useState({

        name: "",
        email: "",
        technology: ""

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const validateForm = () => {

        const nameRegex = /^[A-Za-z\s]+$/;

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.name.trim()) {

            toast.error("Name is required.");

            return false;

        }

        if (form.name.trim().length < 3) {

            toast.error("Name must be at least 3 characters.");

            return false;

        }

        if (!nameRegex.test(form.name)) {

            toast.error("Name can contain only letters and spaces.");

            return false;

        }

        if (!form.email.trim()) {

            toast.error("Email is required.");

            return false;

        }

        if (!emailRegex.test(form.email)) {

            toast.error("Please enter a valid email.");

            return false;

        }

        if (!form.technology) {

            toast.error("Please select a technology.");

            return false;

        }

        return true;

    };

    const submit = async (e) => {

        e.preventDefault();

        if (!validateForm()) {

            return;

        }

        try {

            setLoading(true);

            const res = await axios.post(

                "http://localhost:5000/api/register",

                form

            );

            toast.success(

                res.data.message

            );

            setForm({

                name: "",

                email: "",

                technology: ""

            });

        }

        catch (error) {

            if (error.response) {

                toast.error(

                    error.response.data.message

                );

            }

            else {

                toast.error(

                    "Server is not responding."

                );

            }

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="internship-form">

            <div className="form-header">

                <div className="form-badge">

                    CODIORA HOUSE (PRIVATE) LIMITED

                </div>

                <h1 className="form-title">

                    Internship Registration

                </h1>

                <p className="form-subtitle">

                    Build your future with modern technologies and innovation

                </p>

            </div>

            <form onSubmit={submit}>

                <div className="input-group">

                    <label className="input-label">

                        Full Name

                    </label>

                    <input

                        className="form-input"

                        type="text"

                        name="name"

                        placeholder="Enter your full name"

                        value={form.name}

                        onChange={handleChange}

                    />

                </div>

                <div className="input-group">

                    <label className="input-label">

                        Email Address

                    </label>

                    <input

                        className="form-input"

                        type="email"

                        name="email"

                        placeholder="example@gmail.com"

                        value={form.email}

                        onChange={handleChange}

                    />

                </div>

                <div className="input-group">

                    <label className="input-label">

                        Technology

                    </label>

                    <select

                        className="form-select"

                        name="technology"

                        value={form.technology}

                        onChange={handleChange}

                    >

                        <option value="">

                            Select Technology

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

                <button

                    className="submit-btn"

                    disabled={loading}

                >

                    {

                        loading

                            ? "Submitting..."

                            : "Submit Application"

                    }

                </button>

            </form>

        </div>

    );

}

export default Form;