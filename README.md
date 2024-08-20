# Project Title
## Blogify
----Project Description----
Blogify is a blogging platform where users can create, view, and manage blog posts. The application is built using Node.js with Express.js as the backend framework and MongoDB as the database to store blog data. The platform features user authentication, blog management, and a homepage that displays all blogs along with a highlighted top blog based on the number of likes.
 
# Features Implemented
## Frontend
Frontend Features
1.Responsive Design:

  The frontend is designed to be responsive, ensuring that the platform looks and functions well on various screen sizes, including desktops, tablets, and mobile devices.
  Homepage Layout:

2.Blog Listings: The homepage features a list of all available blogs, each displayed with a title, excerpt, author name, publication date, and a "Read More" link.
  Top Blog Highlight: A special section on the homepage highlights the "Top Blog" based on the number of likes, giving it prominent visibility.
  Navigation Bar:

  A fixed or sticky navigation bar at the top of the page provides easy access to different sections of the platform, such as Home, Blogs, and User Account. The navbar also includes a search bar and links for user login and registration.
3.Blog Detail Page:

  Each blog has its own dedicated page, displaying the full content of the blog, including title, author, date of publication, and the number of likes.
4. Comment Section: Users can view and add comments on the blog post. This section is responsive and easy to navigate.
  User Authentication UI:

5.Login and Registration Forms: Simple, clean, and intuitive forms for users to log in or register. These forms are accessible via modal pop-ups or dedicated pages.
6.User Profile: Authenticated users have access to their profile page where they can view and manage their blogs, update their information, and log out.
7.Blog Management:

8.Create/Edit Blog Interface: A user-friendly form where users can create new blog posts or edit existing ones. The form includes fields for title, content, tags, and the option to upload images.
9.Drafts and Previews: Users can save their blogs as drafts and preview them before publishing.
10.Like System:

Users can like blog posts directly from the homepage or the blog detail page. The number of likes is dynamically updated and displayed next to each blog.
11.Search and Filter:

  A search bar allows users to search for blogs by title, content, or author.
  Filters are available to sort blogs by categories, tags, popularity, or recent posts.
12.Pagination:

  Blogs are displayed with pagination to ensure that the homepage and blog list pages load efficiently, with options to navigate between pages.
13.Interactive UI Elements:

  Hover Effects: Subtle hover effects on buttons, links, and images enhance the user experience.
  Modal Pop-ups: Used for login, registration, and confirmation dialogs.
  Loading Indicators: Displayed when data is being fetched or processed, improving user feedback.
14.Dark/Light Mode Toggle:

Users can switch between dark and light themes, with the mode being preserved across sessions using cookies or local storage.
Footer:

The footer includes links to important sections, social media links, and copyright information. It remains consistent across all pages.
## Backend
Backend Features
User Authentication and Authorization:

1.JWT-Based Authentication: The backend uses JSON Web Tokens (JWT) to authenticate users. Tokens are stored in cookies and are checked on each request to secure routes that require user authentication.
  Middleware for Authentication: A custom middleware, checkForAuthenticationCookie, is implemented to verify the user's JWT and attach the user information to the request object (req.user).
  Role-Based Access Control: Depending on the user's role (e.g., admin, author, reader), different levels of access and permissions can be enforced.
2.MongoDB Integration:

  Mongoose Models: The application uses Mongoose to define and manage data models for users, blogs, and other entities. Schemas include fields, data types, validation rules, and relationships between entities.
  Database Operations: CRUD operations are implemented for managing users and blogs. Mongoose queries are used to interact with the MongoDB database to create, read, update, and delete documents.
3.Routing and Controllers:

  Modular Route Structure: The backend is organized into separate routes, such as /user for user-related operations and /blog for blog-related operations. This modular approach improves maintainability.
  Controllers: Controllers handle the business logic for each route. They process incoming requests, interact with the database, and send responses back to the client.
    RESTful API Design: The backend follows REST principles, providing clear and consistent endpoints for various operations (e.g., GET /blog, POST /blog, PUT /blog/:id, DELETE /blog/:id).
4.Blog Management:

  Create, Edit, and Delete Blogs: Authenticated users can create new blog posts, edit existing ones, and delete blogs. The backend ensures that only the author of a blog or an admin can modify or delete it.
  Like System: Users can like or unlike a blog post. The backend manages the like count and ensures that a user can only like a blog once.
