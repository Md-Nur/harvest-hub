# Harvest Hub

## Overview:

Harvest Hub is a platform dedicated to connecting those in need of food with generous donors willing to help. Our mission is to reduce hunger by facilitating easy and efficient food donations.

### Live site: [Harvest Hub](https://harvesthub-a10a8.web.app/)

## Features:

- **Authentication Options**: Sign up and log in using email-password, Google accounts, ensuring secure access and convenience for users.
<!-- - **Detailed Food Listings**: Explore comprehensive details about food items on dedicated pages, including images, descriptions, nutritional information, and availability status. -->
- **Search and Sort Functionality**: Easily find specific food items or refine results based on various criteria, enhancing user experience and efficiency.
  <!-- - **CRUD Operations**: Perform all essential CRUD (Create, Read, Update, Delete) operations seamlessly, allowing users to add new listings, edit existing ones, remove outdated items, and manage their inventory effectively. -->
  <!-- - **Private Routes Feature**: Utilize private routes to restrict access to certain pages or functionalities based on user authentication status, ensuring data security and privacy. -->
- **Cookie Usage**: Implement cookies to enhance user experience, such as remembering login sessions and preferences, providing a seamless and personalized browsing experience.

### Technologies Used

- **Frontend**: React.js for a dynamic and responsive user interface.
- **Backend**: Node.js and Express.js for a robust server-side framework.
- **Database**: MongoDB for flexible and scalable data management.
- **Hosting**: Firebase for secure and reliable cloud hosting.

### Getting Started

To run this project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Md-Nur/harvest-hub.git
   ```

2. **Setup Environment Variables**:

   - Navigate to the `client` directory and rename the `.env.sample` file to `.env`. Fill in the required environment variables.
   - Navigate to the `server` directory and rename the `.env.sample` file to `.env`. Fill in the required environment variables.

3. **Install Dependencies**:

   - For the client:
     ```bash
     cd harvest-hub/client
     npm install
     ```
   - For the server:
     ```bash
     cd ../server
     npm install
     ```

4. **Run the Application**:

   - For the client:
     ```bash
     cd ../client
     npm start
     ```
   - For the server:
     ```bash
     cd ../server
     npm start
     ```

5. **Access the Application**: Open your browser and navigate to `http://localhost:5173` for the client side and `http://localhost:3000` for the server side.
