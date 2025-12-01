# Ocean Notes (Nuxt 3)

A modern notes frontend built with Nuxt 3, styled with the "Ocean Professional" theme, integrated with a FastAPI backend on port 3001.

## Environment

Configure the API base URL to the backend:

Create a `.env` file in the project root:
```
NUXT_PUBLIC_API_BASE=http://localhost:3001
```

If not provided, it defaults to `http://localhost:3001`.

## Development

Install dependencies and start the dev server:
```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Features

- JWT-based auth (login/register)
- Notes CRUD (list, view/edit, create, delete)
- Route guards redirect unauthenticated users to login
- Minimal API client using `$fetch` with CORS-safe headers
- Ocean Professional theme (blue primary, amber accents, gradients)

## Structure

- `composables/useApi.ts` API client and CRUD helpers
- `composables/useAuth.ts` Auth state and JWT storage
- `middleware/auth.global.ts` Route guards
- `pages/auth/login.vue` and `pages/auth/register.vue`
- `pages/index.vue` List notes
- `pages/notes/create.vue` Create note
- `pages/notes/[id].vue` View/Edit/Delete note
