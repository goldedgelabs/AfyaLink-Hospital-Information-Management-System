export async function apiFetch(path, opts = {}) {
  const res = await fetch(path, opts);
  if (!res.ok) throw new Error('API error');
  return res.json();
}
