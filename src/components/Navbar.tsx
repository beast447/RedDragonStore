import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import SignIn from './SignIn';

// Simple navbar mimicking Brotallion dark theme
function Navbar(): React.ReactElement {
    const { items } = useCart();
    const { user, signOut } = useAuth();
    const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    return (
        <header className="fixed top-0 left-0 w-full z-20 bg-black/80 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <a href="/" className="text-white text-xl font-bold tracking-wide uppercase">
                    Red Dragons
                </a>
                {/* Hamburger Button */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                <ul
                    className={`${
                        menuOpen ? 'block' : 'hidden'
                    } absolute top-full left-0 w-full bg-black/90 md:bg-transparent md:static md:flex md:gap-6 text-sm md:text-base text-white font-medium items-center py-4 md:py-0`}
                    onClick={() => setMenuOpen(false)}
                >
                    <li>
                        <a href="#shop" className="hover:text-red-500 transition-colors block px-6 md:px-0 py-2 md:py-0">
                            Shop
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="hover:text-red-500 transition-colors block px-6 md:px-0 py-2 md:py-0">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-red-500 transition-colors block px-6 md:px-0 py-2 md:py-0">
                            Contact
                        </a>
                    </li>
                    <li>
                        <a href="#cart" className="relative hover:text-red-500 transition-colors block px-6 md:px-0 py-2 md:py-0">
                            Cart
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </a>
                    </li>
                    <li>
                        {user ? (
                            <button onClick={signOut} className="hover:text-red-500 transition-colors block px-6 md:px-0 py-2 md:py-0 w-full text-left md:text-center">
                                Sign Out
                            </button>
                        ) : (
                            <button onClick={() => setShowSignIn(true)} className="hover:text-red-500 transition-colors block px-6 md:px-0 py-2 md:py-0">
                                Sign In
                            </button>
                        )}
                    </li>
                </ul>
            </nav>
            <SignIn open={showSignIn} onClose={() => setShowSignIn(false)} />
        </header>
    );
}

export default Navbar; 