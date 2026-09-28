function mapUser(raw) {
  if (!raw) return null
  return {
    id: raw.id,
    login: raw.login || '',
    email: raw.email || '',
    snils: raw.snils || '',
    firstName: raw.first_name || raw.firstName || '',
    lastName: raw.last_name || raw.lastName || '',
    patronymic: raw.middle_name || raw.patronymic || '',
    group: raw.group_name || raw.group || '',
    specialty: raw.specialty || '',
  }
}

async function request(path, options = {}) {
  const response = await fetch(`/api/auth${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const payload = await response.json().catch(() => ({}))

  if (payload?.error) {
    throw new Error(payload.error)
  }

  if (!response.ok) {
    throw new Error('Ошибка запроса')
  }

  return payload?.data ?? null
}

export async function loginRequest(login, password) {
  const data = await request('/login', {
    method: 'POST',
    body: JSON.stringify({ login, password }),
  })
  return mapUser(data)
}

export async function registerRequest({ snils, login, password, email }) {
  const data = await request('/register', {
    method: 'POST',
    body: JSON.stringify({ snils, login, password, email }),
  })
  return mapUser(data?.user || data)
}

export async function fetchCurrentUser() {
  const data = await request('/me')
  return mapUser(data)
}

export async function logoutRequest() {
  await request('/logout', { method: 'POST' })
}
