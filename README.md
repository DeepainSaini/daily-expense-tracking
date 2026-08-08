# Daily Expense Tracking

A full-stack daily expense tracking application built with Node.js, Express.js, MySQL, Sequelize, and JavaScript. The app helps users manage daily expenses, track spending history, download expense reports, access premium features, and reset passwords through email.

## Features

- User signup and login
- Password hashing with bcrypt
- JWT-based authentication
- Add daily expenses
- View paginated expense history
- Delete expenses
- Track total expense per user
- Premium membership support
- Cashfree payment integration
- Premium leaderboard based on total spending
- Download expenses as a file
- Upload expense reports to AWS S3
- View previously downloaded report links
- Forgot password and reset password flow
- Email support using Sendinblue/Brevo
- MySQL database with Sequelize ORM
- Static frontend pages served with Express

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime environment |
| Express.js | Backend server and routing |
| MySQL | Database |
| Sequelize | ORM for database models |
| JWT | Authentication |
| bcrypt | Password hashing |
| Cashfree PG | Payment gateway |
| AWS S3 | Expense report storage |
| Sendinblue/Brevo | Password reset emails |
| dotenv | Environment variable management |
| Winston | Logging |
| Nodemon | Development server |

## Project Structure

```txt
daily-expense-tracking/
├── app.js
├── controllers/
│   ├── userController.js
│   ├── expenseController.js
│   ├── paymentController.js
│   ├── premiumController.js
│   └── PasswordController.js
├── middlewares/
│   └── auth.js
├── models/
│   ├── users.js
│   ├── expenses.js
│   ├── payment.js
│   ├── fileUrl.js
│   ├── forgotPassRequests.js
│   └── index.js
├── routes/
│   ├── userRoutes.js
│   ├── expenseRoutes.js
│   ├── paymentRoutes.js
│   ├── premiumRoutes.js
│   └── passwordRoutes.js
├── services/
│   ├── cashfreeService.js
│   ├── s3Services.js
│   ├── emailServices.js
│   └── userServices.js
├── util/
│   ├── db-connection.js
│   └── logger.js
├── views/
├── public/
├── package.json
└── README.md
```

## Getting Started

Follow these steps to run the project locally.

## Prerequisites

Make sure you have installed:

- Node.js
- npm
- MySQL
- Git

## Installation

Clone the repository:

```bash
git clone https://github.com/DeepainSaini/daily-expense-tracking.git
```

Move into the project folder:

```bash
cd daily-expense-tracking
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory and add the following values:

```env
DB_NAME=your_database_name
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_DIALECT=mysql

JWT_KEY=your_jwt_secret_key

CASHFREE_API_ID=your_cashfree_api_id
CASHFREE_API_KEY=your_cashfree_api_key

bucket_name=your_s3_bucket_name
iam_user_key=your_aws_iam_access_key
iam_user_secret=your_aws_iam_secret_key

SENDINBLUE_API_KEY=your_sendinblue_or_brevo_api_key
```

## Database Setup

Create a MySQL database with the same name as `DB_NAME` in your `.env` file.

The app uses Sequelize and syncs models automatically when the server starts:

```js
db.sync({ force: false })
```

If you want to use Sequelize CLI migrations, you can run:

```bash
npx sequelize-cli db:migrate
```

## Run the Application

Start the development server using nodemon:

```bash
npm start
```

Or start the server normally:

```bash
npm run "start server"
```

The server runs on:

```txt
http://localhost:3000
```

## Scripts

| Command | Description |
|--------|-------------|
| `npm start` | Start the app using nodemon |
| `npm run "start server"` | Start the app using Node.js |
| `npm test` | Placeholder test command |

## API Routes

## User Routes

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| GET | `/signup` | Serve signup page | No |
| POST | `/signup` | Register a new user | No |
| GET | `/login` | Serve login page | No |
| POST | `/login` | Login user and return JWT token | No |
| GET | `/premiumStatus` | Check whether user is premium | Yes |
| GET | `/forgotPass` | Serve forgot password page | No |
| GET | `/expense/download` | Download expenses and upload report to S3 | Yes |

## Expense Routes

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| GET | `/expense` | Serve expense tracker page | No |
| POST | `/expense` | Add a new expense | Yes |
| GET | `/expense/data` | Get paginated expense data | Yes |
| DELETE | `/expense/:id` | Delete an expense | Yes |
| GET | `/expense/fileUrls` | Get downloaded expense report links | Yes |

## Payment Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/pay` | Create a Cashfree payment order |
| GET | `/payment-status/:orderId` | Check payment status and activate premium |
| POST | `/webhook/cashfree` | Handle Cashfree webhook updates |

