var data = {
    index: -1,
    timeStamp: -1,
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
var path_control = '';
var path_autistic = '';
var fileWrite = '';

var autistic_stimulis = new Array();
var control_stimulis = new Array();

//Triggerred when a file is uploaded to Autistic Group, Input File Read
document.getElementById('inputfile').addEventListener('change', function(){
  autistic_stimulis = [];
  for (var z = 0; this.files.length > z; z++){
    var reader=new FileReader();
    var fileData = new Array();
    reader.onload = FileDone;
    reader.readAsText(this.files[z]);
  }
})

var FileDone = function(event){
  var Part_finder = -1;
  var Part_index = -1;
  counter_autistic = counter_autistic + 1;
  var fileContent = event.target.result;
  var lines = fileContent.split(/\n/);

  var fileHeaders = new Array();
  fileHeaders = lines[0].split(/\t/);

  var tmp = -1;
  for (var i = 1; lines.length > i; i++){

  var test = 1;
  var temp = lines[i].split(/\t/);
  if (temp != "") {
      temp[5] = temp[5].replace("\r", "");
      var addedAlready = 1;
      for(var jr = 0; jr<autistic_stimulis.length; jr++){
        if(autistic_stimulis[jr] === temp[5]){
          addedAlready = 0;
        }
      }
      if(addedAlready & temp[5].startsWith("http")){
        var len = autistic_stimulis.length;
        autistic_stimulis[len] = temp[5];
      }
      ID_finder = 0;
      Part_finder = 0;
          for (var j = 0; fileData_Autistic.length > j; j++){
              if (fileData_Autistic[j][0][0].stimuliName === temp[5]){
                for(var a = 0; a < fileData_Autistic[j].length; a++){
                  if(fileData_Autistic[j][a][0].partID === counter_autistic){
                    Part_finder = 1;
                    Part_index = a;
                  }
                }
                if(Part_finder == 1){  //If participant and stimuli name found in the array
                  tmp = fileData_Autistic[j][Part_index].length;
                  fileData_Autistic[j][Part_index][tmp] = new Object();
                  fileData_Autistic[j][Part_index][tmp].x = temp[3];
                  fileData_Autistic[j][Part_index][tmp].y = temp[4];
                  fileData_Autistic[j][Part_index][tmp].duration = temp[2];
                  fileData_Autistic[j][Part_index][tmp].stimuliName = temp[5];
                  fileData_Autistic[j][Part_index][tmp].partID = counter_autistic;
                  fileData_Autistic[j][Part_index][tmp].index = temp[0];
                  fileData_Autistic[j][Part_index][tmp].timeStamp = temp[1];
                  test = 0;
                }
                else{   //If paticipant not found, but stimuli name found
                  tmp = fileData_Autistic[j].length;
                  fileData_Autistic[j][tmp] = new Array();
                  fileData_Autistic[j][tmp][0] = new Object();
                  fileData_Autistic[j][tmp][0].x = temp[3];
                  fileData_Autistic[j][tmp][0].y = temp[4];
                  fileData_Autistic[j][tmp][0].duration = temp[2];
                  fileData_Autistic[j][tmp][0].stimuliName = temp[5];
                  fileData_Autistic[j][tmp][0].partID = counter_autistic;
                  fileData_Autistic[j][tmp][0].index = temp[0];
                  fileData_Autistic[j][tmp][0].timeStamp = temp[1];
                  test = 0;
                }
              }
          }
          if (test == 1){   //If simuli not found in the array
            tmp = fileData_Autistic.length;
            fileData_Autistic[tmp] = new Array();
            fileData_Autistic[tmp][0] = new Array();
            fileData_Autistic[tmp][0][0] = new Object();
            fileData_Autistic[tmp][0][0].x = temp[3];
            fileData_Autistic[tmp][0][0].y = temp[4];
            fileData_Autistic[tmp][0][0].duration = temp[2];
            fileData_Autistic[tmp][0][0].stimuliName = temp[5];
            fileData_Autistic[tmp][0][0].partID = counter_autistic;
            fileData_Autistic[tmp][0][0].index = temp[0];
            fileData_Autistic[tmp][0][0].timeStamp = temp[1];
          }
    }
  }
  if(ID_finder === 1){
      counter_autistic = counter_autistic - 1;
  }
  ID_finder = 1;
}

//Triggerred when a file is uploaded to Autistic Group, Input File Read
document.getElementById('inputfile1').addEventListener('change', function(){
  control_stimulis = [];
  for (var z = 0; this.files.length > z; z++){
    var reader=new FileReader();
    var fileData = new Array();
    reader.onload = FileDone2;
    reader.readAsText(this.files[z]);
  }
})

var FileDone2 = function(event){
  var Part_finder = -1;
  var Part_index = -1;
  counter_control = counter_control + 1;
  var fileContent = event.target.result;
  var lines = fileContent.split(/\n/);

  var fileHeaders = new Array();
  fileHeaders = lines[0].split(/\t/);

  var tmp = -1;
  for (var i = 1; lines.length > i; i++){

    var test = 1;
    var temp = lines[i].split(/\t/);
    if (temp != "") {
      temp[5] = temp[5].replace("\r", "");
      var addedAlready = 1;
      for(var jr = 0; jr<control_stimulis.length; jr++){
        if(control_stimulis[jr] === temp[5]){
          addedAlready = 0;
        }
      }
      if(addedAlready & temp[5].startsWith("http")){
        var len = control_stimulis.length;
        control_stimulis[len] = temp[5];
      }

      ID_finder = 0;
      Part_finder = 0;
          for (var j = 0; fileData_Control.length > j; j++){
              if (fileData_Control[j][0][0].stimuliName === temp[5]){
                for(var a = 0; a < fileData_Control[j].length; a++){
                  if(fileData_Control[j][a][0].partID === counter_control){
                    Part_finder = 1;
                    Part_index = a;
                  }
                }
                if(Part_finder == 1){  //If participant and stimuli name found in the array
                  tmp = fileData_Control[j][Part_index].length;
                  fileData_Control[j][Part_index][tmp] = new Object();
                  fileData_Control[j][Part_index][tmp].x = temp[3];
                  fileData_Control[j][Part_index][tmp].y = temp[4];
                  fileData_Control[j][Part_index][tmp].duration = temp[2];
                  fileData_Control[j][Part_index][tmp].stimuliName = temp[5];
                  fileData_Control[j][Part_index][tmp].partID = counter_control;
                  fileData_Control[j][Part_index][tmp].index = temp[0];
                  fileData_Control[j][Part_index][tmp].timeStamp = temp[1];
                  test = 0;
                }
                else{   //If paticipant not found, but stimuli name found
                  tmp = fileData_Control[j].length;
                  fileData_Control[j][tmp] = new Array();
                  fileData_Control[j][tmp][0] = new Object();
                  fileData_Control[j][tmp][0].x = temp[3];
                  fileData_Control[j][tmp][0].y = temp[4];
                  fileData_Control[j][tmp][0].duration = temp[2];
                  fileData_Control[j][tmp][0].stimuliName = temp[5];
                  fileData_Control[j][tmp][0].partID = counter_control;
                  fileData_Control[j][tmp][0].index = temp[0];
                  fileData_Control[j][tmp][0].timeStamp = temp[1];
                  test = 0;
                }
              }
          }
          if (test == 1){   //If simuli not found in the array
            tmp = fileData_Control.length;
            fileData_Control[tmp] = new Array();
            fileData_Control[tmp][0] = new Array();
            fileData_Control[tmp][0][0] = new Object();
            fileData_Control[tmp][0][0].x = temp[3];
            fileData_Control[tmp][0][0].y = temp[4];
            fileData_Control[tmp][0][0].duration = temp[2];
            fileData_Control[tmp][0][0].stimuliName = temp[5];
            fileData_Control[tmp][0][0].partID = counter_control;
            fileData_Control[tmp][0][0].index = temp[0];
            fileData_Control[tmp][0][0].timeStamp = temp[1];
          }
    }
  }
  if(ID_finder === 1){
      counter_control = counter_control - 1;
  }
  ID_finder = 1;
}

//

function read(){
  var stimuli_array = new Array();
  var stimuli_name = document.getElementById("stimuli").value;
  var model_name = document.getElementById("model").value;
  document.getElementById("model").value = "";
  document.getElementById("stimuli").value = "";

  if(control_stimulis.length > autistic_stimulis.length){
    for(var i=0;i<control_stimulis.length;i++){
      for(var j=0;j<autistic_stimulis.length;j++){
          if(control_stimulis[i] === autistic_stimulis[j]){
            var tempo = stimuli_array.length;
            stimuli_array[tempo] = control_stimulis[i];
          }
      }
    }
  }

  else{
    for(var i=0;i<autistic_stimulis.length;i++){
      for(var j=0;j<control_stimulis.length;j++){
          if(control_stimulis[j] === autistic_stimulis[i]){
            var tempo = stimuli_array.length;
            stimuli_array[tempo] = control_stimulis[j];
          }
      }
    }
  }

  if(fileData_Autistic.length){
    fileWrite = fileWrite.concat(model_name);
    fileWrite = fileWrite.concat(",");
    var grid = addGrid(1);
    var path_autistic = sendSta(grid, stimuli_name, fileData_Autistic);
    console.log("Autistic path: " + path_autistic);
  }
  if(fileData_Control.length){
    var grid = addGrid(0);
    var path_control = sendSta(grid, stimuli_name, fileData_Control);
    console.log("Control path: " + path_control);
    fileWrite = fileWrite.concat(stimuli_name);
    fileWrite = fileWrite.concat(",");
    fileWrite = fileWrite.concat(path_autistic);
    fileWrite = fileWrite.concat(",");
    fileWrite = fileWrite.concat(path_control);
    fileWrite = fileWrite.concat(",\n");
    console.log(fileWrite);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){}
    xhttp.open("GET","fileWrite.py?q="+fileWrite, true);
    xhttp.send();
    fileWrite = "";
  }
}

