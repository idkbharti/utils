import Navbar from "./component/Navbar";
import QrGenrator from "./screen/QrGenrator";
import UrlShortner from "./screen/UrlShortner"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar/>
     <Router basename="/">
      <Routes>
        <Route exact path="/qr"  element={<UrlShortner/>} />
        <Route path="/" exact element={<QrGenrator/>} />
      </Routes>
    </Router> 
    </>
  );
}

export default App;
