import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { Home } from './pages/Home';
import { HotelDetail } from './pages/HotelDetail';
import { About } from './pages/About';
import { Jobs } from './pages/Jobs';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { useState } from 'react';

function Login({ onLogin }: { onLogin: (password: string) => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'REdesign') {
      onLogin(password);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Geschützter Bereich
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#c4984d] focus:border-[#c4984d] focus:z-10 sm:text-sm"
              placeholder="Passwort eingeben"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">
              Falsches Passwort. Bitte versuchen Sie es erneut.
            </p>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#c4984d] hover:bg-[#ab813d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c4984d]"
            >
              Einloggen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (password: string) => {
    setIsAuthenticated(true);
    // Optional: Save to sessionStorage to persist during page refreshes
    sessionStorage.setItem('isAuthenticated', 'true');
  };

  // Check sessionStorage on component mount
  useState(() => {
    const authStatus = sessionStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  });

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels/:hotelId" element={<HotelDetail />} />
            <Route path="/about/*" element={<About />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;