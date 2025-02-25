# 🌐 Lingo - Language Learning Platform

A modern web application for language learning, built with cutting-edge technologies including React 19 and Next.js 15.

[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)

## ✨ Features

- 🎯 Interactive language learning exercises
- 🎨 Modern, responsive UI design
- 🔐 Secure authentication with Clerk
- ⚡ Optimized performance with Next.js
- 📱 Mobile-first approach

## 🚀 Tech Stack

- **Framework:** Next.js 15 with App Router and Server Actions
- **Frontend:** React 19, TypeScript
- **Authentication:** Clerk
- **Styling:** Tailwind CSS, shadcn/ui components
- **Database:** Neon (Serverless Postgres)
- **ORM:** Drizzle ORM
- **Validation:** Zod
- **Package Manager:** pnpm
- **Deployment:** Vercel

## 🛠️ Installation

1. Clone the repository

```bash
git clone https://github.com/frshaad/lingo.git
cd lingo
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Add the following required environment variables to your `.env` file:

```bash
NEXT_PUBLIC_APP_URL='http://localhost:3000' # https://lingo-kohl-gamma.vercel.app/

# Clerk Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=   # Your Clerk public key
CLERK_SECRET_KEY=                    # Your Clerk secret key

# Clerk Authentication URLs (Required)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=              # Default: "/"
NEXT_PUBLIC_CLERK_SIGN_UP_URL=              # Default: "/"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=  # Default: "/learn"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=  # Default: "/learn"
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=       # Default: "/"

# Database (Required)
DATABASE_URL=                        # Your PostgreSQL connection string from Neon.tech
```

> **Important**: Always use the validated `env` object from `@/lib/env.ts` instead of accessing `process.env` directly. This ensures type safety and runtime validation of environment variables.

```typescript
// ❌ Don't use process.env directly
const dbUrl = process.env.DATABASE_URL

// ✅ Do use the validated env object
import env from '@/lib/env'
const dbUrl = env.DATABASE_URL
```

4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Project Structure

```
src/
├── app/
├── components/
│   └── ui/          # shadcn/ui components
├── lib/
│   └── db/         # Drizzle schema and config
```

## 🖼️ Screenshots

| ![Landing Page](/public/screenshots/lingo-shot-1.webp)        | ![Courses Page](/public/screenshots/lingo-shot-2.webp)         |
| ------------------------------------------------------------- | -------------------------------------------------------------- |
| ![Learn Page](/public/screenshots/lingo-shot-3.webp)          | ![Quests Page](/public/screenshots/lingo-shot-8.webp)          |
| ![Lesson Page - Wrong](/public/screenshots/lingo-shot-5.webp) | ![Lesson Page- Correct](/public/screenshots/lingo-shot-6.webp) |
| ![Finish Page](/public/screenshots/lingo-shot-7.webp)         | ![Shop Page](/public/screenshots/lingo-shot-9.webp)            |

## 👨‍💻 About Me

I'm a junior developer passionate about creating user-friendly web applications. This project showcases my abilities with modern web technologies and my commitment to writing clean, maintainable code.

## 📫 Contact

- [LinkedIn](https://www.linkedin.com/in/farshad-hatami/)
- [Email](mailto:farshad.hatami95@gmail.com)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Farshad
