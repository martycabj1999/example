import dotenv from 'dotenv';
dotenv.config();

//Backend
export const PORT_BACKEND = process.env.PORT_BACKEND
export const NODE_ENV = process.env.NODE_ENV
export const URL_BACKEND = process.env.URL_BACKEND

//MySqlConfig
export const MYSQL_HOST = process.env.MYSQL_HOST
export const MYSQL_PORT = process.env.MYSQL_PORT
export const MYSQL_USER = process.env.MYSQL_USER
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE
export const DBURL = `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}`;

//SMTPConfig
export const SMTP_HOST = process.env.SMTP_HOST
export const SMTP_PORT = process.env.SMTP_PORT
export const SMTP_SECURE = process.env.SMTP_SECURE
export const SMTP_REQUIRE_AUTH = process.env.SMTP_REQUIRE_AUTH
export const SMTP_USER = process.env.SMTP_USER
export const SMTP_PASS = process.env.SMTP_PASS
export const SUBJECT_MAIL = process.env.SUBJECT_MAIL

//AUTH CONFIG
export const JWT_SECRET = process.env.JWT_SECRET