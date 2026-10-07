'use client';

import { useEffect, useState } from 'react';

// /exclude-me           -> вимикає облік твоїх візитів у цьому браузері
// /exclude-me?key=КЛЮЧ  -> те саме + відкриває доступ до адмінки
// Бажано перейменуй папку на щось неочевидне.
export default function ExcludeMe() {
  const [status, setStatus] = useState('working');

  useEffect(() => {
    document.cookie = 'no_track=1; max-age=315360000; path=/; SameSite=Lax';

    const key = new URLSearchParams(window.location.search).get('key');
    if (!key) {
      setStatus('excluded');
      return;
    }

    fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    })
      .then((r) => setStatus(r.ok ? 'admin' : 'wrong'))
      .catch(() => setStatus('error'))
      .finally(() => {
        // прибираємо ключ з адресного рядка
        window.history.replaceState(null, '', window.location.pathname);
      });
  }, []);

  const messages = {
    working: 'Зачекай…',
    excluded: 'Готово: твої візити більше не рахуються в цьому браузері.',
    admin: 'Готово: візити не рахуються, адмінка відкрита.',
    wrong: 'Візити не рахуються, але ключ невірний: адмінка не відкрита.',
    error: 'Візити не рахуються, але під час входу в адмінку сталась помилка.',
  };

  return <p style={{ padding: 24 }}>{messages[status]}</p>;
}
