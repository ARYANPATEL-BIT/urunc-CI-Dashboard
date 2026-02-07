# CI Dashboard

A professional CI Dashboard proof of concept built with React, plain JavaScript, and plain CSS. Monitor GitHub Actions workflow runs with a clean, minimal, and modern interface.

## Features

- **Real-time Data**: Fetches live workflow data from GitHub Actions API
- **Auto-refresh**: Automatically updates every 60 seconds
- **Summary Statistics**: View total workflows, passes, fails, and pass rate at a glance
- **Filtering**: Search by name, filter by status, and filter by branch
- **Weather Stability System**: Visual indicators showing workflow stability
  - ☀️ Sunny (90%+) - Very Stable
  - ⛅ Cloudy (70-89%) - Mostly Stable
  - 🌧️ Rainy (40-69%) - Unstable
  - ⛈️ Stormy (<40%) - Very Unstable
- **Expandable Rows**: Click to view the last 10 runs for each workflow
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Loading & Error States**: Proper handling of loading and error conditions

## Tech Stack

- React 18
- Plain JavaScript (no TypeScript)
- Plain CSS (no Tailwind, no Bootstrap, no CSS variables)
- GitHub Actions API

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ci-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
ci-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Filters.js        # Search and filter controls
│   │   ├── StatusBadge.js    # Pass/Fail badge component
│   │   ├── SummaryCards.js   # Top statistics cards
│   │   ├── WorkflowRow.js    # Individual workflow row
│   │   └── WorkflowTable.js  # Main workflow table
│   ├── services/
│   │   └── githubApi.js      # GitHub API integration
│   ├── utils/
│   │   └── helpers.js        # Utility functions
│   ├── App.js                # Main application component
│   ├── index.js              # React entry point
│   └── styles.css            # All styling
├── .gitignore
├── package.json
└── README.md
```

## API Information

This dashboard uses the GitHub Actions API to fetch workflow runs:

**Endpoint**: `https://api.github.com/repos/urunc-dev/urunc/actions/runs`

The API returns workflow run data including:
- Workflow name
- Branch
- Conclusion (success, failure, etc.)
- Created date
- Run URL

## Screenshots

*Add screenshots here after running the application*

## License

MIT