var newComerData = new Array();

function newComerRead(file){
    var myModel = document.getElementById("model").value;
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
    reader.readAsText(file.files[0]);
    document.getElementById("inputfile").value = "";
    document.getElementById("model").value = "";
    const fileUrl = 'models.txt' // provide file location
    fetch(fileUrl)
    .then( r => r.text() )
    .then( t => {
      var lines = t.split('\n');
      for (var i = 0; i < lines.length; i++){
        data = lines[i].split(',');
        if(data[0] === myModel){
          singlePathCreator(data[1], data[2], data[3]);
          console.log(data[5]);
          console.log(data[4]);
          prediction(unknownPath, data[5], data[4]);
        }
      }
    } )
}

var grid = {
	index: -1,
    startX: -1,
    lengthX: -1,
    startY: -1,
    lengthY: -1,
    stimuli: ' '
};

function addGrid(checker) {
		var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;

    if(checker){  //Checks if we hae already write the width and heigth or not
      fileWrite = fileWrite.concat(width);
      fileWrite = fileWrite.concat(",");
      fileWrite = fileWrite.concat(height);
      fileWrite = fileWrite.concat(",");
    }
    else{
      document.getElementById("width").value = "";
      document.getElementById("height").value = "";
    }

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
                lengthY: lengthY,
            });

						indexCounter++;
        }
    }
    return Grids;
}

