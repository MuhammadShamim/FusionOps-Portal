# 🧩 Integration Ops Portal `0.0.8`

**Integration Ops Portal** is a modular Angular application designed to streamline integration operations. It provides a unified interface for managing tasks related to MuleSoft iPaaS, PagerDuty incidents, GitHub repositories, and release/change management workflows. Built with the latest Angular and Bootstrap UI, it offers a clean, responsive, and secure experience.

## Latest Screenshot
<!-- ![v0.0.4](https://github.com/MuhammadShamim/Integration-Ops-Portal/blob/main/screenshots/v0.0.4.png?raw=)
![v0.0.4](https://github.com/MuhammadShamim/Integration-Ops-Portal/blob/main/screenshots/v0.0.4%20signin.png?raw=)
![v0.0.4](https://github.com/MuhammadShamim/Integration-Ops-Portal/blob/main/screenshots/v0.0.4%20dashboard.png?raw=)
![v0.0.4](https://github.com/MuhammadShamim/Integration-Ops-Portal/blob/main/screenshots/v0.0.4%20notes.png?raw=) -->

## 🚀 Features

- 🔐 Auth0 Microsoft SSO authentication
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
- 🧩 Sneat-inspired, modern UI with global and modular SCSS, no purple accents, only blue theme
- 🖥️ Public/private layout system (sticky header/footer, responsive sidebar, full-width public pages)
- 🌗 Dark/light mode toggle (global, sticky, and themeable)
- 🔄 Universal search and navigation in header
- ♻️ Codebase cleanup: no redundant layouts, unified navigation, maintainable structure, reusable CSS utilities
- 🛡️ Environment-based config for all API services
- 🧹 All public/private pages use new layouts and global styles, no per-component flex/box hacks


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
- `src/app/shared/` — Shared layouts, sidebar, and reusable UI
- `src/app/public/` — Public pages (welcome, features, team, contact, etc.)
- `src/app/private/` — Private/secure pages (dashboard, notes, kanban, carrier profile, etc.)

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


## ♻️ Refactoring & Modernization Highlights

- Unified all pages under a shared, modern layout system
- Sidebar is now part of the private layout, not a separate component
- Removed all redundant/legacy layout and sidebar code
- All navigation is handled via Angular Router (standalone)
- Public and private layouts use sticky header/footer and fluid, scrollable body
- Kanban board supports editing tasks and persistent state
- All public/private pages use the new layouts and global styles

```shell
ng build --configuration production
```

Deploy the contents of the dist/ folder to your preferred hosting service.


## 📬 Contact & Support
For issues, feature requests, or contributions, please open a GitHub issue or contact the Integration Ops team.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
