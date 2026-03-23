import Link from 'next/link';
import { getContact } from '@/lib/data';
import styles from './Footer.module.css';

export default async function Footer() {
  const contact = await getContact() as {
    address: string;
    phone: string;
    instagram?: string;
    website?: string;
    notice?: string;
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3>Yours Sushi & Wok</h3>
          <p>{contact.address}</p>
          <p><a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}>{contact.phone}</a></p>
          {contact.instagram && (
            <p>
              <a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener noreferrer">
                @{contact.instagram}
              </a>
            </p>
          )}
          {contact.notice && <span className={styles.notice}>{contact.notice}</span>}
        </div>
        <div className={styles.column}>
          <h3>Sidor</h3>
          <nav>
            <Link href="/meny">Meny</Link>
            <Link href="/om-oss">Om oss</Link>
            <Link href="/kontakt">Kontakt</Link>
          </nav>
        </div>
        <div className={styles.column}>
          <h3>Besök oss</h3>
          <p>Tegelviksgatan 45</p>
          <p>116 47 Stockholm</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Yours Sushi & Wok</p>
      </div>
    </footer>
  );
}
