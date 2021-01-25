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

  if(file_control.files.length === 0){
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
                if (fileData_Control[j][0][0].stimuliName === stimuli_name){
                  for(var a = 0; a < fileData_Control[j].length; a++){
                    if(fileData_Control[j][a][0].partID === counter_control){
                      Part_finder = 1;
                      Part_index = a;
                    }
                  }
                  if(Part_finder == 1){
                    tmp = fileData_Control[j][Part_index].length;
                    fileData_Control[j][Part_index][tmp] = new Object();
                    fileData_Control[j][Part_index][tmp].x = temp[3];
                    fileData_Control[j][Part_index][tmp].y = temp[4];
                    fileData_Control[j][Part_index][tmp].duration = temp[2];
                    fileData_Control[j][Part_index][tmp].stimuliName = temp[5];
                    fileData_Control[j][Part_index][tmp].partID = counter_control;
                    test = 0;
                  }
                  else{
                    tmp = fileData_Control[j].length;
                    fileData_Control[j][tmp] = new Array();
                    fileData_Control[j][tmp][0] = new Object();
                    fileData_Control[j][tmp][0].x = temp[3];
                    fileData_Control[j][tmp][0].y = temp[4];
                    fileData_Control[j][tmp][0].duration = temp[2];
                    fileData_Control[j][tmp][0].stimuliName = temp[5];
                    fileData_Control[j][tmp][0].partID = counter_control;
                    test = 0;
                  }
                }
              }
              if (test == 1){
                tmp = fileData_Control.length;
                fileData_Control[tmp] = new Array();
                fileData_Control[tmp][0] = new Array();
                fileData_Control[tmp][0][0] = new Object();
                fileData_Control[tmp][0][0].x = temp[3];
                fileData_Control[tmp][0][0].y = temp[4];
                fileData_Control[tmp][0][0].duration = temp[2];
                fileData_Control[tmp][0][0].stimuliName = temp[5];
                fileData_Control[tmp][0][0].partID = counter_control;
              }
            }
            else{
                for (var j = 0; fileData_Autistic.length > j; j++){
                    if (fileData_Autistic[j][0][0].stimuliName === stimuli_name){
                      for(var a = 0; a < fileData_Autistic[j].length; a++){
                        if(fileData_Autistic[j][a][0].partID === counter_autistic){
                          Part_finder = 1;
                          Part_index = a;
                        }
                      }
                      if(Part_finder == 1){
                        tmp = fileData_Autistic[j][Part_index].length;
                        fileData_Autistic[j][Part_index][tmp] = new Object();
                        fileData_Autistic[j][Part_index][tmp].x = temp[3];
                        fileData_Autistic[j][Part_index][tmp].y = temp[4];
                        fileData_Autistic[j][Part_index][tmp].duration = temp[2];
                        fileData_Autistic[j][Part_index][tmp].stimuliName = temp[5];
                        fileData_Autistic[j][Part_index][tmp].partID = counter_autistic;
                        test = 0;
                      }
                      else{
                        tmp = fileData_Autistic[j].length;
                        fileData_Autistic[j][tmp] = new Array();
                        fileData_Autistic[j][tmp][0] = new Object();
                        fileData_Autistic[j][tmp][0].x = temp[3];
                        fileData_Autistic[j][tmp][0].y = temp[4];
                        fileData_Autistic[j][tmp][0].duration = temp[2];
                        fileData_Autistic[j][tmp][0].stimuliName = temp[5];
                        fileData_Autistic[j][tmp][0].partID = counter_autistic;
                        test = 0;
                      }
                    }
                }
              if (test == 1){
                tmp = fileData_Autistic.length;
                fileData_Autistic[tmp] = new Array();
                fileData_Autistic[tmp][0] = new Array();
                fileData_Autistic[tmp][0][0] = new Object();
                fileData_Autistic[tmp][0][0].x = temp[3];
                fileData_Autistic[tmp][0][0].y = temp[4];
                fileData_Autistic[tmp][0][0].duration = temp[2];
                fileData_Autistic[tmp][0][0].stimuliName = temp[5];
                fileData_Autistic[tmp][0][0].partID = counter_autistic;
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
    };
    reader.readAsText(file.files[z]);
  }
  document.getElementById("inputfile1").value = "";
  document.getElementById("inputfile").value = "";
  document.getElementById("stimuli").value = "";
  document.getElementById("model").value = "";

  print();
}

function print(){
  console.log("AUTISTIC:")
      for (var n = 0; fileData_Autistic.length > n; n++){
        for (var p = 0; fileData_Autistic[n].length > p; p++){
            for (var v = 0; fileData_Autistic[n][p].length > v; v++){
              console.log("For " + "Model Array:Participant Array:ObjectArray: " + n + p + v + " Stimuli Name: " + fileData_Autistic[n][p][v].stimuliName + " x: " + fileData_Autistic[n][p][v].x + " y: " + fileData_Autistic[n][p][v].y + " duration: " + fileData_Autistic[n][p][v].duration + " ID: " + fileData_Autistic[n][p][v].partID);
            }
          }
      }
      console.log("CONTROL:")
      for (var n = 0; fileData_Control.length > n; n++){
        for (var p = 0; fileData_Control[n].length > p; p++){
            for (var v = 0; fileData_Control[n][p].length > v; v++){
              console.log("For " + "Model Array:Participant Array:ObjectArray: " + n + p + v + " Stimuli Name: " + fileData_Control[n][p][v].stimuliName + " x: " + fileData_Control[n][p][v].x + " y: " + fileData_Control[n][p][v].y + " duration: " + fileData_Control[n][p][v].duration + " ID: " + fileData_Control[n][p][v].partID);
            }
        }
      }
}

