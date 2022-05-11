import "./App.css";
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import CreateActivity from "./components/CreateActivity/CreateActivity";
import Detail from "./components/Detail/Detail";
// import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<CreateActivity />} />
          <Route exact path="/country/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
