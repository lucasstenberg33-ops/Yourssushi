import { getAbout, getContact } from '@/lib/data';
import styles from './page.module.css';

export default function OmOss() {
  const about = getAbout() as { title: string; text: string };
  const contact = getContact() as {
    address: string;
    phone: string;
    googleMapsUrl: string;
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{about.title}</h1>
      <p className={styles.text}>{about.text}</p>

      <div className={styles.map}>
        <h2>Hitta hit</h2>
        <p>{contact.address}</p>
        <a
          href={contact.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapLink}
        >
          Öppna i Google Maps
        </a>
      </div>
    </div>
  );
}
