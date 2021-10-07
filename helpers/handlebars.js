var register = async function (Handlebars) {    // All Handlebars are came into this helper in server.js already
  var helpers = {
    decodedata: async function(object){
      var val = '';
      const myArray= [object];
      // console.log(typeof myArray[0][0] + 'myArrtype');  
      // console.log(myArray.length);    //1
      // console.log(myArray[0].length);   // 504
      // console.log(myArray[0][0]);
      // return JSON.stringify(myArray[0][0]);
      for (var i = 0; myArray[0].length-1; i++){
        console.log(i + ' --- ' + JSON.stringify(myArray[0][i].material));
        val += '<li>' + JSON.stringify(myArray[0][i].material) + '</li>';
      }
      return val;
    },

    getrows: function (rows) {
      return rows.forEach((row)=> getRow(row));
    },
    getRow: function (row) {
      return this.getMaterial(row);
    },
    strjson: function(object){
      return JSON.stringify(object);
    },
    getMaterial: function(object){
      return JSON.stringify(object.material);
    },
    getDescription: function(object){
      return JSON.stringify(object.description);
    },
    getPgn: function(object){
      return JSON.stringify(object.pgn);
    },
    getPgnDescription: function(object){
      return JSON.stringify(object.pgndescription);
    },
    getPac: function(object){
      return JSON.stringify(object.pac);
    },
    getCar: function(object){
      return JSON.stringify(object.standardpack);
    }
  };
// "material":"28791-F3000","description":"PNL-HEAT PROTECTOR FR","pgn":"P287","pgndescription":"PNL-HEAT PROTECTOR FR","pac":"3000","carmodel":"DL","standardpack":48

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