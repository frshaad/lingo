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
# Add your Clerk credentials to .env:
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
# CLERK_SECRET_KEY=
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

[Coming soon]

## 🎯 Future Improvements

- [x] Add user authentication
- [x] Implement progress tracking
- [ ] Add more language options
- [ ] Integrate with a backend API
- [ ] Add social features

## 👨‍💻 About Me

I'm a junior developer passionate about creating user-friendly web applications. This project showcases my abilities with modern web technologies and my commitment to writing clean, maintainable code.

## 📫 Contact

- [LinkedIn](https://www.linkedin.com/in/farshad-hatami/)
- [Email](mailto:farshad.hatami95@gmail.com)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Farshad
