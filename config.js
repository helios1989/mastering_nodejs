/*
 * Create and export configuration variable
 *
 */
// Container for all environments

const environments = {};

// staging (default) environment

environments.staging = {
    'port': 3000,
    'envname': 'staging'
};

// Production object
environments.production = {
    'port': 6000,
    'envname': 'production'
};

let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ?
    process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default to staging
let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ?
    environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;