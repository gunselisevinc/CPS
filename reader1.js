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
var height = -1;
var width = -1;

var autistic_stimulis = new Array();
var control_stimulis = new Array();

var autistic_stimulis = new Array();
var control_stimulis = new Array();
var enable_control = 0;
var enable_autistic = 0;

var dropdown_autistic = 0 ;
var dropdown_control = 0 ;
var dropdown_stimulis = new Array();
var stimuli_array = new Array();

//Triggerred when a file is uploaded to Autistic Group, Input File Read
document.getElementById('inputfile').addEventListener('change', function(){
  autistic_stimulis = [];
  for (var z = 0; this.files.length > z; z++){
    var reader=new FileReader();
    var fileData = new Array();
    reader.onload = FileDone;
    reader.readAsText(this.files[z]);
}
//dropdown print start
    if(dropdown_control == 1){
    var select = document.getElementById("selectStimuli");
     for(var i = 0; i < stimuli_array.length; i++) {
       var opt = stimuli_array[i];
       var el = document.createElement("option");
        el.textContent = opt; el.value = opt;
        select.appendChild(el); }}
//dropdown print end
})

var FileDone = function(event){
  var Part_finder = -1;
  var Part_index = -1;
  //enable inputs start
  enable_control= enable_control + 1;
    if(enable_autistic >= 1){
        document.getElementById("model").disabled = false;
  //      document.getElementById("height").disabled = false;
  //      document.getElementById("width").disabled = false;}
    //enable inputs end
  }


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

  //dropdown stimuli array start
  dropdown_autistic = 1;
  for(var i=0;i<autistic_stimulis.length;i++){
      var found = 0;
      for(var j=0;j<stimuli_array.length;j++){
          if(stimuli_array[j] === autistic_stimulis[i]){
            found = 1;
          }
      }
      if (found == 0){
        var tempo = stimuli_array.length;
       stimuli_array[tempo] = autistic_stimulis[i];
      }
      }
  //dropdown stimuli array end
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
  //dropdown print start
  if(dropdown_autistic == 1 ){
  var select = document.getElementById("selectStimuli");
   for(var i = 0; i < stimuli_array.length; i++) {
     var opt = stimuli_array[i];
     var el = document.createElement("option");
      el.textContent = opt; el.value = opt;
      select.appendChild(el); }}
    //dropdown print end
})

var FileDone2 = function(event){
  var Part_finder = -1;
  var Part_index = -1;
  //enable input start
    enable_autistic = enable_autistic+1;
    if(enable_control >= 1){
    document.getElementById("model").disabled = false;
  //  document.getElementById("height").disabled = false;
  //  document.getElementById("width").disabled = false;}
}
    //enable input end

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
  //dropdown stimuli array start
  dropdown_control = 1;
  for(var i=0;i<control_stimulis.length;i++){
     var found = 0;
      for(var j=0;j<stimuli_array.length;j++){
          if(control_stimulis[i] === stimuli_array[j]){
          found = 1;

          }
      }
   if ( found == 0){
   var tempo = stimuli_array.length;
   stimuli_array[tempo] = control_stimulis[i];
    }
  }
 //dropdown stimuli array end
}



function read(){
  var stimuli_array = new Array();
  var stimuli_name = document.getElementById("selectStimuli").value;
  var model_name = document.getElementById("model").value;
  var gridSizeX = document.getElementById("gridX").value;
  var gridSizeY = document.getElementById("gridY").value;
  var permission = document.getElementById("permission");
  var storePermit = false;
  if( $(permission).is(':checked')){
    storePermit = true;
  }
  console.log(storePermit);

  document.getElementById("model").value = "";
  document.getElementById("selectStimuli").value = "";

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
    fileWrite = fileWrite.concat(stimuli_name);
    fileWrite = fileWrite.concat(",");
    fileWrite = fileWrite.concat(path_autistic);
    fileWrite = fileWrite.concat(",");
  //  fileWrite = fileWrite.concat(durationsStr);
  //  fileWrite = fileWrite.concat(",");
    durationsStr = '';
  }
  if(fileData_Control.length){
    var grid = addGrid(0);
    var path_control = sendSta(grid, stimuli_name, fileData_Control);
    console.log("Control path: " + path_control);
    fileWrite = fileWrite.concat(path_control);
    fileWrite = fileWrite.concat(",");
  //  fileWrite = fileWrite.concat(durationsStr);
  //  fileWrite = fileWrite.concat(",");
    fileWrite = fileWrite.concat(gridSizeX);
    fileWrite = fileWrite.concat(",");
    fileWrite = fileWrite.concat(gridSizeY);
    fileWrite = fileWrite.concat(",\n");
    durationsStr = '';
    console.log(fileWrite);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){}
    xhttp.open("GET","fileWrite.py?q="+fileWrite, true);
    xhttp.send();
    fileWrite = "";
  }
}

