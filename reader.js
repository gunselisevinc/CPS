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

function read(file_autistic, file_control){
  console.log("RUN");
  var stimuli_name = document.getElementById("stimuli").value;
  var model_name = document.getElementById("model").value;

  file = file_autistic;

  for (var z = 0; file.files.length > z; z++){
    var Part_finder = -1;
    var Part_index = -1;
    var reader = new FileReader();
    reader.onload = function(event){
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
          position = stimuli_name === temp[5];

          if (position){
            ID_finder = 0;
            Part_finder = 0;
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
                        fileData_Autistic[j][Part_index][tmp].index = temp[0];
                        fileData_Autistic[j][Part_index][tmp].timeStamp = temp[1];
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
                        fileData_Autistic[j][tmp][0].index = temp[0];
                        fileData_Autistic[j][tmp][0].timeStamp = temp[1];
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
                fileData_Autistic[tmp][0][0].index = temp[0];
                fileData_Autistic[tmp][0][0].timeStamp = temp[1];
              }
          }
        }
      }
      if(ID_finder === 1){
          counter_autistic = counter_autistic - 1;
      }
      ID_finder = 1;
    };
    reader.readAsText(file.files[z]);
  }
  //////////////////////////////////////////////////////////////////////////
  file = file_control;
  for (var z = 0; file.files.length > z; z++){
    var Part_finder = -1;
    var Part_index = -1;
    var reader = new FileReader();
    reader.onload = function(event){
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
          position = stimuli_name === temp[5];

          if (position){
            ID_finder = 0;
            Part_finder = 0;
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
                        fileData_Control[j][Part_index][tmp].index = temp[0];
                        fileData_Control[j][Part_index][tmp].timeStamp = temp[1];
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
                        fileData_Control[j][tmp][0].index = temp[0];
                        fileData_Control[j][tmp][0].timeStamp = temp[1];
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
                fileData_Control[tmp][0][0].index = temp[0];
                fileData_Control[tmp][0][0].timeStamp = temp[1];
              }
          }
        }
      }
      if(ID_finder === 1){
          counter_control = counter_control - 1;
      }
      ID_finder = 1;
    };
    reader.readAsText(file.files[z]);
    if(fileData_Control.length){
      var grid = addGrid();
      sendSta(grid, stimuli_name);

    }
  }

/*
  document.getElementById("inputfile1").value = "";
  document.getElementById("inputfile").value = "";
  document.getElementById("stimuli").value = "";
  document.getElementById("model").value = "";*/

 // print();
}

function print(){
  console.log("AUTISTIC:")
      for (var n = 0; fileData_Autistic.length > n; n++){
        for (var p = 0; fileData_Autistic[n].length > p; p++){
            for (var v = 0; fileData_Autistic[n][p].length > v; v++){
              console.log("For " + "Model Array:Participant Array:ObjectArray: " + n + p + v + " Stimuli Name: " + fileData_Autistic[n][p][v].stimuliName + " x: " + fileData_Autistic[n][p][v].x + " y: " + fileData_Autistic[n][p][v].y + " duration: " + fileData_Autistic[n][p][v].duration + " ID: " + fileData_Autistic[n][p][v].partID + " index: " + fileData_Autistic[n][p][v].index + " fixed: " + fileData_Autistic[n][p][v].timeStamp);
            }
          }
      }
      console.log("CONTROL:")
      for (var n = 0; fileData_Control.length > n; n++){
        for (var p = 0; fileData_Control[n].length > p; p++){
            for (var v = 0; fileData_Control[n][p].length > v; v++){
              console.log("For " + "Model Array:Participant Array:ObjectArray: " + n + p + v + " Stimuli Name: " + fileData_Control[n][p][v].stimuliName + " x: " + fileData_Control[n][p][v].x + " y: " + fileData_Control[n][p][v].y + " duration: " + fileData_Control[n][p][v].duration + " ID: " + fileData_Control[n][p][v].partID + " index: " + fileData_Control[n][p][v].index + " fixed: " + fileData_Control[n][p][v].timeStamp);
            }
        }
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
//    if(newComerData.length > 0){
      const fileUrl = 'models.txt' // provide file location
      fetch(fileUrl)
    .then( r => r.text() )
    .then( t => {
      var lines = t.split('\n');
      for (var i = 0; i < lines.length; i++){
        data = lines[i].split(',');
        if(data[0] === myModel){
          singlePathCreator(data[1], data[2], data[3]);
        }
      }
    } )
    //}
}

var grid = {
	index: -1,
    startX: -1,
    lengthX: -1,
    startY: -1,
    lengthY: -1,
    stimuli: ' '
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
                lengthY: lengthY,
            });

						indexCounter++;
        }
    }
    return Grids;
}

var unknownPath = ' ';
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


function sendSta(grid, stimuli){
  var indx = -1;
  var points = new Array();
  var rawData = {};
  arr = fileData_Control;
  window.alert(arr.length);
  for(var i = 0; i < arr.length; i++){
    arr[i][0][0].stimuliName = arr[i][0][0].stimuliName.replace("\r","");
    console.log("arr: " + arr[i][0][0].stimuliName + " " + arr[i][0][0].stimuliName.length + " stimuli: " + stimuli + " " + stimuli.length);
    if(arr[i][0][0].stimuliName === stimuli){
      indx = i;
    }
  }
  for(var i = 0; i < arr[indx].length; i++){
    for(var j = 0; j < arr[indx][i].length; j++){
      var data = {
        index: arr[indx][i][j].index,
        timestamp: arr[indx][i][j].timeStamp,
        fixDuration: arr[indx][i][j].duration,
        posX: arr[indx][i][j].x,
        posY: arr[indx][i][j].y,
        stimuliName: arr[indx][i][j].stimuliName
      }
      points[j] = data;
    }
    rawData[i] = points;
    points = [];
  }

  var settings = {
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
    rawData: rawData,
    settings: settings
};

var jsondata = JSON.stringify(postData);
var dataResponse;

$(document).ready(function (){
  });
    window.alert("here");
    $.ajax({
      type: "POST",
      url: settings["staAddress"],
      data: { jsondata: jsondata },
      crossDomain: true,
      success: function (response) {
        dataResponse = response;
      },
      async: false
    });

console.log(dataResponse);

}
