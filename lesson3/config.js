/*
 * Create and export configuration variable
 *
 */
// Container for all environments

const environments = {};

// staging (default) environment

environments.staging = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'envName': 'staging'
};

// Production object
environments.production = {
    'httpPort': 6000,
    'httpsPort': 6001,
    'envName': 'production'
};

let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ?
    process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default to staging
let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ?
    environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;