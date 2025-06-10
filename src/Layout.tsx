import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/define">Define</Link>
        <Link to="/extract">Extract</Link>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
