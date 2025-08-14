# 🧩 Integration Ops Portal `0.0.9`

**Integration Ops Portal** is a modular Angular application designed to streamline integration operations. It provides a unified interface for managing tasks related to MuleSoft iPaaS, PagerDuty incidents, GitHub repositories, and release/change management workflows. Built with the latest Angular and Bootstrap UI, it offers a clean, responsive, and secure experience.

## Latest Screenshot
<!-- ![v0.0.4](https://github.com/MuhammadShamim/Integration-Ops-Portal/blob/main/screenshots/v0.0.4.png?raw=)
![v0.0.4](https://github.com/MuhammadShamim/Integration-Ops-Portal/blob/main/screenshots/v0.0.4%20signin.png?raw=)
![v0.0.4](https://github.com/MuhammadShamim/Integration-Ops-Portal/blob/main/screenshots/v0.0.4%20dashboard.png?raw=)
![v0.0.4](https://github.com/MuhammadShamim/Integration-Ops-Portal/blob/main/screenshots/v0.0.4%20notes.png?raw=) -->

## 🚀 Features

- 🔐 Auth0 Microsoft SSO authentication with route protection and redirect handling
- 📦 MuleSoft iPaaS integration
- 🚨 PagerDuty incident tracking with secure token storage, events page, and proxy support
- 🛠️ GitHub repo and PR management
- 📅 Release and change management tools
- 👋 Welcome, Sign-in, and Sign-up pages with sticky header/footer
- 👤 Profile and Settings pages (with secrets, storage, and PagerDuty tabs)
- 📬 Contact page
- 📊 Dashboard with operational insights
- 📝 Notes app with modal-based create/edit, advanced table features (multi-sort, column toggling, row selection, CSV export, copy-to-clipboard)
- 🗂️ Kanban board with drag-and-drop, localStorage, Board/Data tabs, and modal-based editing
- 🧩 Modern UI with global and modular CSS, optimized for performance
- 🖥️ Public/private layout system with lazy loading and code splitting
- 🌗 Dark/light mode toggle with persistent preferences
- 🔄 Universal search and navigation in header
- 🚀 Optimized bundle size with lazy loading and tree shaking
- 🛡️ Environment-based configuration with production optimizations
- 🔒 Enhanced type safety with strict TypeScript checks

## 🎯 Latest Optimizations

- **Lazy Loading**: Implemented route-level code splitting for public and private modules
- **Bundle Optimization**: Reduced initial bundle size to ~127KB gzipped
- **Type Safety**: Enhanced TypeScript configuration with strict type checking
- **Build Performance**: Optimized production builds with proper tree shaking
- **Route Protection**: Improved auth guards with proper redirect handling
- **Style Optimization**: Consolidated and optimized CSS with proper scoping
- **Environment Config**: Enhanced production/development environment separation
- **Code Quality**: Implemented stricter type checking and removed unused code

## 🛠️ Tech Stack

- **Frontend Framework:** Angular 20+
- **UI Library:** Bootstrap 5, Integration Ops theme
- **Authentication:** Auth0 with Microsoft SSO
- **Routing:** Angular Standalone Router
- **State Management:** RxJS
- **API Integration:** RESTful services (MuleSoft, PagerDuty, GitHub)
- **Icons & Styling:** FontAwesome, SCSS, modular and global styles

## 🧑‍💻 Development Setup & Structure

### Key Folders
- `src/app/public/` — Public pages with lazy loading
- `src/app/private/` — Private/secure pages with lazy loading and auth protection
- `src/environments/` — Environment-specific configurations
- `src/app/services/` — Shared services with enhanced type safety

### Prerequisites

- Node.js (v18+)
- Angular CLI (`npm install -g @angular/cli`)
- Auth0 account with Microsoft SSO configured
- API keys/tokens for MuleSoft, PagerDuty, GitHub

### Installation

```bash
git clone https://github.com/your-org/integration-ops-portal.git
cd integration-ops-portal
npm install
```

### Environment Configuration

Create a `.env` or use `environment.ts` files to store:

```typescript
export const environment = {
  production: false,
  auth0: {
    domain: 'your-auth0-domain',
    clientId: 'your-client-id',
    audience: 'your-api-audience'
  },
  muleSoftApi: 'https://api.mulesoft.com/...',
  pagerDutyApi: 'https://api.pagerduty.com/...',
  githubApi: 'https://api.github.com/...',
};
```

### Running Locally

```shell
ng serve
or 
ng serve --proxy-config proxy.conf.json
```
App will be available at http://localhost:4200.

## 🧪 Testing

### Unit Tests

```shell
ng test
```

### End-to-End Tests

```shell
ng e2e
```

Uses Protractor or Cypress (based on your setup).

### Build & Deployment

For production builds with optimizations:

```bash
ng build --configuration production
```

Key optimization features:
- Tree shaking for unused code elimination
- Route-level code splitting
- CSS optimization and minification
- Environment-specific configurations
- Strict type checking

## ♻️ Refactoring & Modernization Highlights

- Unified all pages under a shared, modern layout system
- Sidebar is now part of the private layout, not a separate component
- Removed all redundant/legacy layout and sidebar code
- All navigation is handled via Angular Router (standalone)
- Public and private layouts use sticky header/footer and fluid, scrollable body
- Kanban board supports editing tasks and persistent state
- All public/private pages use the new layouts and global styles

## 📬 Contact & Support
For issues, feature requests, or contributions, please open a GitHub issue or contact the Integration Ops team.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
