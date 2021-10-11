console.log('heroku url is ',global.heroku_url);

$(document).ready(function() {      // what's wrong?
  console.log('document ready - message from materialmaster.js');
  // assigning dynamically callback function to each btns
  $("button.kia_apply_btn").click(function() {      
      var filename = $(this).attr("data-filename");
      console.log('filename:', filename);
      var formData = new FormData();
      formData.append('filename', filename);
      fetch('http://localhost:3000/api/materialmaster/uploadkiamaterials',{
        method:'POST',
        body: formData
      });
  });

  $("button.sap_apply_btn").click(function() {      
    var filename = $(this).attr("data-filename");
    var formData = new FormData();
    formData.append('filename', filename);
    fetch('http://localhost:3000/api/materialmaster/uploadsapmaterials',{
      method:'POST',
      body: formData
    });
});
});
