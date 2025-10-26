import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoStorefrontOutline, IoChatbubblesOutline, 
IoPersonOutline } from 'react-icons/io5';
import './BottomNav.css';

// This function calculates the class name. It's cleaner and safer.
const getNavLinkClass = ({ isActive }) => {
  return isActive ? 'nav-link active' : 'nav-link';
};

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={getNavLinkClass}>
        <IoHomeOutline />
        <span>Home</span>
      </NavLink>
      <NavLink to="/marketplace" className={getNavLinkClass}>
        <IoStorefrontOutline />
        <span>Marketplace</span>
      </NavLink>
      <NavLink to="/chats" className={getNavLinkClass}>
        <IoChatbubblesOutline />
        <span>Chat</span>
      </NavLink>
      <NavLink to="/profile" className={getNavLinkClass}>
        <IoPersonOutline />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
