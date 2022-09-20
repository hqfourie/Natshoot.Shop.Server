const dotenv = require('dotenv')
const fs = require('fs');

let ENV_FILE_NAME = '';
switch (process.env.NODE_ENV) {
  case 'production':
    ENV_FILE_NAME = '.env.production';
    break;
  case 'staging':
    ENV_FILE_NAME = '.env.staging';
    break;
  case 'test':
    ENV_FILE_NAME = '.env.test';
    break;
  case 'development':
  default:
    ENV_FILE_NAME = '.env';
    break;
}

try {
  dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });
} catch (e) {
}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;

// Database URL (here we use a local database called medusa-development)
// const DATABASE_URL = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
const DATABASE_URL = `postgresql://doadmin:AVNS_lwShJwiYF247MPOYURL@app-7058760e-5b2c-4e0e-8ee9-ad8613d226bd-do-user-12260352-0.b.db.ondigitalocean.com:25060/defaultdb?sslmode=require&ssl=true`;


console.log(DATABASE_URL);

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

const JWT_SECRET = process.env.JWT_SECRET || "cbb5b837-e500-4050-9e5d-a22543f775c";
const COOKIE_SECRET = process.env.COOKIE_SECRET || "5c748121-caf4-42d5-9e3b-39c276239f0a";

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  // Uncomment to add Stripe support.
  // You can create a Stripe account via: https://stripe.com
  // {
  //   resolve: `medusa-payment-stripe`,
  //   options: {
  //     api_key: STRIPE_API_KEY,
  //     webhook_secret: STRIPE_WEBHOOK_SECRET,
  //   },
  // },
];

module.exports = {
  projectConfig: {
    // redis_url: REDIS_URL,
    database_type: "postgres",
    database_url: DATABASE_URL,
    database_logging: true,
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    jwt_secret: JWT_SECRET,
    cookie_secret: COOKIE_SECRET,
    database_extra: {
      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("natshootdb.crt").toString(),
      }
    },
    plugins,
  }
};

// console.log('READ FILE START')

// console.log(fs.readFileSync("natshootdb.crt", { encoding: 'utf8', flag: 'r' }))

// console.log('READ FILE END')