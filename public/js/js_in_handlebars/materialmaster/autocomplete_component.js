document.querySelector("#autoComplete").addEventListener("navigate", function (event) {
  // "event.detail" carries the autoComplete.js "feedback" object
  console.log(event.detail);
});

function get_material_and_sap_material() {
  const app_url = 'http://localhost:3000/'
  const pathofdata = app_url+'api/materialmaster/getonlysapandkiamaterials';
  fetch(pathofdata)
    .then((r) => r.json())
    .then((data) => {
      console.log(data)
      autoCompleteJS.data.src = data;
    })
    .catch((e) => console.log('Booo'));
}

const autoCompleteJS = new autoComplete({
  key: "material",
  selector: "#autoComplete",
  placeHolder: "Material...",
  data: {
    src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"],  //get_material_and_sap_material(),     //  1. this.
    // keys:['sapmaterial'],                     // 2. and this
    cache: true,
  },
  resultsList: {
    element: (list, data) => {
      if (!data.results.length) {
        // Create "No Results" message element
        const message = document.createElement("div");
        // Add class to the created element
        message.setAttribute("class", "no_result");
        // Add message text content
        message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
        // Append message element to the results list
        list.prepend(message);
      }
    },
    noResults: true,
  },
  resultItem: {
    highlight: {
      render: true
    }
  }
});