var unknownPath = '';
function singlePathCreator(width, height, stimuliUsed){

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
              lengthY: lengthY,
          });
          indexCounter++;
      }
  }
  var indexP;

  for(var i = 0; i < newComerData.length; i++){
    newComerData[i][0].stimuliName = newComerData[i][0].stimuliName.replace('\r', '');
    if(newComerData[i][0].stimuliName === stimuliUsed){
      indexP = i;
    }
  }
  for(var i = 0; i < newComerData[indexP].length; i++){
    for(var j = 0; j < Grids.length; j++){
      var op_y = Grids[j].startY + Grids[j].lengthY;
      var op_x = Grids[j].startX + Grids[j].lengthX;
      if((Grids[j].startY <= newComerData[indexP][i].y) & (newComerData[indexP][i].y <= op_y) & (Grids[j].startX <= newComerData[indexP][i].x) & (newComerData[indexP][i].x <= op_x)){
        unknownPath = unknownPath.concat(Grids[j].index);
      }
    }
  }
  console.log(unknownPath);
}

function sendSta(grid, stimuli, arr){
  var indx = -1;
  var points = new Array();
  var rwData = {};
  var t;
  for(var i = 0; i < arr.length; i++){
    arr[i][0][0].stimuliName = arr[i][0][0].stimuliName.replace("\r","");
    if(arr[i][0][0].stimuliName === stimuli){
      indx = i;
    }
  }
  for(var i = 0; i < arr[indx].length; i++){
    for(var j = 0; j < arr[indx][i].length; j++){
      var test = new vis.DataSet();
      var val = test.add(arr[indx][i][j]);
      if(j === 0){
        var is = false;
      }
      else if (arr[indx][i][j].stimuliName === arr[indx][i][j - 1].stimuliName){
        var is = true;
      }
      else{
        var is = false;
      }
      var data = {
        index: arr[indx][i][j].index,
        isConnected: is,
        id: val,
        participantID: arr[indx][i][j].partID,
        timestamp: arr[indx][i][j].timeStamp,
        fixDuration: arr[indx][i][j].duration,
        posX: arr[indx][i][j].x,
        posY: arr[indx][i][j].y,
        stimuliName: arr[indx][i][j].stimuliName
      }
      points[j] = data;
    }
    t = i + 1;
    rwData[t] = points;
    points = [];
  }

  var setting = {
    sta: {
        daccuracy: 0.5,
        sizeOfScreen: 17,
        distance: 60,
        resX: 1280,
        resY: 1024,
        tlevel: 1.00,
        hfidelity: true
    },
    staAddress: "http://127.0.0.1:5000"
};

  var postData = {
    areaData: grid,
    rawData: rwData,
    settings: setting.sta
};

var jsondata = JSON.stringify(postData);


var dataResponse;
    $.ajax({
      type: "POST",
      url: setting["staAddress"],
      data: { jsondata: jsondata },
      crossDomain: true,
      success: function (response) {
        dataResponse = response;
      },
      async: false
    });
    dataResponse = JSON.parse(dataResponse);
    dataResponse = JSON.stringify(dataResponse);
    if(dataResponse != " "){
      var path = dataResponse[2];
      var temp = 6;
      for(var i = 6; i < dataResponse.length; i++){
        if(i === temp){
          path = path.concat(dataResponse[i]);
          temp = temp + 4;
        }
      }
    }
    return path;
}