5.Comment Management:

  Commenting System: Users can add, edit, and delete comments on blog posts. Comments are associated with specific blogs and users, and the backend manages these relationships.
  Comment Moderation: Admins have the ability to moderate comments, including approving, editing, or deleting inappropriate comments.
6.Top Blog Feature:

  Dynamic Sorting and Ranking: The backend calculates the "Top Blog" by sorting blogs based on the number of likes. The top blog is highlighted on the homepage.
  Caching Mechanism: To improve performance, the top blog data might be cached and updated periodically, reducing the need for frequent database queries.
7.User Profile Management:
  Profile Editing: Users can update their profile information, including username, email, and password. Password changes are securely handled using hashing (e.g., bcrypt).
  User Dashboard: The backend provides data for a user dashboard where users can view and manage their blogs, comments, and account settings.
  Middleware:

  Cookie Parsing: The cookieParser middleware is used to parse cookies attached to client requests, enabling the backend to handle session data and authentication tokens.
  Error Handling: Global error handling middleware catches and processes errors, sending appropriate HTTP status codes and error messages to the client.
  Request Parsing: The backend uses express.urlencoded({ extended: false }) to parse incoming form data, ensuring that it is easily accessible in route handlers.
8.Static File Serving:

  Serving Static Assets: The backend serves static files (e.g., CSS, JavaScript, images) from the public directory. This is essential for rendering the frontend components of the application.
  EJS Templating:

  Dynamic HTML Rendering: The backend uses EJS (Embedded JavaScript) as the templating engine to render dynamic HTML pages. It passes data (e.g., user info, blogs) to EJS templates, which generate the final HTML sent to the client.
  View Management: Views are organized in the views directory, and the backend dynamically renders pages like the homepage, blog details, user profiles, etc.
9.Security Features:

  Input Validation and Sanitization: The backend includes validation and sanitization for user inputs to prevent security issues like SQL injection and XSS attacks.
  Password Hashing: User passwords are hashed before being stored in the database using a secure hashing algorithm (e.g., bcrypt), ensuring that passwords are not stored in plain text.
  Rate Limiting: To prevent abuse, the backend can implement rate limiting for API endpoints, protecting against brute-force attacks and ensuring fair usage.
10.Session Management:

Session Persistence: The backend can manage user sessions using cookies or sessions stored in the database, ensuring that users remain logged in across different requests.
11.Logging and Monitoring:

Activity Logging: The backend logs important actions and errors, providing insights for debugging and monitoring application health.
Request Logging: Middleware like morgan can be used to log HTTP requests, aiding in traffic analysis and issue diagnosis.

# Technologies/Libraries/Packages Used
## Backend Technologies and Libraries
1.Node.js:

JavaScript runtime environment that allows you to run JavaScript code on the server.
2.Express.js:

A web application framework for Node.js, used for building the server-side of the application. It simplifies the creation of web servers and APIs.
3.MongoDB:

A NoSQL database used for storing blog posts, user information, comments, and other data. It provides flexibility with its document-based structure.
4.Mongoose:

An Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model your data and includes built-in data validation and querying features.
EJS (Embedded JavaScript):

A templating engine used to generate HTML with embedded JavaScript. It allows for dynamic content rendering on the server-side.
5.JSON Web Tokens (JWT):

A compact, URL-safe means of representing claims to be transferred between two parties. Used for user authentication in the form of tokens that are signed and stored in cookies.
6.cookie-parser:

A middleware for parsing cookies attached to the client request object. It helps in managing authentication tokens and other session-related data.
7.bcrypt:

A library for hashing passwords before storing them in the database, ensuring that user passwords are stored securely.
8.dotenv:

A module for loading environment variables from a .env file into process.env, making it easier to manage configuration settings like database connections, API keys, and other environment-specific data.
9.body-parser (integrated in Express):

Middleware to parse incoming request bodies, especially for form data submitted via POST requests.
10.nodemon:

A development tool that automatically restarts the Node.js server whenever file changes are detected, improving the development workflow.
## Frontend Technologies and Libraries
1.HTML5:

The standard markup language for creating web pages. Used for structuring the content on the client-side.
2.CSS3:

A stylesheet language used for describing the presentation of a document written in HTML. It is used to style the frontend, including layouts, colors, fonts, and responsive design.

# Local Setup
  `git clone https://github.com/MouryaVardhan04/blogify.git`


# Team Members
Chanikya Challa - 2023IMG015
B.Mourya Vardhan Rathod - 2023BCS015
