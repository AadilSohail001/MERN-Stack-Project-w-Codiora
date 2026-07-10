import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Form from "./components/Form";
import Records from "./components/Records";

import "./App.css";

// Lazy Loaded Page
const StudentManagement = lazy(() =>
  import("./pages/StudentManagement")
);

function App() {

  return (

    <BrowserRouter>

      <Suspense
        fallback={
          <div className="loading-page">
            Loading...
          </div>
        }
      >

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

      </Suspense>

    </BrowserRouter>

  );

}

export default App;