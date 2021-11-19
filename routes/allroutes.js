module.exports = app => {

	const landing_page = require('./landing_page');
	const materialmaster = require('./materialmaster');
	const dailyproduction = require('./dailyproduction');
	const inventory = require('./inventory');
	const timecontrol = require('./timecontrol');
	const login = require('./login');
	
	const api = require('./controllers/api');

	app.use('/', landing_page);		
	app.use('/dailyproduction', dailyproduction);
	app.use('/inventory', inventory);
	app.use('/timecontrol', timecontrol);
	app.use('/materialmaster', materialmaster);
	app.use('/login', login);
	
	app.use('/api', api);
}

