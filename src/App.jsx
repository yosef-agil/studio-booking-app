import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext'; // ← ini penting!

import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminBookings from './pages/Admin/Bookings';
import AdminThemes from './pages/Admin/Themes';
import AdminSettings from './pages/Admin/Settings';
import AdminLayout from './components/AdminLayout';
import RequireAuth from './components/RequireAuth';



// ...

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="themes" element={<AdminThemes />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
