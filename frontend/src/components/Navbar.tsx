import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dna, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, signOut } = useAuth();

  const mainNavItems = [
    { path: '/', label: 'Home' },
    { path: '/upload', label: 'Upload DNA/RNA' },
    { path: '/results', label: 'Results' },
    { path: '/blockchain', label: 'Blockchain' },
  ];

  // Menu items that go in the hamburger dropdown
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/admin', label: 'Admin Dashboard' },
    { path: '/docs', label: 'Documentation' },
    { path: '/faq', label: 'FAQ' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = () => {
    signOut();
    toast.success('Signed out successfully');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <Dna className={styles.logoIcon} />
          <span className={styles.logoText}>Genomic Platform</span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          {mainNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${
                isActive(item.path) ? styles.active : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className={styles.authSection}>
          {isAuthenticated ? (
            <div className={styles.userMenu}>
              <div className={styles.userInfo}>
                <User size={16} />
                <span>{user?.name || user?.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className={styles.signOutButton}
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/signin" className={styles.signInButton}>
                Sign In
              </Link>
              <Link to="/signup" className={styles.signUpButton}>
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Menu Button (Always visible) */}
        <button
          className={styles.menuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.menuContent}>
            {menuItems.map((item) => (
              <div key={item.path} className={styles.menuItemWrapper}>
                <Link
                  to={item.path}
                  className={`${styles.menuItem} ${
                    isActive(item.path) ? styles.active : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                <button
                  className={styles.closeButton}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label={`Close ${item.label}`}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;