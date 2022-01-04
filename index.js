// CommonJS
const express = require('express');
const path = require('path');
const GameEngine = require('./core/game');
const Discord = require('./discord');
const { wakeDyno, wakeDynos } = require('heroku-keep-awake');

/**
 * Path defines & configs
 * @type {string}
 */
global.path = {app: path.resolve(__dirname)};
global.path.configs = global.path.app + '/configs';
global.path.controllers = global.path.app + '/controllers';
global.path.views = global.path.app + '/views';
global.path.routers = global.path.app + '/routers';
global.path.statics = global.path.app + '/statics';
global.path.sslVerification = global.path.app + '/ssl-verification';


/**
 * Express app define & configs
 * @type {app}
 */
const app = express();
app.set("view options", {layout: false});
app.set('views', global.path.views);
app.set('view engine', 'ejs');
console.info('Express: use static path at', global.path.statics);
app.use('/statics', express.static(global.path.statics));
app.use('/.well-known/pki-validation', express.static(global.path.sslVerification));

/**
 * Define DI container node.
 *
 * @type {{configs: {}, controllers: {}}}
 */
app.$container = {
    configs: {},
    controllers: {},
    models: {},
};

/**
 * Game engine loader.
 */
app.gameEngine = new GameEngine(app);
console.info(`Application: loaded GameEngine.`);

/**
 * Load module by application define/configs
 *
 * @param module {string} module name, should be define by global path.
 * @param type {string} module type
 * @param fileExtension {string} default .js
 * @return {any}
 */
app.moduleLoader = function(module, type, fileExtension) {

    if(!fileExtension) {
        fileExtension = '.js';
    }
    else {
        fileExtension = '';
    }

    if(!app.$container[type][module]) {
        const modulePath = `${global.path[type]}/${module}${fileExtension}`;
        app.$container[type][module] = require(modulePath);
        console.info(`Application: load ${type} [${module}] by path: ${modulePath}`);
    }

    return app.$container[type][module];
};

/**
 * Config loader
 *
 * @param module
 * @return {*}
 */
app.config = function(module) {
    const type = 'configs';
    return app.moduleLoader(module, type);
};

/**
 * Model loader
 * @param module
 * @return {*}
 */
app.model = function(module) {
    const type = 'models';
    return app.moduleLoader(module, type);
};

/**
 * Controller loader
 * @param module
 */
app.controller = function(module) {
    const type = 'controllers';
    const Class = app.moduleLoader(module, type);
    const instance = new Class(app);
    const handler = {
        get: function(target, name) {
            return function (req, res, next) {
                return target[name](req, res, next);
            }
        }
    };

    return new Proxy(instance, handler);
};

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
app.use(requireHTTPS);

const router = require(global.path.routers + '/index.js');
router(app);


const config = app.config('app');
const DYNO_URL = `https://${config.host}`;

app.listen(process.env.PORT || 3000, () => {
    wakeDyno(DYNO_URL, {
        interval: config.heartbeat, logging: true,
        stopTimes: { start: config.sleepStart, end: config.sleepEnd }
    });
});


Discord(app, require(global.path.app + '/core/events/event-factory/discord-factory'));