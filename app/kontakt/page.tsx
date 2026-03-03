import { getContact, getHours } from '@/lib/data';
import styles from './page.module.css';

const dayMap: Record<string, number> = {
  Söndag: 0,
  Måndag: 1,
  Tisdag: 2,
  Onsdag: 3,
  Torsdag: 4,
  Fredag: 5,
  Lördag: 6,
};

export default function Kontakt() {
  const contact = getContact() as {
    address: string;
    phone: string;
    googleMapsUrl: string;
  };
  const hours = getHours() as { day: string; hours: string }[];
  const today = new Date().getDay();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Kontakt</h1>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Ring oss</h2>
          <a
            href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
            className={styles.phone}
          >
            {contact.phone}
          </a>
        </div>

        <div className={styles.card}>
          <h2>Besök oss</h2>
          <p>{contact.address}</p>
          <a
            href={contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Visa på kartan
          </a>
        </div>

        <div className={`${styles.card} ${styles.hoursCard}`}>
          <h2>Öppettider</h2>
          {hours.map((h) => {
            const isToday = dayMap[h.day] === today;
            return (
              <div
                key={h.day}
                className={`${styles.hourRow} ${isToday ? styles.today : ''}`}
              >
                <span>{h.day}</span>
                <span>{h.hours}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
