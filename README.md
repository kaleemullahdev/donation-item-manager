# Donation Item Manager

A modern React application for managing donation items with a focus on type safety, code quality, and maintainable architecture.

## 🚀 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
  - _Why?_ React 18 provides concurrent features and automatic batching, while TypeScript adds type safety
- **Build Tool**: Vite
  - _Why?_ Vite offers faster development server startup and hot module replacement compared to Create React App
- **Styling**: TailwindCSS with shadcn/ui components
  - _Why?_ TailwindCSS provides utility-first CSS, while shadcn/ui offers accessible, customizable components
- **Data Fetching**: React Query (TanStack Query)
  - _Why?_ React Query handles server state, caching, and background updates efficiently
- **Form Handling**: React Hook Form with Zod validation
  - _Why?_ React Hook Form provides performant form handling, while Zod adds type-safe validation
- **Testing**: Vitest + React Testing Library
  - _Why?_ Vitest is faster than Jest and has better ESM support, while RTL promotes testing user behavior
- **Code Quality**: ESLint + Prettier
  - _Why?_ ESLint catches code issues, while Prettier ensures consistent formatting
- **Package Manager**: pnpm
  - _Why?_ pnpm provides faster installation and better disk space usage than npm or yarn

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## 🏗️ Project Structure

```
donation-item-manager/
├── src/                      # Source code
│   ├── assets/              # Static assets (images, fonts)
│   ├── components/          # React components
│   │   ├── __tests__/      # Component tests
│   │   │   ├── data-card.test.tsx
│   │   │   ├── data-table.test.tsx
│   │   │   └── status-badge.test.tsx
│   │   ├── shadcn/         # UI components from shadcn/ui
│   │   ├── create-item-modal.tsx
│   │   ├── data-card.tsx
│   │   ├── data-table.tsx
│   │   ├── pagination.tsx
│   │   └── status-badge.tsx
│   ├── constants/          # Application constants
│   ├── hooks/             # Custom React hooks
│   │   ├── useMutation.ts
│   │   ├── useQueryAllDonationItems.ts
│   │   ├── useQueryDonationLocations.ts
│   │   ├── useQueryDonationStatuses.ts
│   │   └── useQueryDonationThemes.ts
│   ├── lib/               # Utility functions and configurations
│   ├── services/          # API services
│   │   └── donation-item-services.ts
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Root component
│   ├── App.css            # Global styles
│   ├── donation-items.tsx # Main donation items page
│   ├── index.css          # Global CSS
│   ├── main.tsx           # Application entry point
│   └── setupTests.ts      # Test setup and configurations
├── public/                # Public static files
├── __mocks__/            # Mock data for testing
├── .husky/               # Git hooks configuration
├── .vscode/              # VS Code settings
├── node_modules/         # Dependencies
├── .gitignore           # Git ignore rules
├── .prettierrc          # Prettier configuration
├── .prettierignore      # Prettier ignore rules
├── components.json      # shadcn/ui configuration
├── eslint.config.mjs    # ESLint configuration
├── index.html           # HTML entry point
├── jest.config.ts       # Jest configuration
├── package.json         # Project dependencies and scripts
├── pnpm-lock.yaml       # pnpm lock file
├── tsconfig.json        # TypeScript configuration
├── tsconfig.app.json    # TypeScript app configuration
├── tsconfig.node.json   # TypeScript Node configuration
├── vite.config.ts       # Vite configuration
└── vitest.config.ts     # Vitest configuration
```

_Why this structure?_ This organization follows the principle of separation of concerns and makes it easy to locate and maintain code:

- `components/`: Reusable UI components with their tests
- `hooks/`: Custom React hooks for data fetching and state management
- `services/`: API integration and data fetching logic
- `types/`: TypeScript type definitions
- `lib/`: Utility functions and shared configurations
- `constants/`: Application-wide constants
- Root configuration files for TypeScript, ESLint, Prettier, and testing

## 🎨 Code Patterns & Architecture

### 1. Component Architecture

- **Atomic Design Pattern**
  - _Why?_ This pattern promotes reusability and maintainability by breaking down UI into smaller, reusable pieces
  - Atoms: Basic UI components (Button, Input, Badge)
  - Molecules: Composite components (Form fields, Cards)
  - Organisms: Complex components (DataTable, DataCard)

