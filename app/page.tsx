import Link from 'next/link';
import Image from 'next/image';
import { getHours, getContact } from '@/lib/data';
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
        <div className={styles.heroContent}>
          <FadeIn direction="up">
            <div className={styles.heroLogoWrapper}>
              <Image
                src="/logo.svg"
                alt="Yours Sushi & Woks"
                width={330}
                height={184}
                priority
                className={styles.heroLogo}
              />
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <div className={styles.heroDivider} />
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <p className={styles.heroTagline}>Sushi & Asiatisk Mat</p>
          </FadeIn>
          <FadeIn direction="up" delay={0.4}>
            <p className={styles.heroLocation}>Södermalm, Stockholm</p>
          </FadeIn>
          <FadeIn direction="up" delay={0.5}>
            <div className={styles.heroCta}>
              <Link href="/meny" className={styles.ctaPrimary}>
                Se menyn
              </Link>
              <a
                href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                className={styles.ctaSecondary}
              >
                Ring & beställ
              </a>
            </div>
          </FadeIn>
        </div>
        <FadeIn direction="left" delay={0.6} className="overlap-gallery">
          <div className="overlap-main">
            <Image
              src="/__prompt_professional_highend_food_photography_of__delpmaspu (1).png"
              alt="Premium Sushi"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
          <div className="overlap-secondary overlap-bottom-left overlap-portrait">
            <Image
              src="/Imagetoimage_enhancement_using_the_provided_refere_delpmaspu (1).png"
              alt="Sushi Set"
              fill
              priority
              sizes="(max-width: 768px) 50vw, 30vw"
            />
          </div>
        </FadeIn>
      </section>

      {/* Feature Section 1: Image Left, Text Right */}
      <section className={styles.featureBlock}>
        <FadeIn direction="right" className="overlap-gallery">
          <div className="overlap-main">
            <Image
              src="/Imagetoimage_enhancement_using_the_provided_refere_delpmaspu (2).png"
              alt="Premium Sushi Boxes"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="overlap-secondary overlap-bottom-right overlap-square">
            <Image
              src="/__prompt_professional_highend_food_photography_of__delpmaspu.png"
              alt="Sushi Platter Detail"
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
            />
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2} className={styles.featureTextRight}>
          <h2 className={styles.featureHeading}>Beställ enkelt via telefon</h2>
          <p className={styles.featureBody}>
            Ring oss för att beställa din sushi. Vi förbereder allt med omsorg så att
            din måltid är perfekt när du hämtar den. Vår takeaway är designad för att
            behålla kvalitet och presentation hela vägen hem.
          </p>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.checkIcon}>✓</span> Färska ingredienser varje dag
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Noggrant förpackat för transport
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Samma kvalitet som på plats
            </li>
            <li>
              <span className={styles.checkIcon}>✓</span> Snabb service
            </li>
          </ul>
          <a
            href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
            className={styles.featureBtn}
          >
            &#9990; Ring och beställ
          </a>
          <p className={styles.featureHours}>
            &#128336; Mån–Fre: 11–21 | Lör–Sön: 12–21
          </p>
        </FadeIn>
      </section>

      {/* Feature Section 2: Text Left, Image Right */}
      <section className={styles.featureBlock}>
        <FadeIn direction="up" className={styles.featureTextLeft}>
          <h2 className={styles.featureHeading}>Takeaway</h2>
          <p className={styles.featureBody}>
            Takeaway som håller premiumkvalitet hela vägen hem. Vi förpackar
            varje beställning med omsorg för att din sushi ska vara lika perfekt
            hemma som hos oss.
          </p>
          <a
            href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
            className={styles.featureBtn}
          >
            &#9990; Ring och beställ
          </a>
        </FadeIn>

        <FadeIn direction="left" delay={0.2} className="overlap-gallery">
          <div className="overlap-main">
            <Image
              src="/Just_the_bowl_wood_table_kartong_bowl_2k_delpmaspu.png"
              alt="Sushi Bowl Takeaway"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="overlap-secondary overlap-top-left overlap-portrait">
            <Image
              src="/pokebowl.png"
              alt="Salmon Nigiri Detail"
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
            />
          </div>
        </FadeIn>
      </section>

      {/* Info section */}
      <section className={styles.info}>
        <FadeIn direction="right" className={styles.infoLeft}>
          <span className={styles.label}>Öppettider</span>
          <div className={styles.hoursGrid}>
            {hours.map((h) => {
              const isToday = dayMap[h.day] === today;
              return (
                <div
                  key={h.day}
                  className={`${styles.hourRow} ${isToday ? styles.today : ''}`}
                >
                  <span>{h.day}</span>
                  <span className={styles.hourDots} />
                  <span>{h.hours}</span>
                </div>
              );
            })}
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={0.2} className={styles.infoRight}>
          <span className={styles.label}>Hitta hit</span>
          <p className={styles.address}>{contact.address}</p>
          <a
            href={contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.infoLink}
          >
            Visa på kartan
          </a>
          <div className={styles.phoneSeparator} />
          <span className={styles.label}>Reservera bord</span>
          <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className={styles.phoneNumber}>
            {contact.phone}
          </a>
        </FadeIn>
      </section>
    </div>
  );
}
