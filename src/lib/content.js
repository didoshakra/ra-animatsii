// src/lib/content.js
// Тексти нових сторінок. Тексти форматів (опис, структура, ціна) беруться з common.json.

const uk = {
  crumbs: { home: "Головна", services: "Послуги", examples: "Приклади" },
  orderCta: "Замовити такий ролик",
  priceLabel: "Орієнтовна вартість",
  priceNote: "Це орієнтир: точну вартість погодимо на консультації з урахуванням деталей проєкту.",
  moreLabel: "Докладніше",
  otherFormats: "Інші типи роликів",
  examplesOfFormat: "Приклади цього типу",
  exampleBadge: "Демо-приклад",
  demoNote:
    "Це демо-приклади, створені студією RA Spark, а не виконані замовлення клієнтів. Так може виглядати ваша реклама.",
  home: {
    forWhomHeading: "Для якого бізнесу ми робимо ролики",
    forWhomIntro:
      "Оберіть тип ролика за завданням або подивіться приклади для вашої сфери: пекарня, зоомагазин, салон краси та інші.",
    typesHeading: "Типи роликів",
    allServices: "Усі послуги",
    nichesHeading: "Приклади за сферами бізнесу",
    allExamples: "Усі приклади",
  },
  services: {
    metaTitle: "Послуги: AI-реклама й анімаційні ролики для бізнесу | RA Spark",
    metaDescription:
      "Чотири типи рекламних відео: коротка реклама, рекламний ролик, візитівка бренду й ролик-історія. 2D, 3D та анімація персонажів.",
    h1: "Послуги: рекламні ролики для бізнесу",
    intro:
      "Оберіть тип ролика за завданням: швидка реклама для соцмереж, ролик із міні-сюжетом, візитівка бренду або повноцінна історія з персонажами.",
  },
  formats: {
    short: {
      h1: "Коротка реклама для Reels, TikTok і Shorts",
      metaTitle: "Рекламний ролик для бізнесу, 8–20 секунд | RA Spark",
      metaDescription:
        "Короткі рекламні відео до 20 секунд: зачіпка, товар, вигода й заклик до дії. 2D і 3D анімація, перша розкадровка за 48 годин.",
    },
    ad: {
      h1: "Рекламний ролик для бізнесу",
      metaTitle: "Рекламний ролик для бізнесу, 20–30 секунд | RA Spark",
      metaDescription:
        "Рекламний ролик із міні-сюжетом: проблема клієнта, рішення, бренд і заклик до дії. 2D і 3D анімація, закадрова озвучка.",
    },
    brand: {
      h1: "Візитівка бренду: анімаційне відео про компанію",
      metaTitle: "Анімаційна візитівка бренду, 30–60 секунд | RA Spark",
      metaDescription:
        "Коротке яскраве відео про те, хто ви, що робите і чому вам варто довіряти: для сайту, презентацій і соцмереж.",
    },
    story: {
      h1: "Ролик-історія для бренду",
      metaTitle: "Анімаційний ролик-історія для бренду | RA Spark",
      metaDescription:
        "Реклама у вигляді маленької історії з персонажами, конфліктом і рішенням, яку хочеться додивитися до кінця.",
    },
  },
  examples: {
    metaTitle: "Приклади AI-реклами й анімаційних роликів | RA Spark",
    metaDescription:
      "Демо-ролики для пекарні, зоомагазину, салону краси, кав'ярні, меблів та інших сфер бізнесу: так може виглядати ваша реклама.",
    h1: "Приклади наших робіт",
    intro: "Демо-ролики для різних видів бізнесу: від коротких вертикальних відео до історій із персонажами.",
    byNiche: "За сферами бізнесу",
  },
  niches: {
    bakery: {
      name: "Пекарня",
      h1: "Рекламний ролик для пекарні",
      metaTitle: "Рекламний ролик для пекарні: приклади | RA Spark",
      metaDescription:
        "Демо-ролики для пекарні: короткі вертикальні відео для Reels, TikTok і Shorts. Подивіться, як може виглядати реклама вашої пекарні.",
      lead: "Реклама пекарні має передати тепло, смак і причину зайти саме до вас. Нижче демо-ролики на прикладі пекарні «Родина»: короткі вертикальні відео для соцмереж.",
    },
    "pet-store": {
      name: "Зоомагазин",
      h1: "Рекламний ролик для зоомагазину",
      metaTitle: "Рекламний ролик для зоомагазину: приклади | RA Spark",
      metaDescription:
        "Демо-ролики для зоомагазину з персонажами-тваринами: горизонтальний для сайту й YouTube та вертикальний для соцмереж.",
      lead: "Зоомагазин легко розповісти через героїв: персонажі-тварини говорять про товари й акції. Демо-ролики на прикладі зоомагазинів «Чотири лапи» (горизонтальний, для сайту й YouTube) та «Хвостики» (вертикальний, для соцмереж).",
    },
    salon: {
      name: "Салон краси",
      h1: "Рекламний ролик для салону краси",
      metaTitle: "Рекламний ролик для салону краси: приклад | RA Spark",
      metaDescription:
        "Демо-ролик для салону краси у вертикальному форматі для соцмереж: так може виглядати реклама вашого салону.",
      lead: "Салону краси важливо показати настрій і сервіс, а не лише перелік послуг. Демо-ролик на прикладі салону «Соняшник» зроблено у вертикальному форматі для соцмереж.",
    },
    grocery: {
      name: "Продуктовий магазин",
      h1: "Рекламний ролик для продуктового магазину",
      metaTitle: "Рекламний ролик для продуктового магазину: приклад | RA Spark",
      metaDescription: "Демо-ролик для продуктового магазину для соцмереж: так може виглядати реклама вашого магазину.",
      lead: "Для магазину біля дому підійдуть прості історії про свіжість, ціну й зручність. Демо-ролик на прикладі магазину «Продукти» розрахований на соцмережі.",
    },
    pool: {
      name: "Басейн",
      h1: "Рекламний ролик для басейну",
      metaTitle: "Рекламний ролик для басейну: приклад | RA Spark",
      metaDescription:
        "Демо-ролик для басейну: коротка вертикальна реклама для соцмереж. Подивіться, як може виглядати ваша реклама.",
      lead: "Басейну варто показати користь і настрій: здоров'я, відпочинок, заняття для дітей. Демо-ролик на прикладі басейну «Посейдон» — коротка вертикальна реклама.",
    },
  },
}