### 2. Type Safety

- **Strict TypeScript Configuration**
  - _Why?_ Strict mode helps catch potential errors early in development
  - Strict mode enabled
  - No implicit any
  - Strict null checks
  - Type-safe props and state management

### 3. State Management

- **React Query for Data Fetching**
  - _Why?_ React Query simplifies server state management with built-in caching and synchronization
  - Automatic caching
  - Background updates
  - Optimistic updates
  - Error handling

### 4. Form Handling

- **React Hook Form + Zod**
  - _Why?_ This combination provides type-safe form validation with minimal re-renders
  - Type-safe form validation
  - Efficient form state management
  - Custom validation rules

## 🧪 Testing Strategy

### 1. Component Testing

```typescript
// Example of a component test
describe('DataCard Component', () => {
  it('renders cards with paginated items', () => {
    render(<DataCard paginatedItems={mockPaginatedItems} />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })
})
```

_Why this testing approach?_ Tests focus on user behavior rather than implementation details, making them more resilient to refactoring.

### 2. Test Patterns

- **Render Testing**: Verifies component rendering
- **User Interaction**: Tests click events and form submissions
- **State Changes**: Verifies component state updates
- **Edge Cases**: Tests with empty or invalid data

### 3. Test Coverage

- Component rendering
- User interactions
- Form validation
- State management
- Edge cases

## 🛠️ Code Quality & Standards

### 1. ESLint Configuration

```javascript
// Key ESLint rules
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
}
```

_Why these rules?_ These configurations enforce best practices while allowing flexibility where needed.

### 2. Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

_Why this formatting?_ These settings provide a clean, consistent code style that's easy to read and maintain.

### 3. Git Hooks (Husky)

- Pre-commit: Lints and formats code
- Pre-push: Runs tests

_Why Git hooks?_ They ensure code quality by running checks before code is committed or pushed.

## 🔍 Code Patterns in Detail

### 1. Component Structure

```typescript
// Example of a well-structured component
export const DataCard: React.FC<Props> = ({ paginatedItems }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {paginatedItems.map(item => (
        <Card key={item.id}>
          {/* Card content */}
        </Card>
      ))}
    </div>
  )
}
```

_Why this structure?_ Components are kept simple and focused on a single responsibility.

### 2. Type Definitions

```typescript
// Example of type definitions
interface DonationItem {
  id: string
  name: string
  status: {
    id: string
    name: string
  }
  reference: {
    type: {
      id: string
    }
  }
  price: {
    amount: number
    currencyCode: string
    text: string
  }
  location: {
    id: string
    name: string
  }
  theme: {
    id: string
    name: string
  }
}
```

_Why these types?_ They provide clear documentation and type safety for the data structure.

### 3. Testing Patterns

```typescript
// Example of testing patterns
describe('Component', () => {
  it('handles items with missing optional data', () => {
    const itemsWithMissingData = [/* ... */]
    render(<Component items={itemsWithMissingData} />)
    expect(screen.getByText('N/A')).toBeInTheDocument()
  })
})
```

_Why these patterns?_ They ensure components handle edge cases gracefully.

## 🚀 Development Workflow

1. **Setup**

   ```bash
   pnpm install
   ```

   _Why pnpm?_ It's faster and more efficient than npm or yarn.

2. **Development**

   ```bash
   pnpm dev
   ```

   _Why Vite?_ It provides instant server start and hot module replacement.

3. **Testing**

   ```bash
   pnpm test        # Run all tests
   pnpm test:watch  # Run tests in watch mode
   ```

   _Why Vitest?_ It's faster than Jest and has better ESM support.

4. **Building**
   ```bash
   pnpm build
   ```
   _Why this build process?_ It optimizes the application for production.

## 📝 Best Practices

1. **Code Organization**

   - Kept components small and focused
   - Used proper TypeScript types
   - Followed atomic design principles

2. **Testing**

   - Written tests for all components
   - Tested edge cases and error states
   - Used proper test patterns

3. **Accessibility**
   - Used semantic HTML
   - Implemented proper ARIA attributes
   - Ensured keyboard navigation
