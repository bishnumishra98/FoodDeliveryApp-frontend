import './App.css';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import { BrowserRouter, Routes, Route, Link, Switch } from 'react-router-dom';
import Cartscreen from './screens/Cartscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homescreen />} />
				<Route path="/cart" element={<Cartscreen />} />
			</Routes>
		</BrowserRouter>
    </div>
  );
}

export default App;
