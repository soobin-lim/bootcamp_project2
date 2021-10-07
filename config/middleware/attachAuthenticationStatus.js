// This is middleware for restrictng routes a user is not allowed to visit if not logged in

// save value and send it to handlebars

const attachAuthenticationStatus = (req, res, next) => {
  // If the user is logged in, continue with the request to the restricted route
  res.locals.isAuthenticated = req.isAuthenticated();   
  // 1. this passes isAuthenticated to all handlebars? Yes

  // how isAuthenticated is working in here? without require? coming from  passport.js?
  // res.loca
  
  res.locals.randomproperty = req.app.locals.uid;
  
  // res.locals.isAuthenticatedfb = req.isAuthenticatedfb();    // this occurs bad request 500
  // res.locals is accessible from handlebar? Yes

  next();
};

module.exports = attachAuthenticationStatus;


// Add anonymous login in this function


// req.app ->
// This property holds a reference to the instance of the Express application that is using the middleware.