var newComerData = new Array();
var myModel = "";

function newComerRead(file){
    unknownPath = "";
    myModel = document.getElementById("model").value;
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
    document.getElementById("inputfile3").value = "";
    document.getElementById("model").value = "";
    const fileUrl = 'models.txt' // provide file location
    fetch(fileUrl)
    .then( r => r.text() )
    .then( t => {
      var lines = t.split('\n');
      for (var i = 0; i < lines.length; i++){
        data = lines[i].split(',');
        if(data[0] === myModel){
          singlePathCreator(data[1], data[2], data[3],data[6],data[7]);
          console.log(data[5]);
          console.log(data[4]);
          width = data[1];
          height = data[2];
          prediction(unknownPath, data[5], data[4], data[6], data[7]);
        }
      }
    } )

    //model drop down start
    function modelFunc(data, i){

      if (data != 0 )modelArray[i]= data;
      console.log("yeni");
      console.log(i);
      console.log(data.length);

      console.log(modelArray.length);
      for (var j=0; j< modelArray.length; j++) console.log(modelArray[j]);

      if (data.length == 0 ){
      var select = document.getElementById("selectModel");
      for(var j = 0; j < modelArray.length; j++) {
      var opt = modelArray[j];
      var el = document.createElement("option");
      el.textContent = opt; el.value = opt;
      select.appendChild(el); } }
    }
    //model drop down end

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
    var gridSizeX = document.getElementById("gridX").value;
    var gridSizeY = document.getElementById("gridY").value;

    if(checker){  //Checks if we hae already write the width and heigth or not
      fileWrite = fileWrite.concat(width);
      fileWrite = fileWrite.concat(",");
      fileWrite = fileWrite.concat(height);
      fileWrite = fileWrite.concat(",");
    }
		var startX = 0;
    var startY = 0;
    var lengthX = 0;
    var lengthY = 0;

    var index = '';
    var indexCounter = 65;

    var Grids = [];

    for(var i=0; i<gridSizeY; i++){
        for(var j=0; j<gridSizeX; j++){
            startX = width * j/gridSizeX;
            lengthX = width * 1/gridSizeX;
            startY = height * i/gridSizeY;
            lengthY =  height * 1/gridSizeY;
            index = String.fromCharCode(indexCounter);

            Grids.push({
                index: index,
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
function singlePathCreator(width, height, stimuliUsed, gridSizeX, gridSizeY){

  var startX = 0;
  var startY = 0;
  var lengthX = 0;
  var lengthY = 0;

  var index = '';
  var indexCounter = 65;

  var Grids = [];

  for(var i=0; i<gridSizeY; i++){
      for(var j=0; j<gridSizeX; j++){
          startX = width * j/gridSizeX;
          lengthX = width * 1/gridSizeX;
          startY = height * i/gridSizeY;
          lengthY =  height * 1/gridSizeY;
          index = String.fromCharCode(indexCounter);

          Grids.push({
              index: index,
              startX: startX,
              lengthX: lengthX,
              startY: startY,
              lengthY: lengthY,
          });
          indexCounter++;
      }
  }
  var indexP;
  var indexFound = 0;
  for(var i = 0; i < newComerData.length; i++){
    newComerData[i][0].stimuliName = newComerData[i][0].stimuliName.replace('\r', '');
    if(newComerData[i][0].stimuliName === stimuliUsed){
      indexP = i;
      indexFound = 1;
    }
  }
  if(indexFound){
    for(var i = 0; i < newComerData[indexP].length; i++){
      for(var j = 0; j < Grids.length; j++){
        var op_y = Grids[j].startY + Grids[j].lengthY;
        var op_x = Grids[j].startX + Grids[j].lengthX;
        if((Grids[j].startY <= newComerData[indexP][i].y) & (newComerData[indexP][i].y <= op_y) & (Grids[j].startX <= newComerData[indexP][i].x) & (newComerData[indexP][i].x <= op_x)){
          unknownPath = unknownPath.concat(Grids[j].index);
        }
      }
    }
  }
  console.log(unknownPath);
}
var durationsStr = '';
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

  var daccuracy = document.getElementById("daccuracy").value;
  var sizeOfScreen = document.getElementById("screenSize").value;
  var distance = document.getElementById("distance").value;
  var tlevel = document.getElementById("Tolarance").value;
  var hfidelity = document.getElementById("fidelity").value;

  var setting = {
    sta: {
        daccuracy: daccuracy,
        sizeOfScreen: sizeOfScreen,
        distance: distance,
        resX: width,
        resY: height,
        tlevel: tlevel,
        hfidelity: hfidelity
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
      var respond = dataResponse;
      respond = respond.split('[');
      path = "";
      path = path.concat(respond[1][1]);
      for(var xr = 5; xr < respond[1].length; xr = xr + 4){
        path = path.concat(respond[1][xr]);
        path = path.replaceAll('"', '');
      }
      durations = respond[2].split(',');
      t_mp = durations.length - 1;
      durations[t_mp] = durations[t_mp].replaceAll(']','');
      for(var xr = 0; xr < durations.length; xr++){
        durationsStr = durationsStr.concat(String(durations[xr]) + " ");
        console.log(durations[xr]);
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



function prediction(unknown,autistic,control,gridX,gridY){
    var comparisonUnknownAutistic = levenshtein(unknown,autistic);
    var comparisonUnknownControl = levenshtein(unknown,control);
    var similarityRate;
    var result = '';
    if(comparisonUnknownControl < comparisonUnknownAutistic){
        similarityRate = 1 - (comparisonUnknownControl/Math.max(unknown.length,control.length));
        console.log("NOT AUTISTIC " + similarityRate);
        similarityRate = 100*similarityRate;
        result = result.concat("Not Autistic," + similarityRate);
    }

    else if (comparisonUnknownAutistic < comparisonUnknownControl) {
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
//    $(document).ready(function(){
//      $("#myModal").modal();
//      $('#result').html("Closer Group: " + tmp[0] + " -- Certainty(%): " + tmp[1]);
    result = "";
//    });
    visualize(unknown,autistic,control,gridX,gridY);
}

$(document).ready(function (){
    validate();
    $('#inputfile, #inputfile1, #model, #stimuli').change(validate);
});

function validate() {
  if ($('#inputfile').val().length > 0 &&
    $('#inputfile1').val().length > 0 &&
    $('#model').val().length > 0 &&
    $('#selectStimuli').val().length > 0) {
    $('#create').prop("disabled", false);
  } else {
   $('#create').prop("disabled", true);
  }
}

document.getElementById("screenshot").addEventListener('change', function(){
  //Read the contents of Image File.
  var reader=new FileReader();

  reader.onload = ImageDone;

    //Initiate the JavaScript Image object.
    var image = new Image();

    //Validate the File Height and Width.

  reader.readAsDataURL(this.files[0]);
})

var ImageDone = function(event){
  var image = new Image();
  image.onload = function(){
    height = image.height;
    width = image.width;
    console.log(height + " " + width);
  };
  image.src = event.target.result;
};
var myInterval;
function StopInterval(){
  clearInterval(myInterval);
  console.log("done");
}


var container;
var network;
var nodes;
var edges;
var startNode = new Array();
//Visualisation
function visualize(unknown,autistic,control,gridX,gridY){
  //data.nodes.clear();
  document.getElementById("output").style.display = "block";
  window.scrollTo(1000,document.body.scrollHeight);
  startNode = new Array();
  var startEdge = new Array();
  container = document.getElementById("mynetwork");
  container.style.backgroundImage = "url('test.png')";
  var h = height/2;
  var w = width/2;
  container.style.height = h;
  container.style.width = w;

  var margin = w/2;
  document.getElementById("autisticBox").style.margin = "0px 0px 0px " + (margin-180) + "px";
  document.getElementById("speedLabel").style.margin = "0px 0px 0px " + (margin-122) + "px";

  var n = new Array();
  var e = new Array();



  var rowLength = h/parseInt(gridX);
  var columnLength = w/parseInt(gridY);
  index = 1;
  startNode[0] = index;
  startEdge[0] = index;
  for(var i=0; i<autistic.length;i++){
    var num = autistic.charCodeAt(i);
    num = num - 65;
    var h = parseInt(gridY);
    var row = num/h;
    row = Math.floor(row);
    var g = parseInt(gridY);
    var column = num%g;
    var y = row*rowLength + rowLength/2;
    var x = column*columnLength + columnLength/2;
    n.push({
      id: index,
      x: x,
      y: y,
    //  color: "#cc00ff",
      size:5,
    });
    e.push({
      from: (index-1),
      to: index,
      color: {
        color: "#66ffcc",
      },
    });
    index++;
  }
  startNode[1] = index;
  startEdge[1] = index;
  for(var i=0; i<control.length;i++){
    var num = control.charCodeAt(i);
    num = num - 65;
    var h = parseInt(gridY);
    var row = num/h;
    row = Math.floor(row);
    var g = parseInt(gridY);
    var column = num%g;
    var y = row*rowLength + rowLength/2;
    var x = column*columnLength + columnLength/2;
    n.push({
      id: index,
      x: x,
      y: y,
  //    color: "#cc00ff",
      size:5,
    });
    var t = {
      from: (index-1),
      to: index,
      color: {
        color: "#ff66ff",
      },
    }
    e.push(t);
    index++;
  }
  startNode[2] = index;
  startEdge[2] = index;
  for(var i=0; i<unknown.length;i++){
    var num = unknown.charCodeAt(i);
    num = num - 65;
    var h = parseInt(gridY);
    var row = num/h;
    row = Math.floor(row);
    var g = parseInt(gridY);
    var column = num%g;
    var y = row*rowLength + rowLength/2;
    var x = column*columnLength + columnLength/2;
    n.push({
      id: index,
      x: x,
      y: y,
    //  color: "#cc00ff",
      size:5,
    });
    e.push({
      from: (index-1),
      to: index,
      color: {
        color: "#ffff66",
      },
    });
    index++;
  }
  startNode[3] = index;
  for(var i=0;i<gridX;i++){
    for(var j=0;j<gridY;j++){
      var y = i*rowLength + rowLength/2;
      var x = j*columnLength + columnLength/2;
      n.push({
        id:index,
        x: x,
        y: y,
        color: "#ffffff00",
        size:5,
      })
      index++;
    }
  }

  e.push({
    from: 1,
    to: (index-1),
    color: {
      color: "#ffffff00",
    },
  })

console.log(n);
console.log(e);

nodes = new vis.DataSet(n);
edges = new vis.DataSet(e);

  container = document.getElementById("mynetwork");

  var data = {
    nodes: nodes,
    edges: edges,
  }
  var options = {
    nodes: {
      shape: "dot",
      size: 5,
      color: "#cc00ff",
      fixed: {
        y: true,
        x: true,
      },

      font: {
        size: 32,
        color: "#ffffff",
      },
      borderWidth: 2,
    },
    edges: {
      width: 2,
      smooth: {
        type: "vertical",
        forceDirection: "none",
        roundness: 1,
      },
      arrows: {to:{
          enabled: true,
          }
        }
    },

    physics: false,
      interaction: {
        dragNodes: false,// do not allow dragging nodes
        zoomView: false, // do not allow zooming
        dragView: false  // do not allow dragging
      }
  };


  network = new vis.Network(container, data, options);



}

function displayCustomizedPaths(){
  //data.nodes.clear();
  //data.edges.clear();
  var n = new Array();
  var e = new Array();
  index = 1;
  StopInterval();
  const fileUrl = 'models.txt' // provide file location
  fetch(fileUrl)
  .then( r => r.text() )
  .then( t => {
    var lines = t.split('\n');
    for (var i = 0; i < lines.length; i++){
      data = lines[i].split(',');
      if(data[0] === myModel){
        var h = data[2]/2;
        var w = data[1]/2;
        var rowLength = h/parseInt(data[6]);
        var columnLength = w/parseInt(data[7]);
        var autisticCheckBox = document.getElementById("autisticBox");
        var controlCheckBox = document.getElementById("controlBox");
        var unknownCheckBox = document.getElementById("unknownBox");
        startNode[0] = -1;
        if( $(autisticCheckBox).is(':checked') ){
          startNode[0] = index;
          for(var i=0; i<data[5].length;i++){
            var num = data[5].charCodeAt(i);
            num = num - 65;
            var h = parseInt(data[7]);
            var row = num/h;
            row = Math.floor(row);
            var g = parseInt(data[7]);
            var column = num%g;
            var y = row*rowLength + rowLength/2;
            var x = column*columnLength + columnLength/2;
            n.push({
              id: index,
              x: x,
              y: y,

              size:5,
      //        label: String.fromCharCode(num+65),
            });
            e.push({
              from: (index-1),
              to: index,
              color: {
                color: "#66ffcc",
              },
            });
            index++;
          }
        }
        startNode[1] = -1;
        if( $(controlCheckBox).is(':checked') ){
          startNode[1] = index;
          for(var i=0; i<data[4].length;i++){
            var num = data[4].charCodeAt(i);
            num = num - 65;
            var h = parseInt(data[7]);
            var row = num/h;
            row = Math.floor(row);
            var g = parseInt(data[7]);
            var column = num%g;
            var y = row*rowLength + rowLength/2;
            var x = column*columnLength + columnLength/2;
            n.push({
              id: index,
              x: x,
              y: y,
              //color: '#cc00ff',
              size:5,
            });
            var t = {
              from: (index-1),
              to: index,
              color: {
                color: "#ff66ff",
              },
            }
            e.push(t);
            index++;
          }
        }
        startNode[2] = -1;
        if( $(unknownCheckBox).is(':checked') ){
          startNode[2] = index;
          for(var i=0; i<unknownPath.length;i++){
            var num = unknownPath.charCodeAt(i);
            num = num - 65;
            var h = parseInt(data[7]);
            var row = num/h;
            row = Math.floor(row);
            var g = parseInt(data[7]);
            var column = num%g;
            var y = row*rowLength + rowLength/2;
            var x = column*columnLength + columnLength/2;
            n.push({
              id: index,
              x: x,
              y: y,
              //color: '#cc00ff',
              size:5,
            });
            e.push({
              from: (index-1),
              to: index,
              color: {
                color: "#ffff66",
              },
            });
            index++;
          }
        }
      }
    }
    startNode[3] = index;
    for(var i=0;i<data[6];i++){
      for(var j=0;j<data[7];j++){
        var y = i*rowLength + rowLength/2;
        var x = j*columnLength + columnLength/2;
        n.push({
          id:index,
          x: x,
          y: y,
          color: "#ffffff00",
          size:5,
        })
        index++;
      }
    }

    e.push({
      from: 1,
      to: (index-1),
      color: {
        color: "#ffffff00",
      },
    })

    nodes = new vis.DataSet(n);


    edges = new vis.DataSet(e);

      container = document.getElementById("mynetwork");
      var data = {
        nodes: nodes,
        edges: edges,
      }
      var options = {
        nodes: {
          shape: "dot",
          color: '#cc00ff',
          size: 5,
          fixed: {
            y: true,
            x: true,
          },

          font: {
            size: 32,
            color: "#ffffff",
          },
          borderWidth: 2,
        },
        edges: {
          width: 2,
          smooth: {
            type: "vertical",
            forceDirection: "none",
            roundness: 1,
          },
          arrows: {to:{
              enabled: true,
              }
            }
        },

        physics: false,
          interaction: {
            dragNodes: false,// do not allow dragging nodes
            zoomView: false, // do not allow zooming
            dragView: false  // do not allow dragging
          }
      };


    network = new vis.Network(container, data, options);
  } )
}

function animation(){

  var options = {
    nodes: {
      color: "#ffffff00",
      },
    edges: {
      hidden: true,
    },
  }
  StopInterval();
  network.setOptions(options);
    var i = startNode[0];
    var j = startNode[1];
    var k = startNode[2];
    var i_end = startNode[1];
    var j_end = startNode[2];
    if(i_end == -1 && j_end == -1){
      i_end = startNode[3];
    }
    else if(i_end == -1){
      i_end = startNode[2];
    }
    else if(j_end == -1){
      j_end = startNode[3];
    }
    var mySpeed = document.getElementById("speedValue").value;
    mySpeed = mySpeed*1000 //Convert to milliseconds
    myInterval = setInterval(function(){
      if(((i === i_end) || (i == -1)) && ((j === j_end) || (j == -1)) && ((k === startNode[3]) || (k == -1))){
        nodes.update({id: i, size: 5, color: "#cc00ff"});
        nodes.update({id: j, size: 5, color: "#cc00ff"});
        nodes.update({id: k, size: 5, color: "#cc00ff"});
        StopInterval();
      }
      else{
        if((i != i_end - 1) && (i != -1)){
          nodes.update({id: i, color: "#cc00ff", size: 5});
          nodes.update({id: i + 1, color: "#66ffcc", size: 15});
          network.body.data.edges.add([{from: i, to: i + 1, color: {color: "#66ffcc"}, hidden: false}]);
          i = i + 1;
        }
        if((j != j_end - 1) && (j != -1)){
          nodes.update({id: j, color: "#cc00ff", size: 5});
          nodes.update({id: j + 1, color: "#ff66ff", size: 15});
          network.body.data.edges.add([{from: j, to: j + 1, color: {color: "#ff66ff"}, hidden: false}]);
          j = j + 1;
        }
        if((k != startNode[3] - 1) && (k != -1)){
          nodes.update({id: k, color: "#cc00ff", size: 5});
          nodes.update({id: k + 1, color: "#ffff66", size: 15});
          network.body.data.edges.add([{from: k, to: k + 1, color: {color: "#ffff66"}, hidden: false}]);
          k = k + 1;
        }
        network.redraw;
      }
    }, mySpeed);
}
