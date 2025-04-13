import React, { useState } from 'react';
import FamilyTree from './components/FamilyTree';  // Adjust the path as needed
import './styles.css';  // Import your styles

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="header">
        <h1>شجرة عائلة قصر أولاد بوبكر</h1>
        <input
          type="text"
          className="search-bar"
          placeholder="ابحث عن شخص ..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </header>

      {/* Main Content Layout */}
      <div className="main-container">
        {/* Sidebar */}
        <nav className="sidebar">
          <ul>
            <li><a href="#home">الرئيسية</a></li>
            <li><a href="#search">البحث</a></li>
            <li><a href="#settings">الإعدادات</a></li>
            <li><a href="#settings">أفراح الجنوب</a></li>
            <li><a href="#settings">إحصائيات</a></li>
            <li><a href="#relation" target='maincontent'>ماهي العلاقة بينهما؟</a></li>
          </ul>
        </nav>

        {/* Family Tree Component */}
        <div className="content" name='maincontent'>
          <FamilyTree searchQuery={searchQuery} />
        </div>
      </div>
      <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>&copy; 2025 قصر أولاد بوبكر - All Rights Reserved</p>
        </div>
        <div className="footer-right">
          <p>Contact Us: <a href="mailto:info@kasrouledboubaker.com">info@kasrouledboubaker.com</a></p>
          <p>Follow us on:</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default App;
