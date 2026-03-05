'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch('/api/admin/check')
      .then((r) => r.json())
      .then((data) => {
        setAuthenticated(data.authenticated);
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
    } else {
      setError('Fel lösenord');
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthenticated(false);
  }

  if (checking) return <div className={styles.loading}>Laddar...</div>;

  if (!authenticated) {
    return (
      <div className={styles.loginPage}>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <h1>Admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Lösenord"
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Logga in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Admin</h1>
        <button onClick={handleLogout} className={styles.logout}>
          Logga ut
        </button>
      </div>
      <div className={styles.grid}>
        <a href="/admin/meny" className={styles.card}>
          <h2>Meny</h2>
          <p>Redigera menyn</p>
        </a>
        <a href="/admin/oppettider" className={styles.card}>
          <h2>Öppettider</h2>
          <p>Ändra öppettider</p>
        </a>
        <a href="/admin/kontakt" className={styles.card}>
          <h2>Kontakt</h2>
          <p>Ändra kontaktuppgifter</p>
        </a>
        <a href="/admin/om-oss" className={styles.card}>
          <h2>Om oss</h2>
          <p>Redigera om oss-text</p>
        </a>
      </div>
    </div>
  );
}
