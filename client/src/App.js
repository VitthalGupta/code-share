import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import { ReactDOM } from 'react';
// import Navbar from './components/navbar';
import Main from './components/main/main';
import Show from './components/show/show';
import Collect from  './components/colllection/collect';
import ViewIp from './components/viewIP/viewIP';


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
        <Route path="/urlList" element={<Collect/>} />
        <Route path="/urlList/view/:code" element={<ViewIp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
