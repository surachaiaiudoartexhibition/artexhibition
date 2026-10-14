// Shared input hardening for Pages Functions (not a route: no onRequest exports).
//
// Pages render artwork/artist fields with innerHTML and inside inline onclick="...('${x}')"
// handlers, so any text that reaches the database must not be able to open a tag, close an
// attribute or a JS string. Characters that could do that are swapped for look-alike
// typographic characters, so normal Thai/English text still reads the same.

const URL_FIELD = /(^|_)url$|^url$/i;
const SKIP_FIELD = /key|token|password|secret|^old_/i;  // old_* fields are lookup keys

const MAX_TEXT = 20000;              // longest existing bio is ~11.5k chars
const MAX_URL = 2048;
const MAX_DATA_URL = 3 * 1024 * 1024; // avatar uploads stored as data URLs
const MAX_ITEMS = 1000;

export class InputError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export function cleanText(value) {
  return String(value)
    // drop control characters except tab/newline/carriage return
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    // neutralise HTML entities that would decode into quotes inside attributes
    .replace(/&(?=#|[a-zA-Z][a-zA-Z0-9]*;)/g, '&amp;')
    .replace(/</g, '‹')   // ‹
    .replace(/>/g, '›')   // ›
    .replace(/"/g, '”')   // ”
    .replace(/'/g, '’')   // ’
    .replace(/`/g, 'ˋ');  // ˋ
}

export function checkUrl(value, field) {
  const v = String(value).trim();
  if (v === '' || v === '-') return v;
  if (/^https?:\/\/[^\s"'<>`\\]+$/i.test(v)) {
    if (v.length > MAX_URL) throw new InputError(`${field} is too long`);
    return v;
  }
  if (/^\/[A-Za-z0-9._~\/%-]+$/.test(v) && !v.startsWith('//')) {
    if (v.length > MAX_URL) throw new InputError(`${field} is too long`);
    return v;
  }
  if (/^data:image\/(png|jpe?g|webp|gif|avif);base64,[A-Za-z0-9+/=]+$/i.test(v)) {
    if (v.length > MAX_DATA_URL) throw new InputError(`${field} image is too large`);
    return v;
  }
  throw new InputError(`${field} must be an http(s) image URL`);
}

function cleanValue(value, field, depth) {
  if (depth > 6) throw new InputError('Input is nested too deeply');
  if (typeof value === 'string') {
    if (SKIP_FIELD.test(field)) return value;
    if (URL_FIELD.test(field)) return checkUrl(value, field);
    if (value.length > MAX_TEXT) throw new InputError(`${field} is too long`);
    return cleanText(value);
  }
  if (Array.isArray(value)) {
    if (value.length > MAX_ITEMS) throw new InputError(`${field} has too many items`);
    return value.map((v) => cleanValue(v, field, depth + 1));
  }
  if (value && typeof value === 'object') {
    for (const k of Object.keys(value)) {
      value[k] = cleanValue(value[k], k, depth + 1);
    }
    return value;
  }
  return value;
}

// Cleans every string field of a parsed JSON body in place. Throws InputError (status 400).
export function sanitizeInput(body) {
  if (!body || typeof body !== 'object') return body;
  return cleanValue(body, 'body', 0);
}

export function badInput(err) {
  const status = err && err.status === 400 ? 400 : 500;
  return new Response(JSON.stringify({ success: false, error: err && err.message ? err.message : 'Invalid input' }), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

// True when the request carries the curator admin key.
export function isAdminRequest(request, env) {
  const key = request.headers.get('x-admin-key');
  return Boolean(env.ADMIN_KEY && key && key === env.ADMIN_KEY);
}
