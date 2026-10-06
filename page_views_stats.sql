-- ============================================================
-- Статистика переглядів (база raspark, таблиця page_views)
-- У pgAdmin виділи ПОТРІБНИЙ запит і натисни F5,
-- інакше виконаються всі запити підряд.
-- ============================================================


-- 1. Сьогодні і за 7 днів (швидка зведена)
SELECT
  count(*) FILTER (WHERE created_at >= date_trunc('day', now()))      AS views_today,
  count(DISTINCT visitor_id) FILTER (WHERE created_at >= date_trunc('day', now())) AS visitors_today,
  count(*) FILTER (WHERE created_at >= now() - interval '7 days')     AS views_7d,
  count(DISTINCT visitor_id) FILTER (WHERE created_at >= now() - interval '7 days') AS visitors_7d
FROM page_views;


-- 2. Перегляди й унікальні відвідувачі по днях
SELECT date_trunc('day', created_at)::date AS day,
       count(*)                            AS views,
       count(DISTINCT visitor_id)          AS visitors
FROM page_views
GROUP BY 1
ORDER BY 1 DESC;


-- 3. Топ сторінок за 30 днів (/uk/... і /en/... об'єднано)
SELECT regexp_replace(path, '^/(uk|en)(/|$)', '/') AS page,
       count(*)                                    AS views
FROM page_views
WHERE created_at > now() - interval '30 days'
GROUP BY 1
ORDER BY 2 DESC
LIMIT 20;


-- 4. Розподіл за мовами сайту
SELECT split_part(path, '/', 2) AS lang,
       count(*)                 AS views
FROM page_views
WHERE created_at > now() - interval '30 days'
GROUP BY 1
ORDER BY 2 DESC;


-- 5. Звідки приходять (referrer) за 30 днів
SELECT coalesce(nullif(substring(referrer from '^https?://([^/]+)'), ''), '(напряму)') AS source,
       count(*) AS views
FROM page_views
WHERE created_at > now() - interval '30 days'
GROUP BY 1
ORDER BY 2 DESC
LIMIT 20;


-- 6. Країни за 30 днів
SELECT coalesce(country, '(невідомо)') AS country,
       count(*)                        AS views,
       count(DISTINCT visitor_id)      AS visitors
FROM page_views
WHERE created_at > now() - interval '30 days'
GROUP BY 1
ORDER BY 2 DESC;


-- 7. Останні 20 переглядів (перевірка, що лічильник працює)
SELECT created_at, path, referrer, country
FROM page_views
ORDER BY created_at DESC
LIMIT 20;


-- 8. Скільки всього рядків у таблиці
SELECT count(*) AS total_rows FROM page_views;


-- ============================================================
-- НЕБЕЗПЕЧНО: очищення. Розкоментуй рядок лише коли треба.
-- ============================================================
-- DELETE FROM page_views;                                  -- видалити ВСЕ
-- DELETE FROM page_views WHERE created_at < now() - interval '1 year';  -- старші за рік
