const checkIfAuthenticated = require('./config/middleware/checkIfAuthenticated');		
// checkIfAuthenticated is a middleware, it can be used in all routes (dailyproduction, inventory, timecontrol, materialmaster)

module.exports = app => {

		const application = require('./routes/application');
		const users = require('./routes/users');
		const trips = require('./routes/trips');
		const pricing = require('./routes/pricing');
		// add my pages
		const dailyproduction = require('./routes/dailyproduction');
		const inventory = require('./routes/inventory');
		const timecontrol = require('./routes/timecontrol');
		const materialmaster = require('./routes/materialmaster');

		app.use('/', application);
		app.use('/users', users);
		app.use('/trips', trips);
		app.use('/pricing', pricing);
		//add
		app.use('/dailyproduction', checkIfAuthenticated,  dailyproduction);
		app.use('/inventory', inventory);
		app.use('/timecontrol', timecontrol);
		app.use('/materialmaster', materialmaster);
    //other routes..
}
