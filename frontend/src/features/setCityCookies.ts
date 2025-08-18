export async function setCityCookies(value: string) {
  await fetch('/api/set-city', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ city: value }),
  })
}