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

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard', requireAuth: true },
    { path: '/upload', label: 'Upload DNA/RNA', requireAuth: true },
    { path: '/results', label: 'Results', requireAuth: true },
    { path: '/docs', label: 'Documentation' },
    { path: '/faq', label: 'FAQ' },
  ];

  // Add admin route for all users (for testing)
  const adminNavItems = [
    { path: '/admin', label: 'Admin', requireAuth: true, adminOnly: true }
  ];

  const allNavItems = [...navItems, ...adminNavItems];

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
          {allNavItems.map((item) => {
            // Show all items regardless of authentication for now
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navLink} ${
                  isActive(item.path) ? styles.active : ''
                } ${'adminOnly' in item && item.adminOnly ? styles.adminLink : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
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

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className={styles.mobileNav}>
          {allNavItems.map((item) => {
            // Show all items regardless of authentication for now
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.mobileNavLink} ${
                  isActive(item.path) ? styles.active : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          
          {/* Mobile Auth Section */}
          <div className={styles.mobileAuthSection}>
            {isAuthenticated ? (
              <>
                <div className={styles.mobileUserInfo}>
                  <User size={16} />
                  <span>{user?.name || user?.email}</span>
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className={styles.mobileSignOutButton}
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className={styles.mobileSignInButton}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className={styles.mobileSignUpButton}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;