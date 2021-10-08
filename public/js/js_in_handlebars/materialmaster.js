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


function doupload() {
    var input = document.getElementById("fileinput1");
    var formData = new FormData();
    formData.append('file', input.files[0]);
    formData.append('user', 'hubot');
    // let entry = document.getElementById("file").files[0];
    console.log('doupload' ,formData);
    fetch('http://localhost:3000/upload', {
      method:'POST',
      body: formData
    });   // + encodeURIComponent(entry.name)
    alert('your file has been uploaded');
    // location.reload();
};

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