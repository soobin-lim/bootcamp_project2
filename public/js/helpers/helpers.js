var register = function (Handlebars) {
  var helpers = {
    // put all of your helpers inside this object
    foo: function () {
      return "FOO";
    },
    bar: function () {
      return "BAR";
    },
    // in materialmaster.handlebar
    filenamecheck: function (filename) {
      if (filename.includes('zppr')) {
        return true;
      } else {
        return false;
      }
    },
    // in materialmaster.handlebar
    getUniqueDescriptions: function (kiamaterials) {
      let descriptions = kiamaterials.map(kiamaterial => kiamaterial.description)
      let tmp = {}
      for (description of descriptions) {
        tmp[description] = 1;
      }
      let result;
      // return Object.keys(tmp);
      result = Object.keys(tmp).sort(function (a, b) {
        return a.localeCompare(b); //using String.prototype.localCompare()
      });
      // console.log(result)

      return result;

    }
  };

  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    // register helpers
    for (var prop in helpers) {
      Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
    // just return helpers object if we can't register helpers here
    return helpers;
  }

};

module.exports.register = register;
module.exports.helpers = register(null);