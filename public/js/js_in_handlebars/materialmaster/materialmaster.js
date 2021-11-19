// file upload, 
document.addEventListener('DOMContentLoaded', function () {

  // assigning dynamically callback function to each btns
  $("button.kia_apply_btn").click(async function () {
    var filename = $(this).attr("data-filename");
    console.log('filename:', filename);
    const response = await fetch('/api/materialmaster/uploadkiamaterials', {
      method: 'POST',
      body: JSON.stringify({ filename }),
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(response.url, response.ok)
  });

  //sync sap
  $("button.apply_btn").click(async function () {
    var filename = $(this).attr("data-filename");
    console.log('filename:', filename);
    const response = await fetch('/api/materialmaster/uploadmasters', {
      method: 'POST',
      body: JSON.stringify({ filename }),
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(response.url, response.ok)
  });

  /* input event listener */
  document.getElementById("fileinput1").addEventListener('change', function () {
    var selected = document.getElementById("fileinput1").files.length > 0;
    if (selected) {
      document.getElementById("uploadkia").setAttribute('class', "btn-floating btn-large waves-effect waves-light red")
    } else {
      document.getElementById("uploadkia").setAttribute('class', "btn-floating btn-large waves-effect waves-light red")
    }
  });

 

});
