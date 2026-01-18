# Portfolio 


A modern, performant personal portfolio website built with Next.js 16, TypeScript, and MDX. Featuring a clean design, dark mode support, and an integrated blog system.

🌐 **Live Site:** [https://Piyushh.me](https://Piyushh.me)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean and responsive design with smooth animations
- 🌓 **Dark Mode** - Seamless theme switching with next-themes
- 📝 **MDX Blog** - Write blog posts with MDX support and syntax highlighting
- ⚡ **Performance Optimized** - Built with Next.js 16 App Router for optimal performance
- 📊 **Analytics** - Integrated Vercel Analytics and Speed Insights
- 📧 **Contact Form** - Functional contact form with email integration
- 🎭 **Animations** - Smooth animations powered by Framer Motion
- 📱 **Fully Responsive** - Mobile-first design approach
- 🔍 **SEO Optimized** - Meta tags and structured data for better discoverability

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Content:** [MDX](https://mdxjs.com/) & [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** Lucide React, React Icons, HugeIcons
- **Syntax Highlighting:** [Shiki](https://shiki.style/) & [rehype-pretty-code](https://rehype-pretty-code.netlify.app/)
- **Email:** [Nodemailer](https://nodemailer.com/)
- **Analytics:** Vercel Analytics & Speed Insights
- **Package Manager:** Bun / npm

## 📁 Project Structure

```
portfolio-v2/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── projects/          # Projects showcase
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── blogs/                 # MDX blog posts
├── components/            # React components
├── data/                  # Static data files
├── hooks/                 # Custom React hooks
├── icons/                 # Icon components
├── lib/                   # Utility libraries
├── public/                # Static assets
└── util/                  # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ or Bun
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Piyushrathoree/Portfolio-v2.git
cd Portfolio-v2
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Writing Blog Posts

Blog posts are written in MDX format and stored in the `blogs/` directory.

### Creating a New Post

1. Create a new `.mdx` file in the `blogs/` directory
2. Add frontmatter at the top of the file:

```mdx
---
title: "Your Post Title"
date: "YYYY-MM-DD"
description: "Brief description of your post"
tags: ["tag1", "tag2"]
---

Your content here...
```

3. The blog post will automatically appear on your blog page

## 🎨 Customization

### Updating Social Links

Edit `data/Social-item.ts` to update your social media links.

### Modifying Theme

Customize colors and theme settings in:
- `app/globals.css` - Global styles and CSS variables
- `tailwind.config.ts` - Tailwind configuration

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Key Dependencies

| Package | Purpose |
|---------|---------|
| Next.js 16 | React framework |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Framer Motion | Animations |
| MDX | Blog content |
| shadcn/ui | Accessible components |
| Shiki | Code syntax highlighting |

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Piyushrathoree/Portfolio-v2/issues).

## 📬 Contact

Feel free to reach out through the contact form on the website or connect via social media.
[connect to me](https://x.com/__Piyushrathore).
---

⭐ If you like this project, please consider giving it a star on GitHub!

Made with ❤️ by [Piyush Rathore](https://github.com/Piyushrathoree)
