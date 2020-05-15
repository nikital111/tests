import React from "react";
import Header from "../components/Static/Header/Header";
import Footer from "../components/Static/Footer/Footer";
import "./App.css";
import Router from "../config/Router";

function App() {
  return (
    <>
      <Header />
      <div className="page">
        <Router />
      </div>
      <Footer />
    </>
  );
}

export default App;
