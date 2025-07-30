export async function setCityCookies(name: string, value: string) {
  await fetch('/api/set-city', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role: value }),
  })
}