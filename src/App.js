import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'

// import PropTypes from 'prop-types'

//top headlines: https://newsapi.org/v2/top-headlines?country=us&apiKey=f1134af9a2da439e8aaa37cda9871392
// api key f1134af9a2da439e8aaa37cda9871392

export default class App extends Component {
  pgSize=12;

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  
  render() {
    return (
      <>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
          <Navbar />

          
          <Routes>

            <Route key="home" exact path="/" element={<News setProgress={this.setProgress} pageSize={this.pgSize} country="in" category="general" />}>
            </Route>
            
            <Route  exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pgSize} country="in" category="business" />}>
            
            </Route>

            <Route  exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pgSize} country="in" category="entertainment" />}> </Route>

            

            <Route  exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pgSize} country="in" category="health" />}>
            </Route>

            <Route  exact path="/science" element={ <News setProgress={this.setProgress} key="science" pageSize={this.pgSize} country="in" category="science" />}>       
            </Route>

            <Route  exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pgSize} country="in" category="sports" />}>       
            </Route>

            <Route  exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pgSize} country="in" category="technology" />}>
            </Route>

            
          </Routes>
        </Router>
      </>
    );
  }
}
