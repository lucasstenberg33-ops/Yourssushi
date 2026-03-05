import { getContact, getHours } from '@/lib/data';
import FadeIn from '@/components/FadeIn';
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

export default async function Kontakt() {
  const contact = await getContact() as {
    address: string;
    phone: string;
    instagram?: string;
    website?: string;
    googleMapsUrl: string;
  };
  const hours = await getHours() as { day: string; hours: string }[];
  const today = new Date().getDay();

  return (
    <div className={styles.page}>
      <FadeIn direction="down">
        <h1 className={styles.title}>Kontakt</h1>
      </FadeIn>

      <div className={styles.grid}>
        <FadeIn direction="up" delay={0.1} className={styles.card}>
          <h2>Ring oss</h2>
          <a
            href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
            className={styles.phone}
          >
            {contact.phone}
          </a>
        </FadeIn>

        <FadeIn direction="up" delay={0.2} className={styles.card}>
          <h2>Besök oss</h2>
          <p>{contact.address}</p>
          <a
            href={contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Visa på kartan →
          </a>
        </FadeIn>

        {contact.instagram && (
          <FadeIn direction="up" delay={0.3} className={styles.card}>
            <h2>Instagram</h2>
            <a
              href={`https://instagram.com/${contact.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              @{contact.instagram}
            </a>
          </FadeIn>
        )}

        {contact.website && (
          <FadeIn direction="up" delay={0.4} className={styles.card}>
            <h2>Webbplats</h2>
            <a
              href={`https://${contact.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {contact.website}
            </a>
          </FadeIn>
        )}

        <FadeIn direction="up" delay={contact.instagram && contact.website ? 0.5 : 0.3} className={`${styles.card} ${styles.hoursCard}`}>
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
        </FadeIn>
      </div>
    </div>
  );
}
