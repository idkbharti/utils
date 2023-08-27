import Navbar from "./Navbar";
import QrGenrator from "./QrGenrator";
import UrlShortner from "./UrlShortner"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="bg-black w-[100vw] h-[100vh]">
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
