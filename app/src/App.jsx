import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import HomePage from './Client/Home/HomePage';
import RoomCategoryPage from './Client/Rooms/RoomCategoryPage';
import ActivitiesPage from './Client/Activities/ActivitiesPage';
import DestinationsPage from './Client/Destinations/DestinationsPage';
import LoginPage from './Client/Home/Login/LoginPage';
import AdminPage from './admin/AdminPage';
import UserManagementPage from './admin/ManageUser';
import BookingsManagement from './admin/ManageBooking';
import ManageRooms from './admin/ManageRooms';
=======
import HomePage from "./Client/Home/HomePage";
import RoomCategoryPage from "./Client/Rooms/RoomCategoryPage";
import RoomDetailPage from "./Client/Rooms/RoomDetailPage";
import BookingPage from "./Client/Booking/BookingPage";
import ActivitiesPage from "./Client/Activities/ActivitiesPage";
import DestinationsPage from "./Client/Destinations/DestinationsPage";
import LoginPage from "./Client/Home/Login/LoginPage";
import NotificationsPage from "./Client/Notifications/NotificationsPage";
import UserManagePage from "./Client/User/UserManagePage";

>>>>>>> d9413dc99626e73f34e9f6272bc22fbcc0f556be
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
<<<<<<< HEAD
        <Route path='/admin' element={<AdminPage/>}  />
        <Route path='/admin/users' element={<UserManagementPage/>}  />
        <Route path='/admin/bookings' element={<BookingsManagement/>}  />
        <Route path='/admin/rooms' element={<ManageRooms/>}  />

=======
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/userManage" element={<UserManagePage />} />
>>>>>>> d9413dc99626e73f34e9f6272bc22fbcc0f556be
        {/* Thêm các route khác ở đây */}
      </Routes>
    </Router>
  );
}

export default App;