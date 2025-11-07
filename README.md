# Pintool Landing Page

A modern landing page for Pintool - a Solana blockchain tool platform with integrated analytics and waitlist management.

## Features

- 🎯 **Waitlist System** - Email collection with duplicate detection
- 📊 **Analytics Tracking** - User behavior tracking with localStorage and Supabase
- 📈 **Grafana Dashboard** - Real-time monitoring and visualization
- ⚡ **Fast Performance** - Built with Vite and React 18
- 🎨 **Responsive Design** - Works perfectly on all devices

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Analytics**: Custom analytics SDK + Grafana
- **UI Icons**: Lucide React

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Features.jsx
│   ├── Waitlist.jsx
│   └── Footer.jsx
├── config/
│   ├── database.js      # Supabase client & waitlist service
│   └── analytics-api.js # Analytics API for Grafana
├── utils/
│   └── analytics.js     # Frontend analytics tracking
└── App.jsx

grafana-setup/
├── docker-compose.yml   # Grafana setup
└── grafana/
    ├── provisioning/
    └── dashboards/
```

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- Supabase account (free tier works)
- Docker (optional, for Grafana)

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
3. **Google Analytics** - (Optional) Third-party integration

## Grafana Setup (Optional)

```bash
cd grafana-setup

# Edit grafana/provisioning/datasources/supabase.yml with your DB credentials

# Start Grafana
docker-compose up -d

# Access at http://localhost:3001
# Default login: admin / (password from .env)
```

## Database Schema

### waitlist table
- `email` (unique)
- `created_at`
- `source`
- `metadata` (JSONB)

### analytics_events table
- `event_name`
- `properties` (JSONB)
- `timestamp`
- `session_id`
- `url`
- `user_agent`

## Security

- Supabase Row Level Security (RLS) enabled
- Environment variables for sensitive data
- Email validation and duplicate prevention

## License

MIT License

---

Built with ❤️ by Pintool Team
