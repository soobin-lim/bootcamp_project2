exports.index = (req, res) => res.render('landing/index',
  {
    layout: 'main'
  },
);


// application controller
// ('/', first landing page)
// layout: main(Default Layout is defined in server.js)
// body in main layout : index