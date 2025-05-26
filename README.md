# Donation Item Manager

A modern web application for managing donation items, built with React and TypeScript.

## 🚀 Tech Stack

### Frontend

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: TailwindCSS 4
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**:
  - Radix UI (Dialog, Label, Select, Slot)
  - Custom components with Tailwind
- **Notifications**: Sonner
- **Icons**: Lucide React

### Development Tools

- **Type Checking**: TypeScript 5.8
- **Linting**: ESLint 9
- **Code Formatting**: Prettier
- **Git Hooks**: Husky
- **Package Manager**: pnpm

## 🏗️ Architecture

The project follows a modern React application architecture:

1. **Component-Based Structure**

   - Reusable UI components
   - Atomic design principles
   - Radix UI for accessible components

2. **Type Safety**

   - TypeScript for static type checking
   - Zod for runtime validation

3. **Date Fetching**

   - React Query for server state
   - React hooks for local state

4. **Build & Development**
   - Vite for fast development and optimized builds
   - ESLint and Prettier for code quality
   - Husky for pre-commit hooks

## 💻 Code Patterns & Techniques

### 1. Component Architecture

```typescript
// Atomic Design Pattern
- atoms/ (basic building blocks)
- molecules/ (combinations of atoms)
- organisms/ (complex UI components)
- templates/ (page layouts)
- pages/ (full pages)
```

### 2. Type Safety

```typescript
// TypeScript with strict mode
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

// Zod Schema Validation
const donationSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().positive(),
  category: z.enum(['Clothing', 'Electronics', 'Food'])
});
```

### 3. State Management

```typescript
// React Query for Server State
const { data, isLoading } = useQuery({
  queryKey: ['donations'],
  queryFn: fetchDonations,
})

// Local State with React Hooks
const [filter, setFilter] = useState<FilterState>({
  category: 'all',
  status: 'all',
})
```

### 4. Form Handling

```typescript
// React Hook Form with Zod
const form = useForm<DonationFormData>({
  resolver: zodResolver(donationSchema),
  defaultValues: {
    name: '',
    quantity: 1,
  },
})
```

## 🔧 Code Quality & Standards

### 1. ESLint Configuration

```javascript
// Import Sorting
{
  "plugins": ["simple-import-sort"],
  "rules": {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  }
}

// React Specific Rules
{
  "plugins": ["react", "react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### 2. Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

### 3. Git Hooks (Husky)

```json
{
  "hooks": {
    "pre-commit": "lint-staged",
    "pre-push": "pnpm test"
  }
}
```

## 📊 Testing Strategy

### 1. Unit Tests

```typescript
// Component Testing
describe('DonationItem', () => {
  it('renders correctly', () => {
    render(<DonationItem item={mockItem} />);
    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
  });
});
```

### 2. Integration Tests

```typescript
// Form Submission Flow
describe('DonationForm', () => {
  it('submits form data correctly', async () => {
    render(<DonationForm onSubmit={mockSubmit} />);
    await userEvent.type(screen.getByLabelText(/name/i), 'Test Item');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Test Item'
    }));
  });
});
```

## 🚀 Getting Started

1. **Installation**

   ```bash
   pnpm install
   ```

2. **Development**

   ```bash
   pnpm dev
   ```

3. **Build**

   ```bash
   pnpm build
   ```

4. **Linting**

   ```bash
   pnpm lint
   ```

5. **Formatting**

   ```bash
   pnpm format
   ```

6. **Testing**
   ```bash
   pnpm test
   pnpm test:watch
   pnpm test:coverage
   ```

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

Please read our contributing guidelines before submitting pull requests.
