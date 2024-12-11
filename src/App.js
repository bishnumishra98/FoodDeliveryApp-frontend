import './App.css';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import 'bootstrap';
import { BrowserRouter, Routes, Route, Link, Switch } from 'react-router-dom';
import Cartscreen from './screens/Cartscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Ordersscreen from './screens/Ordersscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homescreen />} />
				<Route path="/cart" element={<Cartscreen />} />
				<Route path="/register" element={<Registerscreen />} />
				<Route path="/login" element={<Loginscreen />} />
				<Route path="/orders" element={<Ordersscreen />} />
			</Routes>
		</BrowserRouter>
    </div>
  );
}

export default App;
