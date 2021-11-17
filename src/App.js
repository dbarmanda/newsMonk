import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoadingBar from "react-top-loading-bar";

// import PropTypes from 'prop-types'

//top headlines: https://newsapi.org/v2/top-headlines?country=us&apiKey=f1134af9a2da439e8aaa37cda9871392


const App = () => {
  let pgSize = 12;


  const [progress, setProgress] = useState(0);

  return (
    <>
      <Router>
        <LoadingBar color="#f11946" progress={progress} />
        <Navbar />

        <Routes>
          <Route
            key="home"
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                pageSize={pgSize}
                country="in"
                category="general"
              />
            }
          ></Route>

          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setProgress}
                key="business"
                pageSize={pgSize}
                country="in"
                category="business"
              />
            }
          ></Route>

          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                key="entertainment"
                pageSize={pgSize}
                country="in"
                category="entertainment"
              />
            }
          >
            {" "}
          </Route>

          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                key="health"
                pageSize={pgSize}
                country="in"
                category="health"
              />
            }
          ></Route>

          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                key="science"
                pageSize={pgSize}
                country="in"
                category="science"
              />
            }
          ></Route>

          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                key="sports"
                pageSize={pgSize}
                country="in"
                category="sports"
              />
            }
          ></Route>

          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                key="technology"
                pageSize={pgSize}
                country="in"
                category="technology"
              />
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
};
export default App;