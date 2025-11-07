# Pintool Landing Page

A modern landing page for Pintool - a Solana blockchain tool platform with integrated analytics and waitlist management.

## Features

- 🎯 **Waitlist System** - Email collection with duplicate detection
- 📊 **Analytics Tracking** - User behavior tracking with localStorage and Supabase
- ⚡ **Fast Performance** - Built with Vite and React 18
- 🎨 **Responsive Design** - Works perfectly on all devices

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- Supabase account (free tier works)

### Installation

```bash
# Clone the repository
git clone git@github.com:pintoolx/landing-page.git
cd pintool_landing_page

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env and add your Supabase credentials:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_key

# Initialize database tables in Supabase SQL Editor
# Run the SQL from src/config/database.js (createWaitlistTableSQL)
# Run the SQL from src/config/analytics-api.js (createAnalyticsTableSQL)

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the app.

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Analytics Features

The application tracks key user interactions:

- `start_demo_clicked` - Demo button clicks
- `join_waitlist_clicked` - Waitlist button clicks
- `waitlist_submitted` - Successful email submissions
- `header_waitlist_clicked` - Header CTA clicks
- `x_link_clicked` - Social link clicks

All events are stored in:
1. **LocalStorage** - Immediate tracking
2. **Supabase** - Long-term storage and analysis