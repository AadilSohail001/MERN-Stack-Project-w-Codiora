import { Link } from "react-router-dom";
import "../styles/Records.css";

function Records() {

    return (

        <div className="records-container">

            <Link to="/students">

                <button className="records-btn">

                    View Saved Records

                </button>

            </Link>

        </div>

    );

}

export default Records;