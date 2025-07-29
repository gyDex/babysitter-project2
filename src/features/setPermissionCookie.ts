export async function setPermissionCookie(name: string, value: string) {
  await fetch('/api/set-per-cookies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ permissionCookie: value }),
  })
}