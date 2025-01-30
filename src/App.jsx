import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import OrganizationSetup from "./components/OrganizationSetup";
import Integration from "./components/Integration";
import Verify from "./components/Verify";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/organization" element={<OrganizationSetup />} />
      <Route path="/integration" element={<Integration />} />
    </Routes>
  );
}

export default App;
