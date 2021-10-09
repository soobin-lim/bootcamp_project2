module.exports = app => {

	const landing_page = require('./landing_page');
	const materialmaster = require('./menu1materialmaster');
	const dailyproduction = require('./menu2dailyproduction');
	const inventory = require('./menu3inventory');
	const timecontrol = require('./menu4timecontrol');
	const login = require('./menu5login');
	
	const api = require('./controllers/api');

	app.use('/', landing_page);		
	app.use('/dailyproduction', dailyproduction);
	app.use('/inventory', inventory);
	app.use('/timecontrol', timecontrol);
	app.use('/materialmaster', materialmaster);
	app.use('/login', login);
	
	app.use('/api', api);
}

