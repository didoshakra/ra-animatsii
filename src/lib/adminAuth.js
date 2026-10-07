import crypto from 'crypto';

// Токен = sha256 від ADMIN_KEY. Сам ключ у cookie не зберігається.
export function adminToken() {
  const key = process.env.ADMIN_KEY;
  if (!key) return null;
  return crypto.createHash('sha256').update('admin:' + key).digest('hex');
}

export function tokenFromKey(key) {
  return crypto.createHash('sha256').update('admin:' + String(key)).digest('hex');
}

function getCookie(req, name) {
  const header = req.headers.get('cookie') ?? '';
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return v.join('=');
  }
  return null;
}

function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  if (x.length !== y.length) return false;
  return crypto.timingSafeEqual(x, y);
}

// true, якщо в запиті є правильний cookie адміна
export function isAdmin(req) {
  const expected = adminToken();
  if (!expected) return false;
  const got = getCookie(req, 'admin_token');
  if (!got) return false;
  return safeEqual(got, expected);
}

// true, якщо введений ключ збігається з ADMIN_KEY
export function keyMatches(key) {
  const expected = adminToken();
  if (!expected || !key) return false;
  return safeEqual(tokenFromKey(key), expected);
}
