## Paperplanes

A modern, minimalist blogging platform built with React, TypeScript, and Vite. Paperplanes focuses on a delightful writing and reading experience with a clean UI, rich-text editing powered by Tiptap, authentication, and social features like following and saving posts.

### Features
- **Authentication**: Google OAuth via `@react-oauth/google`, session management, and protected routes
- **Rich editor**: Tiptap-based editor with images, lists, code blocks, and formatting
- **Social**: Follow users, view following feed, save posts
- **Search and discovery**: Featured and topic pages
- **Performance**: React Query for data fetching and caching, lazy routes
- **Design system**: Tailwind CSS v4 with custom theme tokens and animations
- **Data**: Supabase as backend (Auth/DB/Storage)

### Mobile behavior
On small screens, Paperplanes currently shows a friendly, branded message asking users to access the app on laptop/desktop while a mobile experience is being prepared. This is implemented via `src/components/MobileNotice.tsx` and can be customized or disabled as needed.

---

## Tech stack
- **Frontend**: React 19, TypeScript, Vite
- **State/Data**: Jotai, @tanstack/react-query
- **Editor**: Tiptap (extensions and custom nodes)
- **Auth**: Google OAuth, Supabase
- **Styling**: Tailwind CSS v4, CSS variables, SCSS in editor components

## Getting started

### Prerequisites
- Node.js 18+ and npm
- Supabase project (URL and anon key)
- Google OAuth Client ID (Web)

### Environment variables
Create a `.env` file in the project root with:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
```

### Install and run
```bash
npm install
npm run dev
```

App starts on `http://localhost:5173` by default.

### Scripts
- `npm run dev`: Start Vite dev server
- `npm run build`: Type-check and build for production
- `npm run preview`: Preview the production build
- `npm run lint`: Lint the project

## Project structure
- `src/pages`: Route components (Home, Blog, Write, Profile, Topics, Signin)
- `src/components`: Shared UI (Navbar, Cards, MobileNotice, etc.)
- `TiptapEditor`: Editor UI, extensions, and styles
- `src/hooks`: Data and UI hooks (blogs, follow, user hydration)
- `supabaseClient.ts`: Supabase client initialization

## Deployment
This project includes a `vercel.json`. You can deploy with Vercel or any static host that supports Vite builds.

Build output is generated in `dist/`:
```bash
npm run build
```

## Customization
- Update theme tokens and base styles in `src/index.css`
- Replace assets in `src/assets/`
- Adjust editor behavior in `TiptapEditor/`

## License
MIT — feel free to use and modify. If you build something cool with Paperplanes, let us know!
