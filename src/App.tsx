import React from "react";
import "./App.css";
import Lists from "./pages/Lists";
import { Navigate, Route, Routes } from "react-router-dom";
import Forms from "./pages/forms/Forms";
import Layout from "./components/common/layout/Layout";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/lists" element={<Lists />} />
          <Route path="/form" element={<Forms />} />
          <Route path="/" element={<Navigate to="/form" />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
