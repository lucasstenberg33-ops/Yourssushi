import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3>Yours Sushi & Woks</h3>
          <p>Tegelviksgatan 45</p>
          <p>116 47 Stockholm</p>
        </div>
        <div className={styles.column}>
          <h3>Kontakt</h3>
          <p><a href="tel:08-6417505">08-641 75 05</a></p>
        </div>
        <div className={styles.column}>
          <h3>Sidor</h3>
          <nav>
            <Link href="/meny">Meny</Link>
            <Link href="/om-oss">Om oss</Link>
            <Link href="/kontakt">Kontakt</Link>
          </nav>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Yours Sushi & Woks</p>
      </div>
    </footer>
  );
}
