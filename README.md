# Yopki Tech Assignment

This is a monorepo project built with pnpm workspaces, containing a frontend application built with React and a backend server using Hono.js.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v19.0.0 or higher recommended)
- pnpm (v10.4.1 or higher)

## Project Structure

```
yopki_tech_assignment/
├── apps/
│   ├── front/    # Frontend React application
│   └── server/   # Backend Hono.js server
├── packages/     # Shared packages
└── package.json  # Root package.json
```

## Environment Setup

### Frontend (.env file in apps/front/)

Create a `.env` file in the `apps/front` directory with the following variables:

```env
# Add your frontend environment variables here
VITE_API_URL=http://localhost:3000
```

### Backend (.env file in apps/server/)

Create a `.env` file in the `apps/server` directory with the following variables:

```env
# Add your backend environment variables here
PORT=3000
OPENAI_API_TOKEN=your_openai_api_key
SERPAPI_API_KEY=your_serpapi_api_key
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd yopki_tech_assignment
```

2. Install dependencies:

```bash
pnpm install
```

## Development

To run the project in development mode:

1. Start the backend and front:

```bash
pnpm dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:8080`.

## API Documentation

The backend provides interactive API documentation using OpenAPI (Swagger). Once the server is running, you can access the documentation at:

```
http://localhost:8080/docs
```

This documentation includes:

- All available endpoints
- Request/response schemas
- Example requests

## Technologies Used

### Frontend

- React 19
- TanStack Router & React Query
- Tailwind CSS
- Radix UI Components
- Vinxi (Vite-based build tool)

### Backend

- Hono.js
- OpenAI SDK
- SerpAPI
- Zod for validation
- TypeScript

## Development Tools

- TypeScript
- ESLint with sheriff configuration
- Prettier for code formatting
- pnpm for package management
- Turbo for monorepo management

## License

ISC
