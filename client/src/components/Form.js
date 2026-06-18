import { useState } from "react";
import axios from "axios";
import "../styles/Form.css";

function Form() {


    const [form, setForm] = useState({
        name: "",
        email: "",
        technology: ""
    });

    const [loading, setLoading] =
        useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value
        });

    };

    const submit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await axios.post(
                "http://localhost:5000/api/register",
                form
            );

            alert(
                "Application Submitted Successfully"
            );

            setForm({
                name: "",
                email: "",
                technology: ""
            });

        }

        catch (error) {

            alert(
                "Submission Failed"
            );

            console.log(error);

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

            <form
                onSubmit={submit}
            >

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
                        required
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
                        required
                    />

                </div>

                <div className="input-group">

                    <label className="input-label">
                        Technology
                    </label>

                    <input
                        className="form-input"
                        type="text"
                        name="technology"
                        placeholder="React / MERN / Node.js"
                        value={form.technology}
                        onChange={handleChange}
                        required
                    />

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
