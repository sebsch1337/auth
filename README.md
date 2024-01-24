<!-- @format -->

<p align="center"><img width="150" alt="image" src="./public/logo.svg"></p>

<h3 align="center">Auth</h3>
<p align="center">A Reusable Authentication Codebase For Your Next(.js) Project</p>
<p align="center"><a href="https://auth-1337.vercel.app/">https://auth-1337.vercel.app/</a></p>

## Overview

A reusable Auth.JS 5.0.0 beta (former NextAuth) codebase with examples to implement in your Next.JS project.

## Credits
This project is based on [Antonio Erdeljac's next auth v5 guide](https://github.com/AntonioErdeljac/next-auth-v5-advanced-guide). On top of this i fixed some bugs and added the email verification when email has been changed.

## Features

- Login via credentials and OAuth
- Email verification (for email and password change)
- Two factor authentication via email code
- Roles
- Examples using server actions and api calls
- Change user data and password

## Used Tech Stack

- Next.JS 14
- Auth.JS 5.0.0 beta 4
- TypeScript for typesafe developing
- TailwindCSS for styling
- Shadcn as component base
- Prisma as ORM
- MongoDB as database

## Getting Started

### Installation

`npm install`

### Create .env File

```
DATABASE_URL=

AUTH_SECRET=

GITHUB_CLIENT_ID==
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=
```

### Setup Prisma

```
npx prisma generate
npx prisma db push
```

### Run Dev Environment

`npm run dev`

<a href="http://localhost:3000">http://localhost:3000</a>

## About

I'm looking forward to start exciting projects with you as a 100% remote developer.

You can find more informations about me and my tech stack on my GitHub page.
