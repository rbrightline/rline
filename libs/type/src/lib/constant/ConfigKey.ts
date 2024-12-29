/**
 * Commonly used configuration keys
 */
/**
 * Enum representing configuration keys used in the application.
 * These keys are used to access various configuration values.
 *
 * @enum {string}
 * @property {string} VERSION - The version of the application.
 * @property {string} APP_NAME - The name of the application.
 * @property {string} APP_DESCRIPTION - A description of the application.
 * @property {string} DOMAIN - The domain name of the application.
 * @property {string} PREFIX - The prefix used in the application's routing.
 * @property {string} PORT - The port number on which the application runs.
 * @property {string} LOG_LEVEL - The logging level used in the application.
 * @property {string} JWT_SECRET - The secret key used for JWT authentication.
 * @property {string} DB_NAME - The name of the database.
 * @property {string} DB_USERNAME - The username for the database.
 * @property {string} DB_PASSWORD - The password for the database.
 */
export enum ConfigKey {
  VERSION = 'VERSION',

  APP_NAME = 'APP_NAME',
  APP_DESCRIPTION = 'APP_DESCRIPTION',

  DOMAIN = 'DOMAIN',
  PREFIX = 'PREFIX',
  PORT = 'PORT',

  LOG_LEVEL = 'LOG_LEVEL',

  JWT_SECRET = 'JWT_SECRET',

  DB_NAME = 'DB_NAME',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
}
