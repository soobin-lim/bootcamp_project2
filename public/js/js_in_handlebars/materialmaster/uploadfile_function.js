// upload kia material master file
// this function is linked directly in html<a  onlink="uploadfile()">
function uploadfile() {       // send POST request to upload a file(in input[type=file] in masterdata/materialmaster handlebars))
  var input = document.getElementById("fileinput1");
  var formData = new FormData();
  formData.append('file', input.files[0]);
  console.log(input.files[0]);
  // formData.append('user', 'hubot');  // user is not necessary
  // let entry = document.getElementById("file").files[0];
  console.log('js/js_in_handlebars/materialmaster/uploadfile.js : ', formData);
  const myurl = 'http://localhost:3000/upload';
  
  fetch(myurl, {
    method: 'POST',
    body: formData
  });   // + encodeURIComponent(entry.name)
  // alert('your file has been uploaded');
  alert('File has been uploaded successfully');
  location.reload();  
};