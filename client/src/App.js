import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import { ReactDOM } from 'react';
// import Navbar from './components/navbar';
import Main from './components/main/main';
import Show from './components/show/show';


// const Routing = () => {
//   return (
//     <Routes>
//       <Route exact path="/" component={Main} />
//       <Route path="/:code" component={Show} />
//     </Routes>
//   );
// };


function App() {
  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:code" element={<Show/>}/>
      </Routes>
    </Router>
  );
}

export default App;
