import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import BottomNav from './components/BottomNav.jsx'
import ToastHost from './components/ToastHost.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import PropertyDetails from './pages/PropertyDetails.jsx'
import Compare from './pages/Compare.jsx'
import Saved from './pages/Saved.jsx'
import Roommates from './pages/Roommates.jsx'
import Profile from './pages/Profile.jsx'
import Bookings from './pages/Bookings.jsx'
import OwnerDashboard from './pages/OwnerDashboard.jsx'
import AddProperty from './pages/AddProperty.jsx'
import ReportListing from './pages/ReportListing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const isAuth = pathname === '/login' || pathname === '/signup'
  return (
    <div className="page">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/roommates" element={<Roommates />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/add-property" element={<AddProperty />} />
          <Route path="/report/:id" element={<ReportListing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAuth && <Footer />}
      <BottomNav />
      <ToastHost />
    </div>
  )
}