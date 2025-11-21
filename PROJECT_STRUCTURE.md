# 📂 Proje Yapısı

```
paper-inventory/
│
├── 📄 README.md                    # Main documentation
├── 📄 QUICKSTART.md               # 5-minute setup guide
├── 📄 DEPLOYMENT.md               # Detailed deployment steps
├── 📄 USAGE.md                    # User manual & features
├── 📄 OVERVIEW.md                 # Technical overview
├── 📄 SETUP_CHECKLIST.md          # Pre-deployment checklist
├── 📄 PROJECT_STRUCTURE.md        # This file
│
├── .env                           # Local environment variables
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
│
├── 📁 .github/
│   └── 📁 workflows/
│       └── deploy.yml             # CI/CD pipeline
│
├── 📁 src/
│   ├── 📄 main.tsx                # React entry point
│   ├── 📄 App.tsx                 # Main app component
│   ├── 📄 index.css               # Global styles
│   │
│   ├── 📁 pages/                  # Page components
│   │   ├── Login.tsx              # Auth page (register/login)
│   │   ├── Dashboard.tsx          # Main dashboard
│   │   ├── Products.tsx           # Product management
│   │   ├── StockMovements.tsx     # Stock in/out tracking
│   │   ├── Clients.tsx            # Customer management
│   │   └── Transactions.tsx       # Payment tracking
│   │
│   ├── 📁 components/             # Reusable components
│   │   └── Layout.tsx             # Navigation layout
│   │
│   ├── 📁 contexts/               # React contexts
│   │   └── AuthContext.tsx        # Auth state management
│   │
│   └── 📁 lib/                    # Utilities & services
│       └── supabase.ts            # Supabase client singleton
│
├── 📁 supabase/
│   └── 📁 migrations/
│       └── 20251119143621_create_inventory_schema.sql
│           # Complete database schema with:
│           # - All tables (profiles, products, clients, etc.)
│           # - RLS policies
│           # - Triggers & functions
│           # - Views for denormalization
│
├── 📁 public/                     # Static assets (empty)
│
├── 📄 package.json                # Node dependencies
├── 📄 package-lock.json           # Dependency lock file
│
├── 📄 index.html                  # HTML entry point
├── 📄 vite.config.ts              # Vite configuration
├── 📄 tsconfig.json               # TypeScript config
├── 📄 tsconfig.app.json           # App-specific TS config
├── 📄 tsconfig.node.json          # Build tool TS config
│
├── 📄 tailwind.config.js          # Tailwind CSS config
├── 📄 postcss.config.js           # PostCSS config
├── 📄 eslint.config.js            # ESLint configuration
│
└── 📁 dist/                       # Build output (gitignored)
    ├── index.html
    ├── assets/
    │   ├── index-*.js
    │   └── index-*.css
    └── ...
```

---

## 📄 Key Files

### Authentication
- **src/contexts/AuthContext.tsx** - Global auth state
- **src/lib/supabase.ts** - Supabase client
- **src/pages/Login.tsx** - Login/register UI

### Pages
| File | Purpose | Route |
|------|---------|-------|
| Dashboard.tsx | KPI summary | / |
| Products.tsx | Product CRUD | /products |
| StockMovements.tsx | In/out tracking | /stock |
| Clients.tsx | Customer management | /clients |
| Transactions.tsx | Payment tracking | /transactions |

### Components
| File | Purpose |
|------|---------|
| Layout.tsx | Navigation & layout |

### Database
| File | Purpose |
|------|---------|
| create_inventory_schema.sql | All tables + RLS + views |

### Configuration
| File | Purpose |
|------|---------|
| vite.config.ts | Build tool settings |
| tailwind.config.js | UI styling |
| tsconfig.json | TypeScript settings |
| .env.example | Env template |

---

## �� Data Flow

```
User Action
    ↓
React Component (e.g., Products.tsx)
    ↓
supabase.from('table').operation()
    ↓
Supabase API
    ↓
PostgreSQL Database
    ↓
RLS Policies Check ✓
    ↓
Return Data
    ↓
Component State Update
    ↓
UI Render
```

---

## 📦 Dependencies

### Production
```json
{
  "@supabase/supabase-js": "^2.57.4",  // Database client
  "react": "^18.3.1",                   // UI framework
  "react-dom": "^18.3.1",               // React DOM
  "lucide-react": "^0.344.0"            // Icons
}
```

### Development
```json
{
  "vite": "^5.4.2",                     // Build tool
  "react": "types",
  "typescript": "^5.5.3",               // Type checking
  "tailwindcss": "^3.4.1",              // CSS framework
  "eslint": "^9.9.1"                    // Code linting
}
```

---

## 🔐 Security Files

✅ `.env` - Ignored (never committed)
✅ `.gitignore` - Prevents credential leaks
✅ RLS Policies - Database level access control
✅ HTTPS - Vercel + Supabase encryption

---

## 🎨 Styling

**Framework**: Tailwind CSS (utility-first)

**Key Files**:
- `index.css` - Global styles
- `tailwind.config.js` - Theme configuration
- Component classes - Inline utilities

**Colors**:
- Primary: Slate (gray)
- Status: Green (success), Red (error), Blue (info)

---

## 📊 Database Tables

| Table | Columns | Purpose |
|-------|---------|---------|
| profiles | id, full_name, role | User profiles |
| products | id, name, unit | Product catalog |
| clients | id, first_name, last_name, company, phone | Customers |
| transactions | id, client_id, amount, type, note | Payments |
| stock_movements | id, product_id, movement_type, quantity, ... | In/out tracking |
| stock_levels | product_id, total_quantity | Cache |

---

## 🚀 Deployment Structure

```
GitHub (Code)
    ↓ (git push)
Vercel (Build & Deploy)
    ↓ (fetch env vars)
.env Variables
    ↓ (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
Supabase API
    ↓
PostgreSQL Database
    ↓ (stored in supabase.com)
✓ Live on https://your-app.vercel.app
```

---

## 📝 Build Process

```bash
$ npm run build

1. TypeScript Compile → Check types
2. Vite Transform → Bundle modules
3. Tree Shake → Remove unused code
4. Minify → Reduce size
5. Hash Assets → Cache busting
6. Output → dist/

Result: Optimized production bundle
```

---

## 🔍 File Sizes (Approximate)

| File | Size |
|------|------|
| React | 40KB |
| Supabase Client | 50KB |
| App Code | 30KB |
| Styling | 15KB |
| Total (gzipped) | ~88KB |

**Load Time**: ~2 seconds (typical network)

---

## 🛠️ Development Commands

```bash
npm install           # Install dependencies
npm run dev          # Start dev server (port 5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code style
npm run typecheck    # TypeScript validation
```

---

## 🔑 Environment Variables

```bash
# Required
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Vite prefix: Exposed to browser (safe)
# - No secrets here!
# - Public API key is intended
```

---

## 📋 Git Workflow

```bash
git add .               # Stage files
git commit -m "msg"     # Commit
git push origin main    # Push to GitHub
                ↓
            Vercel auto-deploys
                ↓
        https://your-app.vercel.app
```

---

## 🎯 Next Steps

1. **Setup**: Follow QUICKSTART.md
2. **Deploy**: Follow DEPLOYMENT.md
3. **Learn**: Read USAGE.md
4. **Customize**: Modify components as needed
5. **Scale**: Upgrade Supabase if needed

---

**Questions?** Check the relevant .md file or Supabase/Vercel docs.
