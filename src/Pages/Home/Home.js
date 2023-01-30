import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

function Home() {
  return (
    <div className="home_page">
      <div className="home_icon">
        <svg viewBox="0 0 512 512">
          <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5
            c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9
            c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C 451.5,423.4 451.5,400.7 437.5,386.6z"/>
        </svg>
      </div>
      <h1>Bienvenue sur l'application</h1>
      <div>
        <Link to="/dashboard" className="blue_btn">Dashboard</Link>
        <Link to="/recettes" className="blue_btn">Liste des Recettes</Link>
        <Link to="/addRecette" className="blue_btn">Nouvelle Recette</Link>
      </div>
    </div>
  );
}

export default Home;
