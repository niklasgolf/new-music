---

You can now use: (radix UI)
🔲 <Checkbox />
🔘 <RadioGroup />
🎚️ <Switch />
💬 <Popover />
🧭 <Tabs />
📦 <Dialog />
🔽 <DropdownMenu />
💡 <Tooltip />
And shared icons via @radix-ui/react-icons

---

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Allow only authenticated users to read from 'users' collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if false;
    }
  }
}

---

npm install firebase

---

npx create-next-app@latest .

- ✔ Would you like to use TypeScript? … No / Yes
- ✔ Would you like to use ESLint? … No / Yes
- ✔ Would you like to use Tailwind CSS? … No / Yes
- ✔ Would you like your code inside a `src/` directory? … No / Yes
- ✔ Would you like to use App Router? (recommended) … No / Yes
- ✔ Would you like to use Turbopack for `next dev`? … No / Yes
- ✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
- Creating a new Next.js app in /Users/niklasherrloff/Documents/sommarlov2025/new-music.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
