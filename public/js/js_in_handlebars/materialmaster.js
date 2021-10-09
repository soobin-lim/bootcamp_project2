// $(document).ready(() => {
  // const inputElement = $("input[name='avatar']")
  // console.log('document is ready');
  // console.log();
  // $("#uploadkia").click(function(req, res) {
  //   let data = $("input[name='avatar']").files[0];

  //   console.log('input is clicked');
  //   $.post("/upload");
  // })
// })

// upload kia material master file
// this function is linked directly in html<a  onlink="uploadfile()">
function uploadfile() {       // send POST request to upload a file(in input[type=file] in masterdata/materialmaster handlebars))
    var input = document.getElementById("fileinput1");
    var formData = new FormData();
    formData.append('file', input.files[0]);
    // formData.append('user', 'hubot');  // user is not necessary
    // let entry = document.getElementById("file").files[0];
    console.log('js/js_in_handlebars/materialmaster/uploadfile.js : ' ,formData);
    fetch('http://localhost:3000/upload', {
      method:'POST',
      body: formData
    });   // + encodeURIComponent(entry.name)
    alert('your file has been uploaded');
    location.reload();
};


$(document).ready(function() {      // what's wrong?
  console.log('document ready - message from materialmaster.js');
  // assigning dynamically callback function to each btns
  $("button.kia_apply_btn").click(function() {      
      var filename = $(this).attr("data-filename");
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


// function AnonymousHandler(){
//   console.log('public/js/login - anonymous handler ');
//   $.get("/users/anonymous", function(data){
//     alert(data);
//   })
//   .then((data) => { 
//     // console.log('public/js/login - anonymousHandler.post.then(data) : ', data);
    
//     window.location.replace('/')
//   })
//   .catch(err => $("#password-feedback").text("Anonymous login failed"));
// }