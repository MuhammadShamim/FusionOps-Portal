# 🧩 FusionOps Portal `0.0.3`

**FusionOps Portal** is a modular Angular application designed to streamline integration operations. It provides a unified interface for managing tasks related to MuleSoft iPaaS, PagerDuty incidents, GitHub repositories, and release/change management workflows. Built with the latest Angular and Bootstrap UI, it offers a clean, responsive, and secure experience.

## Latest Screenshot
![v0.0.3](https://github.com/MuhammadShamim/FusionOps-Portal/blob/v0.0.3/screenshots/v0.0.3.png?raw=)

## 🚀 Features

- 🔐 Auth0 Microsoft SSO authentication
- 📦 MuleSoft iPaaS integration
- 🚨 PagerDuty incident tracking
- 🛠️ GitHub repo and PR management
- 📅 Release and change management tools
- 👋 Welcome, Sign-in, Sign-up pages
- 👤 Profile and Settings pages
- 📬 Contact page
- 📊 Dashboard with operational insights

## 🛠️ Tech Stack

- **Frontend Framework:** Angular 17+
- **UI Library:** Bootstrap 5 (Bootstrap UI)
- **Authentication:** Auth0 with Microsoft SSO
- **Routing:** Angular Router
- **State Management:** RxJS
- **API Integration:** RESTful services (MuleSoft, PagerDuty, GitHub)
- **Icons & Styling:** FontAwesome, SCSS

## 🧑‍💻 Development Setup

### Prerequisites

- Node.js (v18+)
- Angular CLI (`npm install -g @angular/cli`)
- Auth0 account with Microsoft SSO configured
- API keys/tokens for MuleSoft, PagerDuty, GitHub

### Installation

```bash
git clone https://github.com/your-org/fusionops-portal.git
cd fusionops-portal
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

## 📦 Build for Production

```shell
ng build --configuration production
```

Deploy the contents of the dist/ folder to your preferred hosting service.

## 📬 Contact & Support
For issues, feature requests, or contributions, please open a GitHub issue or contact the Integration Ops team.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
