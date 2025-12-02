# SETUP AND INSTALLATION GUIDE

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
-   **npm** (comes with Node.js) or **yarn**
-   **Git** (optional, for version control)
-   A modern web browser (Chrome, Firefox, Safari, Edge)

## Installation Steps

### 1. Navigate to Project Directory

```bash
cd data-structures-proj
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

This will install all required packages listed in `package.json`:

-   React 18.3
-   TypeScript 5.3
-   Vite 5.0
-   Tailwind CSS 3.4
-   Framer Motion 10.16
-   Zustand 4.4
-   And other utilities

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will start at `http://localhost:5173`

Open your browser and navigate to this URL. You should see the AlgoVisual homepage with all data structures.

## Available Scripts

### Development

```bash
npm run dev         # Start development server with hot reload
npm run build       # Build for production
npm run preview     # Preview production build locally
npm run lint        # Run ESLint and TypeScript checks
```

### Production Build

```bash
npm run build
```

This creates an optimized `dist` folder ready for deployment.

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
npm run dev -- --port 3000
```

### Dependencies Installation Issues

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### TypeScript Errors

```bash
# Ensure TypeScript is up to date
npm install -D typescript@latest
```

### Module Not Found Errors

Make sure all path aliases in `tsconfig.json` are correct:

```json
{
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@/*": ["src/*"],
			"@components/*": ["src/components/*"]
			// ... etc
		}
	}
}
```

## Project Structure Details

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.tsx       # Navigation bar with theme toggle
│   ├── Footer.tsx       # Footer component
│   ├── PlaybackControls.tsx  # Animation controls
│   ├── ComplexityTable.tsx   # Big O notation display
│   ├── OperationLog.tsx      # Operation history
│   └── StructureCard.tsx     # Structure preview card
│
├── pages/               # Full page components
│   ├── HomePage.tsx     # Landing page with structure grid
│   ├── LearnPage.tsx    # Theory and explanation page
│   ├── VisualizePage.tsx # Interactive visualizer
│   └── QuizPage.tsx     # Quiz questions and answers
│
├── visualizers/         # Structure visualization components
│   ├── ArrayVisualizer.tsx
│   ├── StackVisualizer.tsx
│   ├── QueueVisualizer.tsx
│   ├── LinkedListVisualizer.tsx
│   ├── TreeVisualizer.tsx
│   ├── GraphVisualizer.tsx
│   ├── HeapVisualizer.tsx
│   └── HashTableVisualizer.tsx
│
├── store/              # State management with Zustand
│   ├── themeStore.ts   # Dark mode toggle
│   ├── visualizationStore.ts  # Animation state
│   └── dataStructureStores.ts # Data structure states
│
├── utils/              # Utility functions
│   ├── helpers.ts      # Random data, sorting, etc.
│   └── complexity.ts   # Big O calculations
│
├── data/               # Constants and data
│   └── structures.ts   # All 8 data structure definitions
│
├── styles/             # Global styling
│   └── globals.css     # Tailwind directives
│
├── App.tsx             # Root component with routing
└── main.tsx            # React DOM render
```

## Configuration Files

### tsconfig.json

TypeScript configuration with path aliases for clean imports.

### tailwind.config.js

Tailwind CSS customization with custom colors and animations.

### vite.config.ts

Vite build configuration with React plugin and path aliases.

### eslint.config.js

Code quality rules (strict mode, no unused variables, etc.)

## Environment Variables (Optional)

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:3000
VITE_DEBUG=false
```

Access in components:

```ts
const apiUrl = import.meta.env.VITE_API_URL;
```

## First Time Using This Project?

### Start Here:

1. **Read the README.md** - Overview and features
2. **Explore the home page** - Click through each data structure
3. **Visit Learn pages** - Read about theory
4. **Try visualizations** - Play with interactive controls
5. **Complete quizzes** - Test your understanding

### Key Features to Try:

-   [ ] Add/remove elements in Array
-   [ ] Push/pop in Stack
-   [ ] Enqueue/dequeue in Queue
-   [ ] Toggle dark mode (top-right button)
-   [ ] Adjust animation speed
-   [ ] Check operation log
-   [ ] Take a quiz and see explanations
-   [ ] Use undo/redo buttons

## Performance Tips

-   Enable hardware acceleration in your browser for better animations
-   Close other tabs to free up RAM for smooth rendering
-   Use the latest version of your browser

## Next Steps

1. **Customize Colors**: Edit `tailwind.config.js`
2. **Add More Data Structures**: Follow the structure in `src/data/structures.ts`
3. **Create Custom Visualizers**: Study existing visualizers as templates
4. **Deploy**: Use Vercel, Netlify, or GitHub Pages

## Common Tasks

### Add a New Data Structure

1. Add to `DATA_STRUCTURES` array in `src/data/structures.ts`
2. Create visualizer in `src/visualizers/NewStructureVisualizer.tsx`
3. Create store in `src/store/dataStructureStores.ts`
4. Add route in `src/App.tsx`

### Change Colors

Edit colors in `tailwind.config.js`:

```js
colors: {
  primary: {
    500: '#your-hex-color',
  }
}
```

### Update Quiz Questions

Edit `src/pages/QuizPage.tsx` and add to `QUIZ_DATA` object.

## Getting Help

1. **Check the code comments** - Each file has explanations
2. **Review TypeScript types** - They guide correct usage
3. **Look at similar components** - Copy and modify patterns
4. **Check React docs** - For component and hook questions
5. **Search error messages** - Usually very descriptive

## File Naming Conventions

-   **Components**: PascalCase (e.g., `Navbar.tsx`)
-   **Hooks/Store**: camelCase with `use` prefix (e.g., `useTheme.ts`)
-   **Utils/Helpers**: camelCase (e.g., `helpers.ts`)
-   **Folders**: kebab-case (e.g., `data-structures`)

## Code Style

-   TypeScript for type safety
-   ESLint for code quality
-   Tailwind CSS for styling
-   Framer Motion for animations
-   Zustand for state management

---

**Ready to explore data structures? Start with `npm run dev` and visit http://localhost:5173!**
