// console.log('heroku url is ');

$(document).ready(function () {      // what's wrong?
  console.log('document ready - message from materialmaster.js');
  // assigning dynamically callback function to each btns
  $("button.kia_apply_btn").click(function () {
    var filename = $(this).attr("data-filename");
    console.log('filename:', filename);
    var formData = new FormData();
    formData.append('filename', filename);
    const myurl = 'http://localhost:3000/api/materialmaster/uploadkiamaterials';
    myurl = '';
    fetch(myurl, {
      method: 'POST',
      body: formData
    });
  });

  $("button.sap_apply_btn").click(function () {
    var filename = $(this).attr("data-filename");
    var formData = new FormData();
    formData.append('filename', filename);
    fetch('http://localhost:3000/api/materialmaster/uploadsapmaterials', {
      method: 'POST',
      body: formData
    });
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
