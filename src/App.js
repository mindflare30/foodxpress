import './App.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  //npm i bootstrap-dark-5 krke node
//modules se ye css import krlo
import Home from './screens/Home';
import {
  BrowserRouter as Router,Routes,Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';


function App() {
  return (
    // wrapping entire thing into CartProvider so all children can use
    <CartProvider> 
      <Router>
        <div>
          <Routes>
             {/* element me likha component render hoga */}
             {/* Newer Routing Way */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/myorder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
