export async function setRoleCookies(name: string, value: string) {
  await fetch('/api/set-role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role: value }),
  })
}

