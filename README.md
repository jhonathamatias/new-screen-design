# CCB File Management System

A modern file management system for CCB (Certificado de Cédulas de Crédito Bancário) built with React, TypeScript, Ant Design, and Tailwind CSS.

## 🚀 Technologies

This project is built with:

- **React** 18.3.1 - UI library
- **TypeScript** 5.8.3 - Type safety
- **Vite** 5.4.19 - Build tool and dev server
- **Ant Design** 6.2.1 - UI component library
- **Tailwind CSS** 3.4.17 - Utility-first CSS framework
- **React Router** 6.30.1 - Client-side routing
- **Day.js** 1.11.19 - Date manipulation

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm, pnpm, or bun package manager

## 🛠️ Installation

Clone the repository and install dependencies:

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd new-screen-design

# Install dependencies
npm install
# or
pnpm install
# or
bun install
```

## 🏃 Running the Project

### Development Mode

Start the development server with hot module replacement:

```sh
npm run dev
# or
pnpm dev
# or
bun dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Build for Production

Create an optimized production build:

```sh
npm run build
# or
pnpm build
# or
bun build
```

### Preview Production Build

Preview the production build locally:

```sh
npm run preview
# or
pnpm preview
# or
bun preview
```

## 🧪 Testing

Run tests:

```sh
npm run test
# or
pnpm test
# or
bun test
```

Run tests in watch mode:

```sh
npm run test:watch
# or
pnpm test:watch
# or
bun test:watch
```

## 📁 Project Structure

```
src/
├── components/        # Reusable React components
│   ├── bdr/          # BDR-specific components
│   ├── layout/       # Layout components (Header, Sidebar, etc.)
│   └── ui/           # (removed - using Ant Design instead)
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page components
│   ├── BDRPage.tsx
│   ├── CCBGestaoArquivos.tsx
│   ├── CCBGestaoArquivosAntd.tsx
│   ├── Index.tsx
│   └── NotFound.tsx
├── App.tsx           # Main app component
└── main.tsx          # Application entry point
```

## 🎨 UI Components

This project uses **Ant Design** as the primary UI component library. All components are imported from `antd`:

- Layout components: Layout, Card, Divider
- Navigation: Menu, Tabs, Breadcrumb
- Data Display: Table, Tag, Typography, Empty
- Data Entry: Input, DatePicker, Button
- Feedback: Drawer, Dropdown, Pagination
- Icons: `@ant-design/icons`

**Tailwind CSS** is used for styling and utility classes alongside Ant Design's built-in styles.

## 📝 Code Style

- All code (variables, functions, interfaces, types) is written in **English**
- User-facing text (labels, messages, titles) is in **Portuguese**
- Components follow React functional component patterns with TypeScript
- ESLint is configured for code quality

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 📦 Dependencies

### Main Dependencies

- `antd` - Ant Design component library
- `@ant-design/icons` - Icon library for Ant Design
- `react` & `react-dom` - React core libraries
- `react-router-dom` - Routing
- `dayjs` - Date manipulation
- `clsx` & `tailwind-merge` - Utility libraries for class names

### Development Dependencies

- `typescript` - TypeScript compiler
- `vite` - Build tool
- `vitest` - Testing framework
- `eslint` - Linter
- `tailwindcss` - CSS framework
- `autoprefixer` & `postcss` - CSS processing

## 🌐 Deployment

Build the project and deploy the `dist` folder to your hosting provider of choice.

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. Contributions are limited to authorized team members.
