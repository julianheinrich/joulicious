# joulicious

Smart agentic family meal planner

## Overview

Joulicious is a GitHub-based family meal planning web application that helps you organize weekly meals, accommodate dietary preferences, and discover new recipes. The app is hosted on GitHub Pages and provides an intuitive interface for planning your family's meals.

## Features

- 📅 Weekly meal planning calendar
- 🥗 Dietary preference management
- 📖 Recipe library with markdown-based recipes
- 🤖 Automated meal plan generation (via GitHub Actions)
- 🌐 Web-based interface hosted on GitHub Pages

## Getting Started

### View the App

Visit the live app at: `https://julianheinrich.github.io/joulicious/`

### Customize Preferences

Edit `data/preferences.json` to set your family's dietary preferences, favorite cuisines, and restrictions.

### Add Recipes

Create new recipes in the `recipes/` directory using markdown format. See `recipes/scrambled-eggs.md` for an example.

## Project Structure

```
joulicious/
├── .github/workflows/    # GitHub Actions workflows
├── data/                 # Preference and configuration data
├── docs/                 # Web app (GitHub Pages)
├── recipes/              # Recipe collection
└── README.md
```

## Development

The web app is a static site using vanilla HTML, CSS, and JavaScript. Simply edit the files in the `docs/` directory and push to GitHub.

## License

MIT
