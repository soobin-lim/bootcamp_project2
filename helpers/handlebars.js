var register = function (Handlebars) {    // All Handlebars are came into this helper in server.js already
  var helpers = {
    inc: function (value) {
      return parseInt(value);
    },
    foo: function (var1) {
      return var1;
    },
    strjson: function(object){
      return JSON.stringify(object);
    }
  };

  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    for (var prop in helpers) {
      Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
    return helpers;
  }

};

module.exports.register = register;       // to use register(Handlebars) function with Handlebar
module.exports.helpers = register(null);    // to register register function in server.js(in app.engine() as a helpers)