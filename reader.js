var data = {
    x: -1,
    y: -1,
    duration: -1,
    stimulaName: ' '
};

function read(file){
  for (var i = 0; file.files.length >= i; i++){
      var reader = new FileReader();
      reader.onload = function(event){
           var fileContent = event.target.result;
          var lines = fileContent.split(/\n/);

          var fileHeaders = new Array();
          fileHeaders = lines[0].split(/\t/);

          var fileData = new Array();
          for (var i = 1; lines.length > i; i++) {
              var temp = lines[i].split(/\t/);
              if (temp != "") {
                  fileData[i - 1] = new Object();
                  fileData[i - 1].x = temp[3];
                  fileData[i - 1].y = temp[4];
                  fileData[i - 1].duration = temp[2];
                  fileData[i - 1].stimulaName = temp[5];
                  window.alert(temp[3]);
              }
          }
      };
    reader.readAsText(file.files[i]);
  }

}
