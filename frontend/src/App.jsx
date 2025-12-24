import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Ourstory from "./pages/Ourstory";
import News from "./pages/News";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Alldetails from "./pages/Alldetails";
import Carrer from "./pages/Carrer";
import Contactus from "./pages/Contactus";
import Cart from "./pages/Cart"
import Fullnews from "./pages/Fullnews"
import Login from "./pages/Account/Login.jsx"
import Signup from "./pages/Account/Signup.jsx";
import Orderhistory from "./pages/Account/Orderhistory.jsx";
import Payment from "./pages/Account/Payment.jsx";
import Buynow from "./pages/Account/Buynow.jsx";
import Natural from "./components/Home/Natural.jsx"
import Chocolate from "./components/Home/Chocolate.jsx"
import Groundnutoil from "./components/Home/Groundnutoil.jsx"
import Sunfloweroil from "./components/Home/Sunfloweroil.jsx"
import Coconutoil from "./components/Home/Coconutoil.jsx"
import Privacy from "./components/Policies/Privacy.jsx";
import Termsandcondition from "./components/Policies/Termsandcondition.jsx";
import Return from "./components/Policies/Return.jsx";
import Shipping from "./components/Policies/Shipping.jsx";
function App(){
  return(
    <>
     <Router>
     <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/ourstory" element={<Ourstory />} />
        <Route path="/news" element={<News />} />
        <Route path="/carrer" element={<Carrer/>}/>
        <Route path="/contactus" element={<Contactus/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/shop/alldetails/:urls" element={<Alldetails/>}/>
        <Route path="/news/:id" element={<Fullnews/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/orderhistory" element={<Orderhistory/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/buynow" element={<Buynow/>}/>
        <Route path="/shop/natural" element={<Natural/>}/>
        <Route path="/shop/chocolate" element={<Chocolate/>}/>
        <Route path="/shop/groundnutoil" element={<Groundnutoil/>}/> 
        <Route path="/shop/coconutoil" element={<Coconutoil/>}/>
        <Route path="/shop/sunfloweroil" element={<Sunfloweroil/>}/>
        <Route path="/privacy" element={<Privacy/>}/>
        <Route path="/terms" element={<Termsandcondition/>}/>
        <Route path="/return" element={<Return/>}/>
        <Route path="/shipping" element={<Shipping/>}/>
      </Routes>
      <Footer />
    </Router>

    </>
  )
}
export default App