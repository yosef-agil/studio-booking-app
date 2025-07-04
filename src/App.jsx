import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import AuthProvider from './context/AuthContext'; // ← ini penting!

import HomePage from './pages/HomePage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import AdminLogin from './pages/Admin/Login.jsx';
import AdminDashboard from './pages/Admin/Dashboard.jsx';
import AdminBookings from './pages/Admin/Bookings.jsx';
import AdminThemes from './pages/Admin/Themes.jsx';
import AdminSettings from './pages/Admin/Settings.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import RequireAuth from './components/RequireAuth.jsx';



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
