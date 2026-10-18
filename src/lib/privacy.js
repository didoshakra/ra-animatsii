// src/lib/privacy.js
// Тексти політики конфіденційності. Заповніть TODO перед публікацією.
import { CONTACT_EMAIL, TELEGRAM_URL } from "@/lib/contacts"

const OPERATOR = {
  uk: "Роман Дідошак, фізична особа (власник сайту raspark.com)",
  en: "Roman Didoshak, individual (owner of raspark.com)",
}
const RETENTION = {
  uk: "не довше 12 місяців після останнього контакту з вами, якщо ви не попросите видалити їх раніше",
  en: "for no longer than 12 months after our last contact with you, unless you ask us to delete them sooner",
}
const UPDATED = "2026-10-18"
        
export function getPrivacy(lng) {
  const uk = lng !== "en"
  const op = uk ? OPERATOR.uk : OPERATOR.en
  const ret = uk ? RETENTION.uk : RETENTION.en

  if (uk) {
    return {
      metaTitle: "Політика конфіденційності | RA Spark",
      metaDescription: "Які дані ми збираємо через форму заявки на raspark.com, навіщо і як ви можете ними керувати.",
      h1: "Політика конфіденційності",
      crumbHome: "Головна",
      crumb: "Політика конфіденційності",
      updatedLabel: "Оновлено",
      updated: UPDATED,
      sections: [
        {
          h: "1. Хто обробляє дані",
          p: [`Володілець даних: ${op}. Контакти: ${CONTACT_EMAIL}, Telegram: ${TELEGRAM_URL}.`],
        },
        {
          h: "2. Які дані ми збираємо",
          p: [
            "Через форму заявки: ім'я, контакт для зв'язку (Telegram, email або телефон), назва компанії, обраний тип ролика й текст повідомлення, якщо ви їх вказали.",
            "Автоматично: сторінка, з якої надіслано заявку, мова сайту, UTM-мітки й джерело переходу (реферер), а також технічний ідентифікатор відвідувача в пам'яті браузера для підрахунку відвідувань і поведінки на сторінках (час на секціях, перегляд відео, глибина прокрутки).",
          ],
        },
        {
          h: "3. Навіщо ми це робимо",
          p: [
            "Щоб відповісти на вашу заявку й обговорити проєкт, а також щоб розуміти, які сторінки та ролики працюють, і покращувати сайт. Ми не продаємо ваші дані й не використовуємо їх для сторонньої реклами.",
          ],
        },
        {
          h: "4. Підстава обробки",
          p: [
            "Ваша згода, яку ви надаєте, надсилаючи форму, а також наш законний інтерес у вдосконаленні сайту (знеособлена статистика).",
          ],
        },
        {
          h: "5. Кому передаються дані",
          p: [
            "Лише сервісам, без яких сайт не працює: хостинг (Vercel), обробка заявок (n8n і Telegram), пошта (Cloudflare), відео (Cloudinary). Вони обробляють дані за нашим дорученням.",
          ],
        },
        { h: "6. Строк зберігання", p: [`Дані зберігаються ${ret}.`] },
        {
          h: "7. Ваші права",
          p: [
            `Ви можете запитати, які дані ми про вас маємо, виправити або видалити їх, відкликати згоду. Напишіть на ${CONTACT_EMAIL}, і ми відповімо протягом розумного строку.`,
          ],
        },
        {
          h: "8. Cookie та сховище браузера",
          p: [
            "Для статистики ми використовуємо локальне сховище браузера (ідентифікатор відвідувача, джерело переходу в межах сесії). Реклами, що відстежує вас на інших сайтах, на сайті немає. Ви можете очистити сховище в налаштуваннях браузера.",
          ],
        },
        {
          h: "9. Зміни",
          p: ["Ми можемо оновлювати цю політику. Актуальна версія завжди на цій сторінці, дата зміни вказана вгорі."],
        },
      ],
    }
  }

  return {
    metaTitle: "Privacy Policy | RA Spark",
    metaDescription: "What data we collect via the request form on raspark.com, why, and how you can control it.",
    h1: "Privacy Policy",
    crumbHome: "Home",
    crumb: "Privacy Policy",
    updatedLabel: "Updated",
    updated: UPDATED,
    sections: [
      {
        h: "1. Who processes your data",
        p: [`Data controller: ${op}. Contact: ${CONTACT_EMAIL}, Telegram: ${TELEGRAM_URL}.`],
      },
      {
        h: "2. What we collect",
        p: [
          "Via the request form: name, contact (Telegram, email or phone), company name, selected video type and your message, if provided.",
          "Automatically: the page the request was sent from, site language, UTM tags and referrer, and a technical visitor ID stored in your browser to count visits and understand behavior on pages (time on sections, video views, scroll depth).",
        ],
      },
      {
        h: "3. Why we do it",
        p: [
          "To reply to your request and discuss the project, and to understand which pages and videos work so we can improve the site. We do not sell your data or use it for third-party advertising.",
        ],
      },
      {
        h: "4. Legal basis",
        p: [
          "Your consent, given by submitting the form, and our legitimate interest in improving the site (anonymous statistics).",
        ],
      },
      {
        h: "5. Who receives the data",
        p: [
          "Only the services the site relies on: hosting (Vercel), request handling (n8n and Telegram), email (Cloudflare), video (Cloudinary). They process data on our behalf.",
        ],
      },
      { h: "6. Retention", p: [`Data is kept ${ret}.`] },
      {
        h: "7. Your rights",
        p: [
          `You may ask what data we hold about you, correct or delete it, and withdraw consent. Write to ${CONTACT_EMAIL} and we will reply within a reasonable time.`,
        ],
      },
      {
        h: "8. Cookies and browser storage",
        p: [
          "For statistics we use browser local storage (visitor ID, referral source within the session). The site has no advertising that tracks you across other sites. You can clear storage in your browser settings.",
        ],
      },
      {
        h: "9. Changes",
        p: ["We may update this policy. The current version is always on this page, with the date above."],
      },
    ],
  }
}
