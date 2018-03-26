'use strict';   //indicate this a javascript code not typescript code

require('zone.js/dist/zone-node'); //node.js version of zone.js, angular use for change detection
require('reflect-metadata'); // handle metadata, the decorator attached to our javascript

const express = require('express');  //nodejs import syntax
const ngUniversal = require('@nguniversal/express-engine');  // help render page on server side
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist-server/main.bundle');

function angularRouter(req, res) {
  res.render('index', {req, res});
}

const app = express();

app.engine('html', ngUniversal.ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  provider: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));
app.set('view engine', 'html');
app.set('views', 'dist');

app.get('/', angularRouter);

app.use(express.static(`${__dirname}/dist`));

app.get('*', angularRouter);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

