module.exports = {
    apps: [{
        name: "api",
        script: "./index.js",
        interpreter: "./node_modules/babel-cli/bin/babel-node.js",
        env: {

            //BACKEND
            NODE_ENV: "development",
            PORT_BACKEND: 8000,
            URL_BACKEND: 'http://localhost:8000',

            //SQL
            MYSQL_HOST: 'localhost',
            MYSQL_PORT: 3306,
            MYSQL_USER: 'root',
            MYSQL_PASSWORD: '',
            MYSQL_DATABASE: 'test',

            //SMTP
            SMTP_HOST: 'smtp.gmail.com',
            SMTP_PORT: 465,
            SMTP_SECURE: true,
            SMTP_REQUIRE_AUTH: true,
            SMTP_USER: 'ACA VA EL MAIL',
            SMTP_PASS: 'ACA VA EL PASSWORD',
            SUBJECT_MAIL: 'Email de confirmacion',

            //JWT
            JWT_SECRET: 'djghhhhuuwiwuewieuwieuriwu',

        },
        env_test: {
            NODE_ENV: "test",
        },
        env_staging: {
            NODE_ENV: "staging",
        },
        env_production: {

            //BACKEND
            NODE_ENV: "production",
            PORT_BACKEND: 8000,
            URL_BACKEND: 'http://localhost:8000',

            //SQL
            MYSQL_HOST: 'localhost',
            MYSQL_PORT: 3306,
            MYSQL_USER: 'root',
            MYSQL_PASSWORD: '',
            MYSQL_DATABASE: 'test',

            //SMTP
            SMTP_HOST: 'smtp.gmail.com',
            SMTP_PORT: 465,
            SMTP_SECURE: true,
            SMTP_REQUIRE_AUTH: true,
            SMTP_USER: 'ACA VA EL MAIL',
            SMTP_PASS: 'ACA VA EL PASSWORD',
            SUBJECT_MAIL: 'Email de confirmacion',

            //JWT
            JWT_SECRET: 'djghhhhuuwiwuewieuwieuriwu',

        }
    }]
}