import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// import PropTypes from 'prop-types'

//top headlines: https://newsapi.org/v2/top-headlines?country=us&apiKey=f1134af9a2da439e8aaa37cda9871392
// api key f1134af9a2da439e8aaa37cda9871392

export default class App extends Component {
  pgSize=12;
  render() {
    return (
      <>
        <Router>
          <Navbar />

          
          <Routes>

            <Route key="home" exact path="/" element={<News pageSize={this.pgSize} country="in" category="general" />}>
            
            </Route>
            
            <Route  exact path="/business" element={<News key="business" pageSize={this.pgSize} country="in" category="business" />}>
            
            </Route>

            <Route  exact path="/entertainment" element={<News key="entertainment" pageSize={this.pgSize} country="in" category="entertainment" />}> </Route>

            

            <Route  exact path="/health" element={<News key="health" pageSize={this.pgSize} country="in" category="health" />}>
            </Route>

            <Route  exact path="/science" element={ <News key="science" pageSize={this.pgSize} country="in" category="science" />}>       
            </Route>

            <Route  exact path="/sports" element={<News key="sports" pageSize={this.pgSize} country="in" category="sports" />}>       
            </Route>

            <Route  exact path="/technology" element={<News key="technology" pageSize={this.pgSize} country="in" category="technology" />}>
            </Route>

            
          </Routes>
        </Router>
      </>
    );
  }
}
