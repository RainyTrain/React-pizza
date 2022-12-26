import '../src/scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [searchQuery, setSearcgQuery] = useState('');
  return (
    <BrowserRouter>
      <div className="App">
        <div className="wrapper">
          <Header searchQuery={searchQuery} setSearcgQuery={setSearcgQuery} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
