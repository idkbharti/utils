import Navbar from "./Navbar";
import QrGenrator from "./QrGenrator";
import UrlShortner from "./UrlShortner"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="bg-black w-full h-full">
      <Navbar/>
     <Router basename="/">
      <Routes>
        {/* <Route path="/"  element={<UrlShortner/>} /> */}
        <Route path="/" exact element={<QrGenrator/>} />
      </Routes>
    </Router> 
    </div>
  );
}

export default App;
