import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./Client/Home/HomePage";
import RoomCategoryPage from "./Client/Rooms/RoomCategoryPage";
import RoomDetailPage from "./Client/Rooms/RoomDetailPage";
import BookingPage from "./Client/Booking/BookingPage";
import ActivitiesPage from "./Client/Activities/ActivitiesPage";
import DestinationsPage from "./Client/Destinations/DestinationsPage";
import LoginPage from "./Client/Home/Login/LoginPage";
import NotificationsPage from "./Client/Notifications/NotificationsPage";
import UserManagePage from "./Client/User/UserManagePage";

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
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/userManage" element={<UserManagePage />} />
        {/* Thêm các route khác ở đây */}
      </Routes>
    </Router>
  );
}

export default App;