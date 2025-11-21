# LinkShrink

<div align="center">

**Shrink your long URLs into tiny, shareable links.**

A modern URL shortener built with Next.js and Firebase.

[![Next.js](https://img.shields.io/badge/Next.js-—-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-—-orange?style=flat&logo=firebase)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-—-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-—-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 🌟 Overview

LinkShrink is a modern URL shortening service that transforms long, unwieldy URLs into compact, shareable links. Built with cutting-edge web technologies, it provides a seamless user experience with automatic link expiration, duplicate detection, and a beautiful, responsive interface.

### Why LinkShrink?

- **Fast & Reliable**: Built on Next.js with Turbopack for lightning-fast performance
- **Smart Duplicate Detection**: Automatically detects if a URL has already been shortened
- **Auto-Expiration**: Links expire after 30 days to keep your database clean
- **Beautiful UI**: Modern design with smooth animations and responsive layout

---

## ✨ Features

### Core Functionality

- **URL Submission**: Accept long URLs through an intuitive web form
- **Short URL Generation**: Generate unique 6-character short codes using base62 encoding
- **URL Redirection**: Seamless 302 redirects from short URLs to original destinations
- **Duplicate Prevention**: Check if a URL has already been shortened and return existing short code
- **Automatic Expiration**: All links expire after 30 days (configurable)
- **Counter Management**: Global counter system ensures unique short codes
- **Error Handling**: User-friendly error messages for failed operations and expired links

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js](https://nextjs.org/)** - React framework with the App Router
- **React** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Backend & Database
- **[Firebase](https://firebase.google.com/)** - Backend as a Service
  - Firestore - NoSQL database
  - Hosting - Static & serverless hosting

---

## 📦 Installation

### Prerequisites

- **Node.js** 20.x or higher
- **npm** or **yarn** package manager
- **Firebase account** with a project created

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/LinkShrink.git
cd LinkShrink
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Firebase

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Create a web app in your Firebase project
4. Copy your Firebase configuration

### Step 4: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Step 5: Initialize Firestore

The application will automatically create the necessary collections on first use. Alternatively, you can manually create:

1. Collection: `urls`
2. Collection: `counters`
   - Document: `global_url_counter`
   - Field: `value` (number) = 0

### Step 6: Run Development Server

```bash
npm run dev
```
---

## 🚀 Usage

### Creating a Short URL

1. Navigate to the home page
2. Enter a long URL in the input field
3. Click "Shrink It!" button
4. Copy the generated short URL or scan the QR code

### Accessing a Short URL

Navigate to: `{domain}/[shortCode]`

The application will:
- Look up the short code in Firestore
- Check if the link has expired
- Redirect to the original URL (302 redirect) if valid
- Show an error page if expired or invalid

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Hosted on [Firebase](https://firebase.google.com/)

---

## 📞 Support

For issues, questions, or suggestions:

- Open an issue on [GitHub Issues](https://github.com/yourusername/LinkShrink/issues)

---

<div align="center">

**Made with ❤️ by Janvi**

</div>
