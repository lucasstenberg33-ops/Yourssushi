import Link from 'next/link';
import Image from 'next/image';
import { getHours, getContact } from '@/lib/data';
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

export default function Home() {
  const hours = getHours() as { day: string; hours: string }[];
  const contact = getContact() as {
    address: string;
    phone: string;
    googleMapsUrl: string;
  };

  const today = new Date().getDay();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/logo.svg"
          alt="Yours Sushi & Woks"
          width={280}
          height={156}
          priority
          className={styles.heroLogo}
        />
        <p className={styles.tagline}>Sushi & Wok i Södermalm</p>
        <div className={styles.cta}>
          <Link href="/meny" className={styles.ctaPrimary}>
            Se menyn
          </Link>
          <Link href="/kontakt" className={styles.ctaSecondary}>
            Kontakta oss
          </Link>
        </div>
      </section>

      <section className={styles.info}>
        <div className={styles.infoCard}>
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

        <div className={styles.infoCard}>
          <h2>Hitta hit</h2>
          <p>{contact.address}</p>
          <a
            href={contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            Visa på kartan
          </a>
          <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className={styles.phoneLink}>
            {contact.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
