import { listCities } from '@/lib/locations';

// GET /api/locations/cities?country=IN → { cities: ['Abhaneri', …] }
export function GET(request) {
  const code = new URL(request.url).searchParams.get('country') || '';
  if (!/^[A-Za-z]{2}$/.test(code)) return Response.json({ error: 'Choose a country.' }, { status: 400 });
  // The lists never change between deploys, so browsers can keep them.
  return Response.json({ cities: listCities(code) }, { headers: { 'Cache-Control': 'public, max-age=86400' } });
}
