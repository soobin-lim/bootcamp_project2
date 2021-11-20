var register = function (Handlebars) {
  var helpers = {
    // put all of your helpers inside this object
    foo: function () {
      return "FOO";
    },
    bar: function () {
      return "BAR";
    },
    consolelogger: function (input) {
      // console.log(input)
      return "2"
    },
    getkiamaterialofgroup: function (groupsAndKiaMaterials, groupname) {
      // return groupsAndKiaMaterials[groupname];
      // console.log(groupsAndKiaMaterials[groupname]) => this stops the entire app
      // console.log(groupsAndKiaMaterials[groupname])

      // console.log(groupname)
      console.log('zzz'+groupsAndKiaMaterials+'kkk')  // undefined..
      console.log(groupname+'groupname')
      console.log(groupsAndKiaMaterials[groupname])
      // console.log(groupsAndKiaMaterials[groupname])
      return groupsAndKiaMaterials[groupname];
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
    },
    // in materialmaster.handlebar
    distributeDescriptionsForEachGroups: function (groupArray, descriptionArray) {
      groupArray.push("not belongs to")
      // console.log(groupArray)
      // console.log(descriptionArray)
      let resultArray = [];
      let resultArray2 = [];

      for (let k = 0; k <= groupArray.length - 1; k++) {
        var innerArray = []
        resultArray.push(innerArray)
        // resultArray2.push(innerArray)
      }

      // console.log('empty array setting :' + resultArray)

      while (descriptionArray.length != 0) {
        let startLength = descriptionArray.length;
        var row = []
        for (let i = 0; i <= groupArray.length - 2; i++) {
          for (let j = 0; j <= descriptionArray.length - 1; j++) {
            if (descriptionArray[j].includes(groupArray[i])) {
              resultArray[i].push(descriptionArray[j]);
              row[i] = descriptionArray[j];
              descriptionArray.splice(j, 1);
              j = j - 1;
              if (i == groupArray.length - 2) {
                resultArray[i + 1].push('');
                row[i + 1] = '';
                break;
              }
              break;
              // if description doesn't include group name, and 
            } else if (j == descriptionArray.length - 1) {
              resultArray[i].push('');
              row[i] = '';
              if (i == groupArray.length - 2) {
                resultArray[i + 1].push(descriptionArray[j]);
                row[i + 1] = descriptionArray[j];
                descriptionArray.splice(j, 1);
                j = j - 1;
                break;
              }
              break;
            }
          }
        }
        console.log('row' + row.length)
        resultArray2.push(row)
        let endLength = descriptionArray.length;
        if (startLength == endLength) {
          break;
        }
      }
      resultArray2.forEach(ele => {
        console.log(ele.length)
      })
      console.log(resultArray2)

      return resultArray2
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