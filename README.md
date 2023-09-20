# Hotel Miranda Backend API

This is the backend API for Hotel Miranda, a hotel management system that provides various functionalities to manage hotel operations. The API is built using Express.js and utilizes SQL and MongoDB databases for data storage and retrieval.

Hotel Miranda Backend API serves as the bridge between the frontend application and the data storage, handling requests from the frontend and performing necessary operations on the databases to fulfill those requests. It provides a secure and efficient way to manage hotel-related data such as rooms, reservations, guests, and other hotel resources.

## Key Features

- **Room Management**: The API allows users to create, update, and delete rooms in the hotel. It provides endpoints to retrieve room details and availability information.

- **Reservation Management**: Hotel Miranda Backend API enables users to create, modify, and cancel reservations for rooms. It handles validation.


- **Staff Management**: Hotel staff can be managed through the API, allowing the creation, modification, and removal of staff members. It also provides endpoints to retrieve staff details and perform administrative tasks.

## Technologies Used

Hotel Miranda Backend API is developed using the following technologies:

- **Express.js**: A fast and minimalist web application framework for Node.js, used for building the API endpoints, handling requests, and managing routes.

- **SQL**: A relational database management system used to store structured data. It is employed to manage hotel-related information such as rooms, reservations, guests, and staff details.

- **MongoDB**: A NoSQL document database used for storing and retrieving unstructured or semi-structured data. MongoDB is utilized to handle data that does not fit well in a traditional SQL database schema.

Installation and Setup

To set up Hotel Miranda Backend API locally, follow these steps:    

   
1. Clone the repository from GitHub:

 ``` git clone  https://github.com/GrumpyArdias/miranda-backend ```

2. Install the project dependencies:

    ```bash cd hotel-miranda-backend
    npm install ```

3. Populate the database using the seeder

4. Run the API:

    ```bash npm run dev ```

The API should now be running locally on http://localhost:3000. You can send requests to the endpoints using tools like cURL or Postman.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.

## Acknowledgments

Hotel Miranda Backend API is built with the support and inspiration from various open-source projects and resources. We would like to express our gratitude to the developers and contributors of the following libraries and tools:

- Express.js
- SQL database
- MongoDB