function levenshtein(a, b) {
    if(a.length === 0){
      return b.length;
    }
    if(b.length === 0){
      return a.length;
    }

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
    var result = '';
    if(comparisonUnknownNormal < comparisonUnknownAutistic){
        similarityRate = 1 - (comparisonUnknownNormal/Math.max(unknown.length,normal.length));
        console.log("NORMAL " + similarityRate);
        similarityRate = 100*similarityRate;
        result = result.concat("Not Autistic," + similarityRate);
    }

    else if (comparisonUnknownAutistic < comparisonUnknownNormal) {
        similarityRate = 1 - (comparisonUnknownAutistic/Math.max(unknown.length,autistic.length));
        console.log("AUTISTIC " + similarityRate);
        similarityRate = 100*similarityRate;
        result = result.concat("Autistic," + similarityRate);
    }

    else {
        similarityRate = 1 - (comparisonUnknownAutistic/Math.max(unknown.length,autistic.length));
        console.log("SYSTEM CANNOT DECIDE " + similarityRate);
        similarityRate = 100*similarityRate;
        result = result.concat("System Cannot Decide," + similarityRate);
    }
    tmp = result.split(",");
    tmp[1] = tmp[1].substring(0,4);
    $(document).ready(function(){
      $("#myModal").modal();
      $('#result').html("Closer Group: " + tmp[0] + " -- Certainty(%): " + tmp[1]);
    result = "";
    });
}
