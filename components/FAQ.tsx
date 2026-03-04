'use client';

import { useState } from 'react';
import FadeIn from '@/components/FadeIn';
import styles from './FAQ.module.css';

const faqs = [
    {
        question: "Hur fungerar er takeaway?",
        answer: "Vi förpackar varje beställning noggrant för att maten ska hålla högsta kvalitet och presentation hela vägen hem. Ring oss på 08-641 75 05 för att beställa, så säger vi till när maten är redo att hämtas på Tegelviksgatan 45."
    },
    {
        question: "Har ni veganska eller vegetariska alternativ?",
        answer: "Absolut! Vi erbjuder flera veganska och vegetariska sushibitar, inklusive rullar, nigiri och poké bowls. Säg bara till vid beställning så anpassar vi."
    },
    {
        question: "Kan jag boka ett bord i er restaurang?",
        answer: "Ja, vi har ett antal mysiga sittplatser. Men eftersom vår restaurang är liten rekommenderar vi takeaway för stora sällskap eller att ringa och boka i god tid om ni vill sitta hos oss."
    },
    {
        question: "Hur hanterar ni allergier (t.ex. gluten eller nötter)?",
        answer: "Vänligen informera oss alltid om dina allergier när du beställer. Vi har glutenfri soja och är mycket noggranna med våra arbetsytor, men vi kan inte garantera en helt spårfri miljö."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faqSection}>
            <div className={styles.container}>
                <FadeIn direction="up" className={styles.textWrap}>
                    <span className={styles.label}>Frågor och svar</span>
                    <h2 className={styles.heading}>Vanliga frågor</h2>
                    <p className={styles.body}>
                        Här har vi samlat de vanligaste frågorna vi får från våra gäster.
                        Hittar du inte det du letar efter? Ring oss gärna.
                    </p>
                </FadeIn>

                <div className={styles.accordion}>
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <FadeIn key={i} direction="up" delay={0.1 + i * 0.1} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                                <button
                                    className={styles.question}
                                    onClick={() => toggleOpen(i)}
                                    aria-expanded={isOpen}
                                >
                                    {faq.question}
                                    <span className={styles.icon}>+</span>
                                </button>
                                <div
                                    className={styles.answerWrap}
                                    style={{ maxHeight: isOpen ? '200px' : '0' }}
                                >
                                    <p className={styles.answer}>{faq.answer}</p>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
