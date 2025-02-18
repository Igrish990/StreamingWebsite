// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import "./styles.css";
import "./index.css";
import TvSeriesPage from "./pages/TvSeriesPage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/tv/:id" element={<TvSeriesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
