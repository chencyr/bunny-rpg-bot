const configs = require('../../configs/mysql');
const knex = require('knex');

const client = 'mysql';
const connections = configs.connections;
const exportsObject = {};

Object.keys(connections).forEach((name) => {
    const config = connections[name];
    exportsObject[name] = knex({
        client: client,
        connection: config,
    });
});

module.exports = exportsObject;