import { keyMatches, adminToken } from '../../../lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  let key = '';
  try {
    const body = await req.json();
    key = String(body?.key ?? '');
  } catch {
    return new Response(null, { status: 400 });
  }

  if (!keyMatches(key)) {
    // невелика затримка проти підбору ключа
    await new Promise((r) => setTimeout(r, 700));
    return new Response(null, { status: 401 });
  }

  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  const maxAge = 60 * 60 * 24 * 365; // 1 рік

  const headers = new Headers();
  // Головна cookie: недоступна для JavaScript
  headers.append(
    'Set-Cookie',
    `admin_token=${adminToken()}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Lax${secure}`
  );
  // Позначка тільки для інтерфейсу (показати кнопку), доступу не дає
  headers.append('Set-Cookie', `admin_ui=1; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`);

  return new Response(null, { status: 204, headers });
}
