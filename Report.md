# Mini Project Report - NovaNest Market SPA

## 1. Features Implemented

- Product listing via DummyJSON (`/products`)
- Search, category filtering, and sorting
- Product detail route (`/product/:id`)
- Auth simulation using `/auth/login`
- Persisted auth and cart state using `localStorage`
- Pinia global state for cart
- Dark mode toggle with persisted preference
- Responsive UI using Tailwind utility classes

## 2. Component Hierarchy

- `App.vue`
- `components/layout/AppHeader.vue`
- `views/HomeView.vue`
- `components/home/HeroSection.vue`
- `components/products/FilterBar.vue`
- `components/products/ProductGrid.vue`
- `components/products/ProductCard.vue`
- `views/ProductDetailView.vue`
- `views/CartView.vue`
- `views/LoginView.vue`
- `components/layout/AppFooter.vue`

## 3. Architecture Summary

- **Routing**: Vue Router handles SPA navigation and dynamic detail pages.
- **State Management**: Pinia stores handle authentication and cart logic.
- **Persistence**: Auth token/user and cart lines are persisted in `localStorage`.
- **Typed Data Layer**: API logic is centralized in `src/lib/dummyJsonApi.ts`.
- **Type Safety**: Interfaces are located in `src/types` and reused across components/stores.
- **UI System**: Custom Tailwind theme + global CSS design tokens.

## 4. Run Instructions

```bash
npm install
npm run dev
```

## 5. Next Improvements

- Add unit tests for stores/composables
- Add pagination and query-string sync
- Add toast notifications for cart actions