## Premium Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/premium/showLeaderBoard` | Show leaderboard sorted by total expenses |

## Password Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/called/password/forgotpassword` | Send password reset email |
| GET | `/called/reset-password/:id` | Open reset password form |
| POST | `/called/reset-password/:uuid` | Reset user password |

## Authentication

Protected routes require a JWT token in the request header:

```txt
Authorization: your_jwt_token
```

The token is generated after successful login.

Example login response:

```json
{
  "message": "user found succcessfully",
  "token": "your_jwt_token"
}
```

## Expense Management

Users can add expenses with:

- Expense amount
- Description
- Category
- Optional note

When an expense is added, the user's `totalExpense` value is updated. When an expense is deleted, the amount is subtracted from the user's total.

Expense records are returned with pagination support using query parameters:

```txt
/expense/data?page=1&limit=5
```

## Premium Features

The application supports premium membership through Cashfree payments.

Premium users can access features such as:

- Leaderboard
- Expense downloads
- Previously downloaded expense file links

The leaderboard sorts users by their total expenses in descending order.

## Expense Report Downloads

Users can download their expense data. The app converts expenses into a JSON/text file and uploads it to AWS S3.

After upload, the S3 file URL is saved in the database so users can access previous downloads later.

## Password Reset Flow

The password reset feature works through email:

1. User submits their registered email.
2. A password reset request is created with a UUID.
3. A reset link is sent using Sendinblue/Brevo.
4. User opens the reset link.
5. User submits a new password.
6. The password is hashed and updated.
7. The reset request is marked inactive.

## Database Models

## User

Stores registered user information.

Main fields:

- `id`
- `name`
- `email`
- `password`
- `isPremium`
- `totalExpense`

## Expense

Stores user expense records.

Main fields:

- `id`
- `expense`
- `description`
- `category`
- `note`
- `userId`

## Payment

Stores Cashfree payment order details.

Main fields:

- `id`
- `orderId`
- `paymentSessionId`
- `orderAmount`
- `orderCurrency`
- `paymentStatus`
- `userId`

## FileUrl

Stores generated expense report URLs.

Main fields:

- `id`
- `fileurl`
- `userId`

## Forgot Password Request

Stores password reset requests.

Main fields:

- `id`
- `isactive`
- `userId`

## Model Relationships

- One user can have many expenses.
- One expense belongs to one user.
- One user can have many payments.
- One payment belongs to one user.
- One user can have many password reset requests.
- One password reset request belongs to one user.
- One user can have many downloaded file URLs.
- One file URL belongs to one user.

## Payment Integration

This project uses Cashfree PG in sandbox mode.

Payment flow:

1. User starts payment from the app.
2. Backend creates a Cashfree order.
3. Cashfree returns a `paymentSessionId`.
4. Payment status is checked using the order ID.
5. On successful payment, the user is marked as premium.

## AWS S3 Integration

AWS S3 is used to store downloaded expense reports.

The app uploads expense data to the configured S3 bucket and returns a public file URL.

## Email Integration

Sendinblue/Brevo is used for sending password reset emails.

The reset email contains a link like:

```txt
http://localhost:3000/called/reset-password/:id
```

## Future Improvements

- Add frontend screenshots
- Add dashboard charts for expense analytics
- Add monthly and yearly expense filters
- Add category-wise expense reports
- Add CSV/PDF export support
- Add better payment verification
- Add admin dashboard
- Add Docker setup
- Add automated tests
- Add deployment instructions
- Add input validation for all forms
- Add refresh token support
- Improve error handling and response consistency

## Author

**Deepain Saini**

GitHub: [DeepainSaini](https://github.com/DeepainSaini)

## License

This project is licensed under the ISC License.