var data = {
    x: -1,
    y: -1,
    duration: -1,
    stimuliName: ' ',
    partID: -1
};

var fileData_Autistic = new Array();
var fileData_Control = new Array();
var counter_control = 0;
var counter_autistic = 0;
var ID_finder = 1;

function read(file_autistic, file_control){
  console.log("RUN");
  var C_Data = 0;
  var stimuli_name = document.getElementById("stimuli").value;
  var model_name = document.getElementById("model").value;

  if(file_control.files.length == 0){
    file = file_autistic;
    C_Data = 0;
  }
  else{
    file = file_control;
    C_Data = 1;
  }

  for (var z = 0; file.files.length > z; z++){
    var Part_finder = -1;
    var Part_index = -1;
    var reader = new FileReader();

    reader.onload = function(event){
      if(C_Data){
        counter_control = counter_control + 1;
      }
      else{
        counter_autistic = counter_autistic + 1;
      }
      var fileContent = event.target.result;
      var lines = fileContent.split(/\n/);

      var fileHeaders = new Array();
      fileHeaders = lines[0].split(/\t/);
      
      var tmp = -1;
      for (var i = 1; lines.length > i; i++){

        var test = 1;
        var temp = lines[i].split(/\t/);
        if ((temp != "") & (temp[5].length > 11)) {
          
          if(lines.length - 1 == i){
            temp[5] = temp[5].substr(1, temp[5].length - 1);
          }
          else{
            temp[5] = temp[5].substr(1, temp[5].length - 2);
          }

          var position = temp[5].search("http");
          temp[5] = temp[5].substr(position, temp[5].length);
          position = stimuli_name === temp[5];

          if (position){
            ID_finder = 0;
            Part_finder = 0;

            if(C_Data){
              for (var j = 0; fileData_Control.length > j; j++){
                if (fileData_Control[j][0] === model_name){
                  for(var a = 0; a < fileData_Control[j][1].length; a++){
                    var str = "Participant" + counter_control;
                    if(fileData_Control[j][1][a][0] === str){
                      Part_finder = 1;
                      Part_index = a;
                    }
                  }
                  if(Part_finder == 1){
                    tmp = fileData_Control[j][1][Part_index][1].length;
                    fileData_Control[j][1][Part_index][1][tmp] = new Object();
                    fileData_Control[j][1][Part_index][1][tmp].x = temp[3];
                    fileData_Control[j][1][Part_index][1][tmp].y = temp[4];
                    fileData_Control[j][1][Part_index][1][tmp].duration = temp[2];
                    fileData_Control[j][1][Part_index][1][tmp].stimuliName = temp[5];
                    fileData_Control[j][1][Part_index][1][tmp].partID = counter_control;
                    test = 0;
                  }
                  else{
                    tmp = fileData_Control[j][1].length;
                    fileData_Control[j][1][tmp] = new Array();
                    fileData_Control[j][1][tmp][0] = "Participant" + counter_control;
                    fileData_Control[j][1][tmp][1] = new Array();
                    fileData_Control[j][1][tmp][1][0] = new Object();
                    fileData_Control[j][1][tmp][1][0].x = temp[3];
                    fileData_Control[j][1][tmp][1][0].y = temp[4];
                    fileData_Control[j][1][tmp][1][0].duration = temp[2];
                    fileData_Control[j][1][tmp][1][0].stimuliName = temp[5];
                    fileData_Control[j][1][tmp][1][0].partID = counter_control;
                    test = 0;
                  }
                }
              }
              if (test == 1){
                tmp = fileData_Control.length;
                fileData_Control[tmp] = new Array();
                fileData_Control[tmp][0] = model_name;
                fileData_Control[tmp][1] = new Array();
                fileData_Control[tmp][1][0] = new Array();
                fileData_Control[tmp][1][0][0] = "Participant" + counter_control;
                fileData_Control[tmp][1][0][1] = new Array();
                fileData_Control[tmp][1][0][1][0] = new Object();
                fileData_Control[tmp][1][0][1][0].x = temp[3];
                fileData_Control[tmp][1][0][1][0].y = temp[4];
                fileData_Control[tmp][1][0][1][0].duration = temp[2];
                fileData_Control[tmp][1][0][1][0].stimuliName = temp[5];
                fileData_Control[tmp][1][0][1][0].partID = counter_control;
              }
            }
            else{
              for (var j = 0; fileData_Autistic.length > j; j++){
                if (fileData_Autistic[j][0] === model_name){
                  for(var a = 0; a < fileData_Autistic[j][1].length; a++){
                    var str = "Participant" + counter_autistic;
                    if(fileData_Autistic[j][1][a][0] === str){
                      Part_finder = 1;
                      Part_index = a;
                    }
                  }
                  if(Part_finder == 1){
                    tmp = fileData_Autistic[j][1][Part_index][1].length;
                    fileData_Autistic[j][1][Part_index][1][tmp] = new Object();
                    fileData_Autistic[j][1][Part_index][1][tmp].x = temp[3];
                    fileData_Autistic[j][1][Part_index][1][tmp].y = temp[4];
                    fileData_Autistic[j][1][Part_index][1][tmp].duration = temp[2];
                    fileData_Autistic[j][1][Part_index][1][tmp].stimuliName = temp[5];
                    fileData_Autistic[j][1][Part_index][1][tmp].partID = counter_autistic;
                    test = 0;
                  }
                  else{
                    tmp = fileData_Autistic[j][1].length;
                    fileData_Autistic[j][1][tmp] = new Array();
                    fileData_Autistic[j][1][tmp][0] = "Participant" + counter_autistic;
                    fileData_Autistic[j][1][tmp][1] = new Array();
                    fileData_Autistic[j][1][tmp][1][0] = new Object();
                    fileData_Autistic[j][1][tmp][1][0].x = temp[3];
                    fileData_Autistic[j][1][tmp][1][0].y = temp[4];
                    fileData_Autistic[j][1][tmp][1][0].duration = temp[2];
                    fileData_Autistic[j][1][tmp][1][0].stimuliName = temp[5];
                    fileData_Autistic[j][1][tmp][1][0].partID = counter_autistic;
                    test = 0;
                  }
                }
              }

              if (test == 1){
                tmp = fileData_Autistic.length;
                fileData_Autistic[tmp] = new Array();
                fileData_Autistic[tmp][0] = model_name;
                fileData_Autistic[tmp][1] = new Array();
                fileData_Autistic[tmp][1][0] = new Array();
                fileData_Autistic[tmp][1][0][0] = "Participant" + counter_autistic;
                fileData_Autistic[tmp][1][0][1] = new Array();
                fileData_Autistic[tmp][1][0][1][0] = new Object();
                fileData_Autistic[tmp][1][0][1][0].x = temp[3];
                fileData_Autistic[tmp][1][0][1][0].y = temp[4];
                fileData_Autistic[tmp][1][0][1][0].duration = temp[2];
                fileData_Autistic[tmp][1][0][1][0].stimuliName = temp[5];
                fileData_Autistic[tmp][1][0][1][0].partID = counter_autistic;
              }
            }
          }
        }
      }
      if(ID_finder === 1){
        if(C_Data){
          counter_control = counter_control - 1;
        }
        else{
          counter_autistic = counter_autistic - 1;
        }
      }
      ID_finder = 1;

      console.log("AUTISTIC:")
      for (var n = 0; fileData_Autistic.length > n; n++){
        for (var p = 0; fileData_Autistic[n][1].length > p; p++){
            for (var v = 0; fileData_Autistic[n][1][p][1].length > v; v++){
              console.log("Model Name: " + fileData_Autistic[n][0] + "\nFor " + "Model Array:Participant Array:ObjectArray: " + n + p + v +  "\nID: " + fileData_Autistic[n][1][p][0] +  " Stimuli Name: " + fileData_Autistic[n][1][p][1][v].stimuliName + " x: " + fileData_Autistic[n][1][p][1][v].x + " y: " + fileData_Autistic[n][1][p][1][v].y + " duration: " + fileData_Autistic[n][1][p][1][v].duration + " ID: " + fileData_Autistic[n][1][p][1][v].partID);
            }
          }
      }
      console.log("CONTROL:")
      for (var n = 0; fileData_Control.length > n; n++){
        for (var p = 0; fileData_Control[n][1].length > p; p++){
            for (var v = 0; fileData_Control[n][1][p][1].length > v; v++){
              console.log("Model Name: " + fileData_Control[n][0] + "\nFor " + "Model Array:Participant Array:ObjectArray: " + n + p + v +  "\nID: " + fileData_Control[n][1][p][0] +  " Stimuli Name: " + fileData_Control[n][1][p][1][v].stimuliName + " x: " + fileData_Control[n][1][p][1][v].x + " y: " + fileData_Control[n][1][p][1][v].y + " duration: " + fileData_Control[n][1][p][1][v].duration + " ID: " + fileData_Control[n][1][p][1][v].partID);

            }
        }
      }

    };
    reader.readAsText(file.files[z]);
  }

  document.getElementById("inputfile1").value = "";
  document.getElementById("inputfile").value = "";
  document.getElementById("stimuli").value = "";
  document.getElementById("model").value = "";
}

