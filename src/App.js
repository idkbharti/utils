import Navbar from "./components/Navbar";
import QrGenrator from "./screen/QrGenrator";
import UrlShortner from "./screen/UrlShortner"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer"

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
    <Footer/>
    </>
  );
}

export default App;