//New Comer File Read
var newComerData = new Array();

function newComerRead(file){

   var reader = new FileReader();
   reader.onload = function(event){
     var fileContent = event.target.result;
     var lines = fileContent.split(/\n/);

     var fileHeaders = new Array();
     fileHeaders = lines[0].split(/\t/);

     for (var i = 1; lines.length > i; i++){
       var temp = lines[i].split(/\t/);
       if(temp != ""){
         var stimuliFound = 1;
         if (newComerData.length === 0){
           newComerData[0] = new Array();
           newComerData[0][0] = new Object();
           newComerData[0][0].x = temp[3];
           newComerData[0][0].y= temp[4];
           newComerData[0][0].duration = temp[2];
           newComerData[0][0].stimuliName = temp[5];
         }
         else{
           for(var j = 0; j < newComerData.length; j++){
             if(newComerData[j][0].stimuliName === temp[5]){
               tmp = newComerData[j].length;
               newComerData[j][tmp] = new Object();
               newComerData[j][tmp].x = temp[3];
               newComerData[j][tmp].y = temp[4];
               newComerData[j][tmp].duration = temp[2];
               newComerData[j][tmp].stimuliName = temp[5];
               stimuliFound = 0;
             }
           }
           if(stimuliFound){
             tmp = newComerData.length;
             newComerData[tmp] = new Array();
             newComerData[tmp][0] = new Object();
             newComerData[tmp][0].x = temp[3];
             newComerData[tmp][0].y = temp[4];
             newComerData[tmp][0].duration = temp[2];
             newComerData[tmp][0].stimuliName = temp[5];
           }
         }
       }
     }
   };
   for(var x = 0; x < newComerData.length; x++){
     for(var y = 0; y < newComerData[x].length; y++){
       console.log("New Comer: " + x + y + "x: " + newComerData[x][y].x + " y: " + newComerData[x][y].y + " duration: " + newComerData[x][y].duration + " stimuli name: " + newComerData[x][y].stimuliName);
     }
   }
   reader.readAsText(file.files[0]);
}

//Grid
var grid = {
	index: -1,
    startX: -1,
    lengthX: -1,
    startY: -1,
    lengthY: -1
};

function addGrid() {
		var width = document.getElementById("width").value;
		var height = document.getElementById("height").value;

		var startX = 0;
    var startY = 0;
    var lengthX = 0;
    var lengthY = 0;

	  var gridSizeX = 3;
    var gridSizeY = 3;
		var indexCounter = 1;

    var Grids = [];

    for(var i=0; i<gridSizeY; i++){
        for(var j=0; j<gridSizeX; j++){
            startX = width * j/gridSizeX;
            lengthX = width * 1/gridSizeX;
            startY = height * i/gridSizeY;
            lengthY =  height * 1/gridSizeY;

            Grids.push({
                index: indexCounter,
                startX: startX,
                lengthX: lengthX,
                startY: startY,
                lengthY: lengthY
            });

						indexCounter++;
        }
    }
    return Grids;
}

//STA
function getSTAData(stimuliName, settings, stimuliFilter)
{
 var staInputData = new Object();
 //staInputData should be completed

 var postData = {
           areaData: Grids,               //can be chaged
           rawData: staInputData,
           settings: settings
       };

       var jsondata = JSON.stringify(postData);
       var dataResponse;

       $.ajax({
           type: "POST",
           url: staAddress,           //unknown STA Address
           data: { jsondata: jsondata },
           crossDomain: true,
           success: function (response) {
               dataResponse = response;
           },
           async: false
       });

       return JSON.parse(dataResponse);
}

//Levenshtein
function levenshtein(a,b) {
    if(a.length === 0) return b.length;
    if(b.length === 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
            if(b.charAt(i-1) == a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                               Math.min(matrix[i][j-1] + 1, // insertion
                                        matrix[i-1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
}

function prediction(unknown,autistic,normal){
    var comparisonUnknownAutistic = levenshtein(unknown,autistic);
    var comparisonUnknownNormal = levenshtein(unknown,normal);
    var similarityRate;

    if(comparisonUnknownNormal < comparisonUnknownAutistic){
        similarityRate = 1 - (comparisonUnknownNormal/Math.max(unknown.length,normal.length));
        return ["NORMAL",similarityRate];
    }

    else if (comparisonUnknownAutistic < comparisonUnknownNormal) {
        similarityRate = 1 - (comparisonUnknownAutistic/Math.max(unknown.length,autistic.length));
        return ["AUTISTIC",similarityRate];
    }

    else {
        similarityRate = 1 - (comparisonUnknownAutistic/Math.max(unknown.length,autistic.length));
        return ["EQUAL",similarityRate];
    }
}
