# RentalCar Frontend

The goal of this project is to build the frontend part of a web application for **RentalCar**, a company that provides car rental services.  
The application allows users to browse available cars, filter them by different criteria, view details of a selected vehicle, and submit a rental request.

---

## Features

- **Home Page**: Landing page with a banner and a call-to-action button to view the catalog.
- **Catalog Page**:
  - Displays all available cars.
  - Filtering by brand, price, and mileage (done on the backend).
  - Pagination with a "Load More" button.
  - Ability to add cars to favorites (persisted across page reloads).
- **Car Details Page**:
  - Detailed description of a selected car with photo.
  - Rental form with success notification after submission.
- **Favorites**: Cars added to favorites are stored globally and persist on refresh.
- **Global State**: Stores the list of cars, applied filters, and favorites.
- **Data Fetching**: Uses [RentalCar API](https://car-rental-api.goit.global/api-docs/).
- **Themes**: Light and dark mode with a toggle.
- **Internationalization (i18n)**:
  - English (default)
  - Ukrainian

---

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/) for navigation
- [Axios](https://axios-http.com/) for HTTP requests
- CSS Modules

---

## Project Routes

- `/` – Home page
- `/catalog` – Catalog page
- `/catalog/:id` – Car details page

---

## Installation & Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/mad-jules/car-rental.git
   cd car-rental
   ```

Install dependencies:
npm install

Run the development server:
npm run dev

Open in browser: http://localhost:5173

Deployment

The project is deployed on Vercel:
(https://rental-car-sand-six.vercel.app/)

Author
Developed by [mad-jules] (https://github.com/mad-jules)
