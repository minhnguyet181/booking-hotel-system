import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Client/Home/HomePage';
import RoomCategoryPage from './Client/Rooms/RoomCategoryPage';
import ActivitiesPage from './Client/Activities/ActivitiesPage';
import DestinationsPage from './Client/Destinations/DestinationsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms/category/:roomTypeSlug" element={<RoomCategoryPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        {/* Thêm các route khác ở đây */}
      </Routes>
    </Router>
  );
}

export default App;