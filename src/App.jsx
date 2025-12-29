import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
export const App = () => {
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
        </header>
        <p>Search</p>
      </div>
    </main>
  );
};
