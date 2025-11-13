export async function askNeuroEdge(prompt) {
  const res = await fetch('/api/neuroedge', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });

  return res.json();
}