const en = {
  crumbs: { home: "Home", services: "Services", examples: "Examples" },
  orderCta: "Order a similar video",
  priceLabel: "Indicative price",
  priceNote: "This is a guide: we agree the exact cost during a consultation, based on your project details.",
  moreLabel: "Learn more",
  otherFormats: "Other video types",
  examplesOfFormat: "Examples of this type",
  exampleBadge: "Demo example",
  demoNote:
    "These are demo examples created by RA Spark, not completed client projects. This is how your ad could look.",
  home: {
    forWhomHeading: "Which businesses we make videos for",
    forWhomIntro:
      "Choose a video type by goal, or browse examples for your type of business: a bakery, pet shop, beauty salon and more.",
    typesHeading: "Video types",
    allServices: "All services",
    nichesHeading: "Examples by type of business",
    allExamples: "All examples",
  },
  services: {
    metaTitle: "Services: AI Video Ads and Animated Videos for Business | RA Spark",
    metaDescription:
      "Four video ad types: short ad, video ad, brand showcase and story video. 2D, 3D and character animation.",
    h1: "Services: video ads for business",
    intro:
      "Choose a video type by goal: a quick ad for social media, a video with a mini-plot, a brand showcase or a full story with characters.",
  },
  formats: {
    short: {
      h1: "Short video ads for Reels, TikTok and Shorts",
      metaTitle: "Animated Video Ad for Business, 8–20 sec | RA Spark",
      metaDescription:
        "Short video ads up to 20 seconds: a hook, the product, the benefit and a call to action. 2D and 3D animation, first storyboard within 48 hours.",
    },
    ad: {
      h1: "Video ad for your business",
      metaTitle: "Animated Video Ad for Business, 20–30 sec | RA Spark",
      metaDescription:
        "A video ad with a mini-plot: the customer's problem, the solution, your brand and a call to action. 2D and 3D animation with voiceover.",
    },
    brand: {
      h1: "Brand showcase: an animated video about your company",
      metaTitle: "Animated Brand Showcase Video, 30–60 sec | RA Spark",
      metaDescription:
        "A short, vivid video about who you are, what you do and why people can trust you: for your website, presentations and social media.",
    },
    story: {
      h1: "Story video for your brand",
      metaTitle: "Animated Story Video for Brands | RA Spark",
      metaDescription:
        "Advertising as a small story with characters, conflict and resolution that people want to watch to the end.",
    },
  },
  examples: {
    metaTitle: "Examples of AI Video Ads and Animated Videos | RA Spark",
    metaDescription:
      "Demo videos for a bakery, pet shop, beauty salon, café, furniture and other businesses: this is how your ad could look.",
    h1: "Examples of our work",
    intro: "Demo videos for different types of business: from short vertical clips to stories with characters.",
    byNiche: "By type of business",
  },
  niches: {
    bakery: {
      name: "Bakery",
      h1: "Video ad for a bakery",
      metaTitle: "Video Ad for a Bakery: Examples | RA Spark",
      metaDescription:
        "Demo videos for a bakery: short vertical clips for Reels, TikTok and Shorts. See how your bakery's ad could look.",
      lead: "A bakery ad should convey warmth, taste and a reason to visit. Below are demo videos based on the «Rodyna» bakery: short vertical clips for social media.",
    },
    "pet-store": {
      name: "Pet shop",
      h1: "Video ad for a pet shop",
      metaTitle: "Video Ad for a Pet Shop: Examples | RA Spark",
      metaDescription:
        "Demo videos for a pet shop with animal characters: a horizontal one for websites and YouTube, a vertical one for social media.",
      lead: "A pet shop is easy to present through characters: animal heroes talk about products and offers. Demo videos based on the pet shops «Four Paws» (horizontal, for websites and YouTube) and «Khvostyky» (vertical, for social media).",
    },
    salon: {
      name: "Beauty salon",
      h1: "Video ad for a beauty salon",
      metaTitle: "Video Ad for a Beauty Salon: Example | RA Spark",
      metaDescription:
        "A demo video for a beauty salon in a vertical format for social media: this is how your salon's ad could look.",
      lead: "A beauty salon should show mood and service, not just a list of treatments. The demo video based on the «Sunflower» salon is made in a vertical format for social media.",
    },
    grocery: {
      name: "Grocery store",
      h1: "Video ad for a grocery store",
      metaTitle: "Video Ad for a Grocery Store: Example | RA Spark",
      metaDescription:
        "A demo video for a grocery store, made for social media: this is how your store's ad could look.",
      lead: "For a neighbourhood store, simple stories about freshness, price and convenience fit well. The demo video based on the «Products» store is made for social media.",
    },
    pool: {
      name: "Swimming pool",
      h1: "Video ad for a swimming pool",
      metaTitle: "Video Ad for a Swimming Pool: Example | RA Spark",
      metaDescription:
        "A demo video for a swimming pool: a short vertical ad for social media. See how your ad could look.",
      lead: "A pool should show benefit and mood: health, relaxation, classes for children. The demo video based on the «Poseidon» pool is a short vertical ad.",
    },
  },
}

export function getContent(lng) {
  return lng === "en" ? en : uk
}
