import { BrowserRouter, Routes, Route } from "react-router-dom";

import Form from "./components/Form";
import Records from "./components/Records";
import StudentManagement from "./pages/StudentManagement";

import "./App.css";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route

          path="/"

          element={

            <div className="app-container">

              <main className="main-content">

                <Form />

                <Records />

              </main>

            </div>

          }

        />

        <Route

          path="/students"

          element={<StudentManagement />}

        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;