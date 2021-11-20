
// auto complete
document.addEventListener('DOMContentLoaded', async function () {

  get_material_and_sap_material();
  async function get_material_and_sap_material() {
    const myPromise = new Promise(async (resolve, reject) => {
      let data = await fetch('/api/materialmaster/getonlysapandkiamaterials', {
        method: 'GET',
      })
      data = data.json();
      // console.log('-----get_material_and_sap_material------' + data);
      resolve(data);
    })
    let merged_kia_null = {}
    let merged_sap_null = {}
    myPromise.then(
      //handleResolve
      (data) => { // data : received data (material, sapmaterial)
        data.forEach(data => {
          if (data.material) {
            merged_kia_null[data.material] = null;
          }
          if (data.sapmaterial) {
            merged_sap_null[data.sapmaterial] = null;
          }
        })
        // data = JSON.stringify(data);
        var kia_master_elem = document.querySelector('.autocomplete_kia_master');
        var sap_master_elem = document.querySelector('.autocomplete_sap_master');

        var sap_master_instance = M.Autocomplete.init(sap_master_elem, {
          data: merged_sap_null,
          limit: 5,
          onAutocomplete: (selected) => {
            // console.log('onAutocomplete:' + selected) // selected sapmaterial
            data.every(async (data) => {  // data : received data (material, sapmaterial)
              if (data.sapmaterial == selected) {
                // console.log(data.material)
                getDescription(data.material);

                kia_master_elem.focus();
                kia_master_elem.value = data.material
                sap_master_elem.focus();

                return false;
              }
              return true
            })
          },
        })

        var kia_master_instance = M.Autocomplete.init(kia_master_elem, {
          data: merged_kia_null,
          limit: 5,
          onAutocomplete: (selected) => {
            // console.log('onAutocomplete:' + selected) // selected sapmaterial
            data.every(data => {  // data : received data (material, sapmaterial)
              if (data.material == selected) {
                // console.log(data.material)
                getDescription(data.material);

                sap_master_elem.focus();
                sap_master_elem.value = data.sapmaterial
                kia_master_elem.focus();

                return false;
              }
              return true
            })

          },
        })

      },
      //handleReject
      () => {
        console.log('data reading for autocomplete is failed')
      }
    )


  }

  async function getDescription(material) {
    // console.log('finding description')
    var description_textarea = document.querySelector('#textarea1');
    // console.log(description_textarea)
    var description = '';
    const myPromise = new Promise(async (resolve, reject) => {
      description = await fetch('/api/materialmaster/getdescription/' + material,
        {
          method: 'GET'
        }).then(response => response.text())
        .then(text => {
          try {
            description = JSON.parse(text);
            // console.log(description)

            resolve(description);
          } catch (err) {
            console.log(err);
          }
        })
    })

    myPromise.then(
      //handleResolved
      () => {
        // console.log(description)
        description_textarea.value = description["description"]
      },
      //handleRejected
      (err) => {
        console.log(err)
      }
    ).catch(err => console.log(err))
      .finally(() => {
        // console.log(data)
      }
      )
    return;
  }
});


