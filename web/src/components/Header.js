import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ sepetAdet }) {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>KIYAFET MAĞAZASI</h1>
        </Link>
        
        <nav className="nav">
          <Link to="/">Ana Sayfa</Link>
          <Link to="/kategoriler">Kategoriler</Link>
          <Link to="/kampanyalar">Kampanyalar</Link>
        </nav>
        
        <div className="header-actions">
          <button className="icon-btn">🔍</button>
          <button className="icon-btn">👤</button>
          <Link to="/sepet" className="icon-btn sepet-btn">
            🛒
            {sepetAdet > 0 && <span className="badge">{sepetAdet}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
