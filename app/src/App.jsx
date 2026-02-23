import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Client/Home/HomePage';
import RoomCategoryPage from './Client/Rooms/RoomCategoryPage';
import ActivitiesPage from './Client/Activities/ActivitiesPage';
import DestinationsPage from './Client/Destinations/DestinationsPage';
import LoginPage from './Client/Home/Login/LoginPage';
import AdminPage from './admin/AdminPage';
import UserManagementPage from './admin/ManageUser';
import ManageBooking from './admin/ManageBooking';
import ManageRooms from './admin/ManageRooms';
import RoomDetailPage from "./Client/Rooms/RoomDetailPage";
import BookingPage from "./Client/Booking/BookingPage";
import NotificationsPage from "./Client/Notifications/NotificationsPage";
import UserManagePage from "./Client/User/UserManagePage";
import RegisterPage from './Client/Home/Login/RegisterPage';
import ManageHandledBooking from './admin/ManageHandledBooking';
import ManageHotel from './admin/ManageHotel';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms/category/:roomTypeSlug" element={<RoomCategoryPage />} />
        <Route path="/rooms/:roomId" element={<RoomDetailPage />} />
        <Route path="/booking/:roomId" element={<BookingPage />} />
        <Route path="/users" element={<LoginPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path='/admin' element={<ProtectedRoute requireAdmin={true}><AdminPage/></ProtectedRoute>}  />
        <Route path='/admin/users' element={<ProtectedRoute requireAdmin={true}><UserManagementPage/></ProtectedRoute>}  />
        <Route path='/admin/bookings' element={<ProtectedRoute requireAdmin={true}><ManageBooking/></ProtectedRoute>}  />
        <Route path='/admin/rooms' element={<ProtectedRoute requireAdmin={true}><ManageRooms/></ProtectedRoute>}  />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/userManage" element={<UserManagePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/admin/bookings/handled' element={<ProtectedRoute requireAdmin={true}><ManageHandledBooking/></ProtectedRoute>}  />
        <Route path='/admin/hotel-info' element={<ProtectedRoute requireAdmin={true}><ManageHotel/></ProtectedRoute>}  />
        {/* Thêm các route khác ở đây */}
      </Routes>
    </Router>
  );
}

export default App;