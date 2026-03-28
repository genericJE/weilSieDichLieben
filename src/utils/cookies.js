const ONE_YEAR_MS = 31536000000;

export function getCookie(name) {
  const re = new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*=\\s*([^;]*).*$)|^.*$`);
  return document.cookie.replace(re, "$1") || "";
}

export function setCookie(name, value) {
  const expires = new Date(Date.now() + ONE_YEAR_MS).toUTCString();
  document.cookie = `${name}=${JSON.stringify(value)};path=/;expires=${expires}`;
}

export function deleteCookie(name) {
  document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function getCookieJSON(name, fallback) {
  const raw = getCookie(name);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
