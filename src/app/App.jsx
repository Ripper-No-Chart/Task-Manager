import React from "react";
import Task from "./Tasks/Index.jsx";
import { Navbar } from "./components/Navbar.jsx";

const App = () => {
  return (
    <div>
      <Navbar />
      <Task />
    </div>
  );
};

export default App;
