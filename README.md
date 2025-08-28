# ✅ Todos App

A modern, full-stack **Todo application** built with **Next.js 15 (App Router)**, **TypeScript**, **Prisma ORM**, **MongoDB**, and **TanStack Query**. Features Google authentication, real-time updates, and a beautiful UI.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Ftodos-app&env=DATABASE_URL,NEXTAUTH_SECRET,NEXTAUTH_URL&envDescription=Required%20environment%20variables&envLink=https%3A%2F%2Fgithub.com%2Fyour-username%2Ftodos-app%23environment-variables)

## 🌐 Live Demo

**[📱 Try the app →](https://todos-app-lzs2.vercel.app/)**

---

## 📸 Screenshots


### Authentication
![Login Screen](./public/auth.png)
*Secure authentication with NextAuth.js*

### Mobile Responsive
![Mobile View](./public/mobile.png)
*Fully responsive design works on all devices*

---

## 🚀 Features

- 🔐 **Google Authentication** with NextAuth.js
- 📋 **Full CRUD Operations** - Create, Read, Update, Delete todos
- ✅ **Toggle Completion** - Mark todos as completed or pending
- ⚡ **Optimistic UI Updates** - Instant feedback with TanStack Query
- 🎨 **Modern UI/UX** - Beautiful interface with Tailwind CSS + ShadCN UI
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🛠️ **Type-Safe Database** - Prisma ORM with MongoDB
- 🔔 **Toast Notifications** - User feedback for all actions
- 🔄 **Real-time Sync** - Data stays consistent across sessions
- 🎯 **Error Handling** - Graceful error states and recovery
- 🚀 **Optimized Performance** - Fast loading with Next.js optimization

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Icons**: Lucide React
- **State Management**: TanStack Query (React Query)
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Next.js API Routes
- **Database**: MongoDB
- **ORM**: Prisma
- **Authentication**: NextAuth.js (Google OAuth)

### Deployment
- **Platform**: Vercel
- **Database Hosting**: MongoDB Atlas

---

## 📦 Quick Start

### 1. Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Ftodos-app&env=DATABASE_URL,NEXTAUTH_SECRET,NEXTAUTH_URL&envDescription=Required%20environment%20variables&envLink=https%3A%2F%2Fgithub.com%2Fyour-username%2Ftodos-app%23environment-variables)

1. Click the "Deploy" button above
2. Connect your GitHub account
3. Set up environment variables (see below)
4. Deploy and enjoy your todo app!

### 2. Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mobeenkhxn01/todos-app.git
   cd todos-app
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster0.mongodb.net/todos_db?retryWrites=true&w=majority"
   
   # NextAuth
   NEXTAUTH_SECRET="your-super-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   bunx prisma generate
   
   # Push schema to MongoDB (no migrations needed)
   bunx prisma db push
   
   # Optional: Seed the database
   bunx prisma db seed
   ```

5. **Start the development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🌍 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `DATABASE_URL` | MongoDB connection string | ✅ | `mongodb+srv://user:pass@cluster0.mongodb.net/todos_db` |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | ✅ | `your-random-secret-key` |
| `NEXTAUTH_URL` | Your app's URL | ✅ | `http://localhost:3000` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | ✅ | `123456789.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | ✅ | `GOCSPX-abc123def456` |

---

## 🔨 Build & Deploy

### Production Build
```bash
# Install dependencies
bun install

# Generate Prisma client
bunx prisma generate

# Build the application
bun run build

# Start production server
bun run start
```

### Database Schema Sync (Production)
```bash
# Push schema changes to production MongoDB
bunx prisma db push
```

---

## 📂 Project Structure

```
todos-app/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 api/               # API routes
│   ├── 📁 login/            # Login pages
│   ├── 📁 register/          # Register pages
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── 📁 components/            # React components
│   ├── 📁 ui/               # ShadCN UI components
│   ├── 📁 lib/              # Library components
│   ├── 📁 todos/            # Todo-specific components
│   └── 📁 layout/           # Layout components
├── 📁 hooks/                 # Custom React hooks
│   ├── use-todos.ts         # Todo data fetching
├── 📁 lib/                   # Utilities & configuration
│   ├── prisma.ts            # Prisma client
│   ├── auth.ts              # NextAuth configuration
│   ├── utils.ts             # Helper functions
│   └── password.ts          # salted passwords
├── 📁 prisma/               # Database schema
│   ├── schema.prisma        # Prisma schema
├── 📁 public/               # Static assets
│   └── 📁 screenshots/      # App screenshots
├── 📁 styles/               # Global styles
├── .env                     # Environment variables
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies & scripts
```

---

## 🚀 Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start development server |
| `build` | Build for production |
| `start` | Start production server |
| `lint` | Run ESLint |
| `type-check` | Run TypeScript checks |
| `db:generate` | Generate Prisma client |
| `db:push` | Push schema to MongoDB |
| `db:studio` | Open Prisma Studio |
| `db:seed` | Seed the database |

---

## 🧪 API Endpoints

### Authentication
- `GET /api/auth/session` - Get current session
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out

### Todos
- `GET /api/todos` - Get all todos for user
- `POST /api/todos` - Create new todo
- `PUT /api/todos/[id]` - Update todo
- `DELETE /api/todos/[id]` - Delete todo

---

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

1. **Fork the repository**
2. **Create your feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 🐛 Issues & Support

Found a bug or have a feature request?

- 🐛 **[Report Bug](https://github.com/Mobeenkhxn01/todos-app/issues/new?template=bug_report.md)**
- 💡 **[Request Feature](https://github.com/Mobeenkhxn01/todos-app/issues/new?template=feature_request.md)**
- 💬 **[Join Discussions](https://github.com/Mobeenkhxn01/todos-app/discussions)**




### 🔧 Technical Improvements
- [ ] **Unit & Integration Tests** - Comprehensive test coverage
- [ ] **Storybook Integration** - Component documentation
- [ ] **Performance Monitoring** - Real user metrics
- [ ] **Automated Deployments** - CI/CD pipeline
- [ ] **Documentation Site** - Dedicated docs with Nextra

---

## 🙏 Acknowledgments

- [**Next.js Team**](https://nextjs.org/) - Amazing React framework
- [**Prisma Team**](https://prisma.io/) - Excellent database toolkit
- [**TanStack**](https://tanstack.com/) - Powerful data fetching library
- [**ShadCN**](https://ui.shadcn.com/) - Beautiful UI components
- [**Vercel**](https://vercel.com/) - Seamless deployment platform

---

## ⭐ Show Your Support

If this project helped you, please give it a **⭐ star** on GitHub!

---

**Built with ❤️ by Mobeen Khan(https://github.com/Mobeenkhxn01)**

[![GitHub followers](https://img.shields.io/github/followers/Mobeenkhxn01?style=social)](https://github.com/Mobeenkhxn01)