import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="bg-Green text-darkGray w-screen px-4 font-bold text-lightGray">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-xl font-bold">
          {/* Use the FontAwesome muscle icon */}
          <FontAwesomeIcon icon={faDumbbell} className="mr-2" />
        </div>
        <div className={`hidden md:flex space-x-4 ${showMenu ? 'flex' : 'hidden'}`}>
          <a href="/" className="hover:text-gray-800">WORKOUTS</a>
          <a href="/addWorkout" className="hover:text-gray-800">ADD WORKOUT</a>
        </div>
        <div className="block md:hidden" onClick={toggleMenu}>
          <div className={`w-6 h-px bg-lightGray mb-1 ${showMenu ? 'transform rotate-45' : ''}`}></div>
          <div className={`w-6 h-px bg-lightGray mb-1 ${showMenu ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-px bg-lightGray mb-1 ${showMenu ? 'transform -rotate-45' : ''}`}></div>
        </div>
      </div>
      <div className={`md:hidden ${showMenu ? 'block' : 'hidden'} text-center`}>
        <a href="/" className="block px-4 py-2 text-lightGray">WORKOUTS</a>
        <a href="/addWorkout" className="block px-4 py-2 text-lightGray">ADD WORKOUT</a>
      </div>
    </nav>
  );
};

export default Navbar;


