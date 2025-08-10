# TensorForce Backend

A clean architecture refactor of the TensorForce backend application.

## Architecture Overview

This application follows Clean Architecture principles with clear separation of concerns:

```
src/
├── config/           # Configuration management
│   └── database.js   # Database connection management
├── models/           # Database models and schemas
│   ├── UserDetails.js
│   └── ModelDetails.js
├── services/         # Business logic layer
│   ├── UserService.js
│   ├── ModelService.js
│   └── AlpacaService.js
├── controllers/      # HTTP request/response handling
│   ├── UserController.js
│   ├── ModelController.js
│   └── AlpacaController.js
├── routes/           # Route definitions
│   ├── userRoutes.js
│   ├── modelRoutes.js
│   └── alpacaRoutes.js
├── middleware/       # Custom middleware
│   └── errorHandler.js
├── utils/            # Utility functions
├── app.js           # Main application setup
└── index.js         # Application entry point
```

## Key Improvements

### 1. **Separation of Concerns**
- **Models**: Handle database schemas and data access
- **Services**: Contain business logic and data processing
- **Controllers**: Handle HTTP requests and responses
- **Routes**: Define API endpoints
- **Config**: Manage application configuration

### 2. **Design Patterns**
- **Singleton Pattern**: Database connections and services
- **Repository Pattern**: Data access through model classes
- **Service Layer Pattern**: Business logic encapsulation
- **MVC Pattern**: Clear separation between data, logic, and presentation

### 3. **Error Handling**
- Centralized error handling middleware
- Consistent error response format
- Proper HTTP status codes

### 4. **Code Quality**
- Modular and reusable components
- Clear naming conventions
- Consistent code structure
- Easy to test and maintain

### 5. **Security**
- Environment variables for sensitive data
- No hardcoded credentials
- Proper configuration management

## API Endpoints

### User Management
- `POST /api/createUser` - Create a new user
- `POST /api/authenticate` - Authenticate user
- `PUT /api/updateKeys` - Update API keys
- `GET /api/keys/:email` - Get user API keys
- `POST /api/add-transaction/:userId` - Add transaction

### Model Management
- `GET /api/models/fetchModelDetails` - Get all models
- `POST /api/models/add` - Add new model
- `POST /api/models/buyers/add/:model_id` - Add buyer to model
- `GET /api/models/buyers/:model_id` - Get model buyers

### Alpaca Integration
- `GET /fetchAlpacaData` - Get Alpaca account data
- `GET /news` - Get financial news

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Copy `env.example` to `.env` and configure the following variables:
   
   **Database Configuration:**
   - `CUSTOMERS_DATABASE_URI` - MongoDB URI for customers database
   - `MODELS_DATABASE_URI` - MongoDB URI for models database
   
   **Alpaca API Configuration:**
   - `ALPACA_KEY_ID` - Alpaca API key ID
   - `ALPACA_SECRET_KEY` - Alpaca API secret key
   
   **Alpaca News API Configuration:**
   - `APCA_API_KEY_ID` - Alpaca News API key ID
   - `APCA_API_SECRET_KEY` - Alpaca News API secret key
   
   **Server Configuration:**
   - `PORT` - Server port (default: 5000)
   - `NODE_ENV` - Environment (development/production)

3. Run the application:
   ```bash
   npm run dev  # Development mode
   npm start    # Production mode
   ```

## Database Connections

The application uses two separate MongoDB databases:
- **Customers Database**: User data, transactions, portfolios
- **Models Database**: AI model information and buyers

Database connections are managed centrally through the `DatabaseManager` class in `src/config/database.js`.

## Environment Variables

All sensitive configuration is managed through environment variables:

- **Database URIs**: No hardcoded database connection strings
- **API Keys**: All API credentials are externalized
- **Server Configuration**: Port and environment settings

## Future Enhancements

- Add input validation middleware
- Implement authentication middleware
- Add logging service
- Create unit tests
- Add API documentation with Swagger
- Implement rate limiting
- Add database migrations
