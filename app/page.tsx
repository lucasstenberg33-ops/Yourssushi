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

export default async function Home() {
  const hours = await getHours() as { day: string; hours: string }[];
  const contact = await getContact() as {
    address: string;
    phone: string;
    googleMapsUrl: string;
  };

  const today = new Date().getDay();

  return (
    <div className={styles.page}>
      {/* Hero: Logo + text left, overlapping image gallery right */}
      <section className={styles.hero}>
        <FadeIn direction="up" className={styles.heroContent}>
          <div className={styles.heroLogoWrapper}>
            <Image
              src="/logo.svg"
              alt="Yours Sushi & Wok"
              fill
              priority
              className={styles.heroLogo}
            />
          </div>
          <p className={styles.heroTagline}>Sushi & Asiatisk Mat</p>
          <p className={styles.heroLocation}>Södermalm, Stockholm</p>
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

        <FadeIn direction="left" delay={0.2} className="overlap-gallery">
          <div className="overlap-main">
            <Image
              src="/Imagetoimage_enhancement_using_the_provided_refere_delpmaspu (2).png"
              alt="Sushi Platter Collection"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="overlap-secondary overlap-bottom-left overlap-landscape">
            <Image
              src="/pokebowl.png"
              alt="Poke Bowl"
              width={400}
              height={300}
              sizes="300px"
            />
          </div>
        </FadeIn>
      </section>

      {/* Feature Block 1: Handgjort */}
      <section className={styles.featureBlock}>
        <FadeIn direction="up" className="overlap-gallery">
          <div className="overlap-main">
            <Image
              src="/__prompt_professional_highend_food_photography_of__delpmaspu (1).png"
              alt="Handgjorda Gyoza"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={0.15} className={styles.featureTextRight}>
          <h2 className={styles.featureHeading}>Tradition möter<br />passion</h2>
          <p className={styles.featureBody}>
            Varje rätt tillagas med omsorg och de bästa råvarorna.
            Från klassisk nigiri till kreativa fusionrätter — allt handgjort på Södermalm.
          </p>
          <Link href="/meny" className={styles.featureBtn}>
            Utforska menyn
          </Link>
        </FadeIn>
      </section>

      {/* Feature Block 2: Besök oss (reversed) */}
      <section className={styles.featureBlock}>
        <FadeIn direction="up" className={styles.featureTextLeft}>
          <h2 className={styles.featureHeading}>Välkommen in</h2>
          <p className={styles.featureBody}>
            Vi finns på Tegelviksgatan 45, mitt i hjärtat av Södermalm.
            Slå dig ner hos oss eller beställ hem.
          </p>
          <ul className={styles.featureList}>
            {hours.map((h) => (
              <li key={h.day}>
                <span className={styles.checkIcon}>—</span>
                {h.day}: {h.hours}
              </li>
            ))}
          </ul>
          <Link href="/kontakt" className={styles.featureBtn}>
            Kontakta oss
          </Link>
          <p className={styles.featureHours}>
            {contact.address}
          </p>
        </FadeIn>
        <FadeIn direction="left" delay={0.15} className="overlap-gallery">
          <div className="overlap-main">
            <Image
              src="/Imagetoimage_enhancement_using_the_provided_refere_delpmaspu (1).png"
              alt="Sushi Premium Rolls"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="overlap-secondary overlap-top-left overlap-square">
            <Image
              src="/__prompt_professional_highend_food_photography_of__delpmaspu.png"
              alt="Tempura Shrimp Bowl"
              width={300}
              height={300}
              sizes="250px"
            />
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
