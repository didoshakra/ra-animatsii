import { neon } from '@neondatabase/serverless';
import { isAdmin } from '../../../lib/adminAuth';

const sql = neon(process.env.DATABASE_URL);

export const dynamic = 'force-dynamic';

export async function GET(req) {
  if (!isAdmin(req)) return new Response(null, { status: 404 });

  try {
    const rows = await sql`
      SELECT
        count(*)::int AS total,
        count(DISTINCT visitor_id)::int AS visitors,
        (count(*) FILTER (WHERE (created_at AT TIME ZONE 'Europe/Kyiv')::date = (now() AT TIME ZONE 'Europe/Kyiv')::date))::int AS today,
        (count(*) FILTER (WHERE created_at >= now() - interval '7 days'))::int AS week
      FROM page_views
    `;
    return Response.json(rows[0], { headers: { 'Cache-Control': 'private, max-age=300' } });
  } catch (e) {
    console.error('views error', e);
    return new Response(null, { status: 500 });
  }
}
