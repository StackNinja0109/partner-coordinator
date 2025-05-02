# Coordinator - Next.js Application

A modern web application built with Next.js 13, featuring authentication, API integration, and a robust frontend architecture.

## Tech Stack

- **Framework**: Next.js 13
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Recoil
- **UI Components**: Ant Design, Headless UI
- **Form Handling**: React Hook Form with Yup validation
- **Date Handling**: date-fns, moment
- **Authentication**: Firebase
- **Email**: SendGrid, Nodemailer
- **Search**: Elasticsearch
- **PDF Generation**: React PDF
- **Development Tools**: ESLint, Prettier

## Project Structure

```
coordinator/
├── app/                   # Next.js 13 app directory
│   ├── (auth)/            # Authentication routes
│   ├── (main)/            # Main application routes
│   ├── api/               # API routes
│   └── page.tsx           # Root page
├── components/            # Reusable UI components
├── features/              # Feature-specific components and logic
├── hooks/                 # Custom React hooks
├── libs/                  # Utility libraries
├── recoil/                # Recoil state management
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── public/                # Static assets
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy `env.development` to `.env.local` for development
   - Copy `env.production` to `.env.local` for production

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

### Starting Production Server

```bash
npm run start
# or
yarn start
```

## Deployment

The project includes deployment scripts for different environments:

- `deploy.sh` - Development deployment
- `deploy-prod.sh` - Production deployment

## Features

- Modern Next.js 13 app directory structure
- TypeScript for type safety
- Tailwind CSS for styling
- Recoil for state management
- Firebase authentication
- API integration with various services
- PDF generation capabilities
- Email functionality
- Elasticsearch integration
- Responsive design

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request
