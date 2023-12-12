import './App.css';
import React from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';

const App=()=> {
 const pagesize=5;
 const apiKey=process.env.REACT_APP_NEWS_API


const[progress,setProgress]=useState(0)




    return (
      <div>
        <Router>
        <NavBar />
        
      <LoadingBar
      height={3}
        color='#f11946'
        progress={progress}
      
      />
      
<Routes>
<Route path='/' element={  <News  setProgress={setProgress} apiKey={apiKey}   key="general" pagesize={pagesize} country="in" category="general" />} />
<Route path='/business' element={  <News  setProgress={setProgress} apiKey={apiKey}  key="business" pagesize={pagesize} country="in" category="business" />} />
<Route path='/entertainment' element={  <News  setProgress={setProgress} apiKey={apiKey}  key="entertainment" pagesize={pagesize} country="in" category="entertainment" />} />
<Route path='/health' element={  <News  setProgress={setProgress} apiKey={apiKey}  key="health" pagesize={pagesize} country="in" category="health" />} />
<Route path='/science' element={  <News  setProgress={setProgress} apiKey={apiKey}  key="science" pagesize={pagesize} country="in" category="science" />} />
<Route path='/sports' element={  <News  setProgress={setProgress} apiKey={apiKey}  key="sports" pagesize={pagesize} country="in" category="sports" />} />
<Route path='/technology' element={  <News  setProgress={setProgress} apiKey={apiKey}  key="technology" pagesize={pagesize} country="in" category="technology" />} />



</Routes>


        </Router>
      </div>
    )
  
}

export default App; 