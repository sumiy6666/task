// Countries and their cities for the Join form, from the country-state-city
// data. Import it from server code only: the city lists are large, so the
// form asks for one country's cities at a time (/api/locations/cities).
import { City, Country } from 'country-state-city';
import * as flags from 'country-flag-icons/string/3x2';

export const listCountries = () =>
  Country.getAllCountries().map((c) => ({ value: c.name, label: c.name, code: c.isoCode, phone: c.phonecode }));

export const isCountry = (name) => Country.getAllCountries().some((c) => c.name === name);

// A country's city names, A–Z, each once (the data repeats a name once per
// state that has a town called that).
export function listCities(code) {
  const names = new Set((City.getCitiesOfCountry(String(code).toUpperCase()) || []).map((c) => c.name));
  return [...names].sort((a, b) => a.localeCompare(b));
}

// Names people write that the data spells differently.
const ALIASES = {
  usa: 'US', 'u.s.': 'US', 'u.s.a.': 'US', 'united states of america': 'US', america: 'US',
  uk: 'GB', 'u.k.': 'GB', 'great britain': 'GB', britain: 'GB', england: 'GB', scotland: 'GB', wales: 'GB',
  uae: 'AE', 'u.a.e.': 'AE', emirates: 'AE', dubai: 'AE', 'abu dhabi': 'AE',
  'hong kong sar': 'HK', 'south korea': 'KR', korea: 'KR', russia: 'RU', vietnam: 'VN', 'czech republic': 'CZ',
};

// The country in a free-text location ("Mumbai, India", "London, UK"),
// as { code, name }, or null. The country is usually the last part.
export function countryOf(location = '') {
  const parts = String(location).split(',').map((s) => s.trim().toLowerCase()).filter(Boolean).reverse();
  for (const part of parts) {
    const code = ALIASES[part] || Country.getAllCountries().find((c) => c.name.toLowerCase() === part)?.isoCode;
    if (code) return { code, name: Country.getCountryByCode(code)?.name || part };
  }
  return null;
}

// A country's flag as an image URL (an inline SVG, so it shows on Windows,
// which has no flag emoji), or null.
export function flagUrl(code) {
  const svg = flags[String(code).toUpperCase()];
  return typeof svg === 'string' ? `data:image/svg+xml,${encodeURIComponent(svg)}` : null;
}
