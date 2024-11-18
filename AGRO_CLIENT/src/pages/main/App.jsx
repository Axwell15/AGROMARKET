import './App.style.css';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/header";
import NavBar from "../../components/navBar/navBar";

const App = ({ hookNavigate }) => {
  const [ShowNavBar, setShowNavBar] = useState(false);
  const [category, setCategory] = useState(null);
  return (
    <>
      <Header Hook={setShowNavBar} Value={ShowNavBar} hookNavigate={hookNavigate} />
      <div className="app">
        <Outlet context={[category, setCategory]} />
        <NavBar className={`${ShowNavBar ? "show" : "hide"}`} value={ShowNavBar} hookNavigate={hookNavigate} />
      </div>
    </>
  );
}

export default App;