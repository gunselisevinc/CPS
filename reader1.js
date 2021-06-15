var data = {
  index: -1,
  timeStamp: -1,
  x: -1,
  y: -1,
  duration: -1,
  stimuliName: ' ',
  partID: -1
};

/*
var model = {
  id: -1,
  width: -1,
  height: -1,
  image_path:	'',
  model_name:	'',
  stimuli_name:	'',
  grid_x:	-1,
  grid_y:	-1,
  autistic_path: '',
  control_path:	'',
  flag: -1,
  description: ''
};
*/
var objectDB;

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

var dropdown_autistic = 0;
var dropdown_control = 0;
var dropdown_stimulis = new Array();
var stimuli_array = new Array();

//Triggerred when a file is uploaded to Autistic Group, Input File Read
document.getElementById('inputfile').addEventListener('change', function() {
  autistic_stimulis = [];
  for (var z = 0; this.files.length > z; z++) {
    var reader = new FileReader();
    var fileData = new Array();
    reader.onload = FileDone;
    reader.readAsText(this.files[z]);
  }
  //dropdown print start
  if (dropdown_control == 1) {
    var select = document.getElementById("selectStimuli");
    for (var i = 0; i < stimuli_array.length; i++) {
      var opt = stimuli_array[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }
  }
  //dropdown print end
})

var FileDone = function(event) {
  var Part_finder = -1;
  var Part_index = -1;
  //enable inputs start
  enable_control = enable_control + 1;
  if (enable_autistic >= 1) {
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
  for (var i = 1; lines.length > i; i++) {

    var test = 1;
    var temp = lines[i].split(/\t/);
    if (temp != "") {
      temp[5] = temp[5].replace("\r", "");
      var addedAlready = 1;
      for (var jr = 0; jr < autistic_stimulis.length; jr++) {
        if (autistic_stimulis[jr] === temp[5]) {
          addedAlready = 0;
        }
      }
      if (addedAlready & temp[5].startsWith("http")) {
        var len = autistic_stimulis.length;
        autistic_stimulis[len] = temp[5];
      }
      ID_finder = 0;
      Part_finder = 0;
      for (var j = 0; fileData_Autistic.length > j; j++) {
        if (fileData_Autistic[j][0][0].stimuliName === temp[5]) {
          for (var a = 0; a < fileData_Autistic[j].length; a++) {
            if (fileData_Autistic[j][a][0].partID === counter_autistic) {
              Part_finder = 1;
              Part_index = a;
            }
          }
          if (Part_finder == 1) { //If participant and stimuli name found in the array
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
          } else { //If paticipant not found, but stimuli name found
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
      if (test == 1) { //If simuli not found in the array
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
  if (ID_finder === 1) {
    counter_autistic = counter_autistic - 1;
  }
  ID_finder = 1;

  //dropdown stimuli array start
  dropdown_autistic = 1;
  for (var i = 0; i < autistic_stimulis.length; i++) {
    var found = 0;
    for (var j = 0; j < stimuli_array.length; j++) {
      if (stimuli_array[j] === autistic_stimulis[i]) {
        found = 1;
      }
    }
    if (found == 0) {
      var tempo = stimuli_array.length;
      stimuli_array[tempo] = autistic_stimulis[i];
    }
  }
  //dropdown stimuli array end
}

//Triggerred when a file is uploaded to Autistic Group, Input File Read
document.getElementById('inputfile1').addEventListener('change', function() {
  control_stimulis = [];
  for (var z = 0; this.files.length > z; z++) {
    var reader = new FileReader();
    var fileData = new Array();
    reader.onload = FileDone2;
    reader.readAsText(this.files[z]);
  }
  //dropdown print start
  if (dropdown_autistic == 1) {
    var select = document.getElementById("selectStimuli");
    for (var i = 0; i < stimuli_array.length; i++) {
      var opt = stimuli_array[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }
  }
  //dropdown print end
})

var FileDone2 = function(event) {
  var Part_finder = -1;
  var Part_index = -1;
  //enable input start
  enable_autistic = enable_autistic + 1;
  if (enable_control >= 1) {
    document.getElementById("model").disabled = false;
  }
  //enable input end

  counter_control = counter_control + 1;
  var fileContent = event.target.result;
  var lines = fileContent.split(/\n/);

  var fileHeaders = new Array();
  fileHeaders = lines[0].split(/\t/);

  var tmp = -1;
  for (var i = 1; lines.length > i; i++) {

    var test = 1;
    var temp = lines[i].split(/\t/);
    if (temp != "") {
      temp[5] = temp[5].replace("\r", "");
      var addedAlready = 1;
      for (var jr = 0; jr < control_stimulis.length; jr++) {
        if (control_stimulis[jr] === temp[5]) {
          addedAlready = 0;
        }
      }
      if (addedAlready & temp[5].startsWith("http")) {
        var len = control_stimulis.length;
        control_stimulis[len] = temp[5];
      }

      ID_finder = 0;
      Part_finder = 0;
      for (var j = 0; fileData_Control.length > j; j++) {
        if (fileData_Control[j][0][0].stimuliName === temp[5]) {
          for (var a = 0; a < fileData_Control[j].length; a++) {
            if (fileData_Control[j][a][0].partID === counter_control) {
              Part_finder = 1;
              Part_index = a;
            }
          }
          if (Part_finder == 1) { //If participant and stimuli name found in the array
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
          } else { //If paticipant not found, but stimuli name found
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
      if (test == 1) { //If simuli not found in the array
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
  if (ID_finder === 1) {
    counter_control = counter_control - 1;
  }
  ID_finder = 1;
  //dropdown stimuli array start
  dropdown_control = 1;
  for (var i = 0; i < control_stimulis.length; i++) {
    var found = 0;
    for (var j = 0; j < stimuli_array.length; j++) {
      if (control_stimulis[i] === stimuli_array[j]) {
        found = 1;

      }
    }
    if (found == 0) {
      var tempo = stimuli_array.length;
      stimuli_array[tempo] = control_stimulis[i];
    }
  }
  //dropdown stimuli array end
}



function read() {
  var stimuli_array = new Array();
  var stimuli_name = document.getElementById("selectStimuli").value;
  var model_name = document.getElementById("model").value;
  var gridSizeX = document.getElementById("gridX").value;
  var gridSizeY = document.getElementById("gridY").value;
  var permission = document.getElementById("permission");
  var storePermit = false;
  if ($(permission).is(':checked')) {
    storePermit = true;
  }
  console.log(storePermit);

  document.getElementById("model").value = "";
  document.getElementById("selectStimuli").value = "";

  if (control_stimulis.length > autistic_stimulis.length) {
    for (var i = 0; i < control_stimulis.length; i++) {
      for (var j = 0; j < autistic_stimulis.length; j++) {
        if (control_stimulis[i] === autistic_stimulis[j]) {
          var tempo = stimuli_array.length;
          stimuli_array[tempo] = control_stimulis[i];
        }
      }
    }
  } else {
    for (var i = 0; i < autistic_stimulis.length; i++) {
      for (var j = 0; j < control_stimulis.length; j++) {
        if (control_stimulis[j] === autistic_stimulis[i]) {
          var tempo = stimuli_array.length;
          stimuli_array[tempo] = control_stimulis[j];
        }
      }
    }
  }

  if (fileData_Autistic.length) {
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
  if (fileData_Control.length) {
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
    console.log(storePermit);

    var flag = 0;
    if (storePermit === true) flag = 1;
    var desc = "";
    const mymodel_image = document.querySelector('input[id="screenshot"]');

    var formData = new FormData();

    formData.append('width', width);
    formData.append('height', height);
    formData.append('mymodel_image', mymodel_image.files[0]);
    formData.append('model_name', model_name);
    formData.append('stimuli_name', stimuli_name);
    formData.append('grid_x', gridSizeX);
    formData.append('grid_y', gridSizeY);
    formData.append('autistic_path', path_autistic);
    formData.append('control_path', path_control);
    formData.append('flag', flag);
    formData.append('description', desc);

    fetch('http://localhost:5000/newModel', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        return response.json()
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
}

var newComerData = new Array();
var myModel = "";

function newComerRead(file) {
  unknownPath = "";
  StopInterval();
  myModel = document.getElementById("selectModel").value;
  var reader = new FileReader();
  reader.onload = function(event) {
    var fileContent = event.target.result;
    var lines = fileContent.split(/\n/);

    var fileHeaders = new Array();
    fileHeaders = lines[0].split(/\t/);

    for (var i = 1; lines.length > i; i++) {
      var temp = lines[i].split(/\t/);
      if (temp != "") {
        var stimuliFound = 1;
        if (newComerData.length === 0) {
          newComerData[0] = new Array();
          newComerData[0][0] = new Object();
          newComerData[0][0].x = temp[3];
          newComerData[0][0].y = temp[4];
          newComerData[0][0].duration = temp[2];
          newComerData[0][0].stimuliName = temp[5];
        } else {
          for (var j = 0; j < newComerData.length; j++) {
            if (newComerData[j][0].stimuliName === temp[5]) {
              tmp = newComerData[j].length;
              newComerData[j][tmp] = new Object();
              newComerData[j][tmp].x = temp[3];
              newComerData[j][tmp].y = temp[4];
              newComerData[j][tmp].duration = temp[2];
              newComerData[j][tmp].stimuliName = temp[5];
              stimuliFound = 0;
            }
          }
          if (stimuliFound) {
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
  document.getElementById("selectModel").value = "";

  var getDataURl = 'http://localhost:5000/models/' + myModel;
  console.log(getDataURl);
  fetch(getDataURl)
    .then(model => model.json())
    .then((json) => {
      var objectStr = JSON.stringify(json)
      objectDB = JSON.parse(objectStr);
      console.log(objectDB);
      console.log(objectDB[0].model_name);
      width = objectDB[0].width;
      height = objectDB[0].height;
      singlePathCreator(width, height, objectDB[0].stimuli_name, objectDB[0].grid_x, objectDB[0].grid_y);
      prediction(unknownPath, objectDB[0].autistic_path, objectDB[0].control_path, objectDB[0].grid_x, objectDB[0].grid_y);

      if (objectDB[0].flag === 0) {
        var modelRemoveURl = 'http://localhost:5000/modelRemove/' + myModel;
        fetch(modelRemoveURl, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            return response.json()
          })
          .catch(err => console.log(err));
      }
    })

  //model drop down start
  function modelFunc(data, i) {

    if (data != 0) modelArray[i] = data;
    console.log("yeni");
    console.log(i);
    console.log(data.length);

    console.log(modelArray.length);
    for (var j = 0; j < modelArray.length; j++) console.log(modelArray[j]);

    if (data.length == 0) {
      var select = document.getElementById("selectModel");
      for (var j = 0; j < modelArray.length; j++) {
        var opt = modelArray[j];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    }
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

  if (checker) { //Checks if we hae already write the width and heigth or not
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

  for (var i = 0; i < gridSizeY; i++) {
    for (var j = 0; j < gridSizeX; j++) {
      startX = width * j / gridSizeX;
      lengthX = width * 1 / gridSizeX;
      startY = height * i / gridSizeY;
      lengthY = height * 1 / gridSizeY;
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

function singlePathCreator(width, height, stimuliUsed, gridSizeX, gridSizeY) {

  var startX = 0;
  var startY = 0;
  var lengthX = 0;
  var lengthY = 0;

  var index = '';
  var indexCounter = 65;

  var Grids = [];

  for (var i = 0; i < gridSizeY; i++) {
    for (var j = 0; j < gridSizeX; j++) {
      startX = width * j / gridSizeX;
      lengthX = width * 1 / gridSizeX;
      startY = height * i / gridSizeY;
      lengthY = height * 1 / gridSizeY;
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
  for (var i = 0; i < newComerData.length; i++) {
    newComerData[i][0].stimuliName = newComerData[i][0].stimuliName.replace('\r', '');
    if (newComerData[i][0].stimuliName === stimuliUsed) {
      indexP = i;
      indexFound = 1;
    }
  }
  if (indexFound) {
    for (var i = 0; i < newComerData[indexP].length; i++) {
      for (var j = 0; j < Grids.length; j++) {
        var op_y = Grids[j].startY + Grids[j].lengthY;
        var op_x = Grids[j].startX + Grids[j].lengthX;
        if ((Grids[j].startY <= newComerData[indexP][i].y) & (newComerData[indexP][i].y <= op_y) & (Grids[j].startX <= newComerData[indexP][i].x) & (newComerData[indexP][i].x <= op_x)) {
          unknownPath = unknownPath.concat(Grids[j].index);
        }
      }
    }
  }
  console.log(unknownPath);
}
var durationsStr = '';

function sendSta(grid, stimuli, arr) {
  var indx = -1;
  var points = new Array();
  var rwData = {};
  var t;
  for (var i = 0; i < arr.length; i++) {
    arr[i][0][0].stimuliName = arr[i][0][0].stimuliName.replace("\r", "");
    if (arr[i][0][0].stimuliName === stimuli) {
      indx = i;
    }
  }
  for (var i = 0; i < arr[indx].length; i++) {
    for (var j = 0; j < arr[indx][i].length; j++) {
      var test = new vis.DataSet();
      var val = test.add(arr[indx][i][j]);
      if (j === 0) {
        var is = false;
      } else if (arr[indx][i][j].stimuliName === arr[indx][i][j - 1].stimuliName) {
        var is = true;
      } else {
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
  var hfidelity = document.getElementById("fidelity");
  var h_fidelity = false;
  if ($(fidelity).is(':checked')) {
    h_fidelity = true;
  }
  var setting = {
    sta: {
      daccuracy: daccuracy,
      sizeOfScreen: sizeOfScreen,
      distance: distance,
      resX: width,
      resY: height,
      tlevel: tlevel,
      hfidelity: h_fidelity
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
    data: {
      jsondata: jsondata
    },
    crossDomain: true,
    success: function(response) {
      dataResponse = response;
    },
    async: false
  });
  dataResponse = JSON.parse(dataResponse);
  dataResponse = JSON.stringify(dataResponse);
  if (dataResponse != " ") {
    var respond = dataResponse;
    respond = respond.split('[');
    path = "";
    path = path.concat(respond[1][1]);
    for (var xr = 5; xr < respond[1].length; xr = xr + 4) {
      path = path.concat(respond[1][xr]);
      path = path.replaceAll('"', '');
    }
    durations = respond[2].split(',');
    t_mp = durations.length - 1;
    durations[t_mp] = durations[t_mp].replaceAll(']', '');
    for (var xr = 0; xr < durations.length; xr++) {
      durationsStr = durationsStr.concat(String(durations[xr]) + " ");
      console.log(durations[xr]);
    }
  }
  return path;
}

function levenshtein(a, b) {
  if (a.length === 0) {
    return b.length;
  }
  if (b.length === 0) {
    return a.length;
  }

  var matrix = [];

  // increment along the first column of each row
  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
}

var result = '';

function prediction(unknown, autistic, control, gridX, gridY) {
  result = '';
  var comparisonUnknownAutistic = levenshtein(unknown, autistic);
  var comparisonUnknownControl = levenshtein(unknown, control);
  var similarityRate;
  if (comparisonUnknownControl < comparisonUnknownAutistic) {
    similarityRate = 1 - (comparisonUnknownControl / Math.max(unknown.length, control.length));
    console.log("NOT AUTISTIC " + similarityRate);
    similarityRate = 100 * similarityRate;
    result = result.concat("Not Autistic," + similarityRate);
  } else if (comparisonUnknownAutistic < comparisonUnknownControl) {
    similarityRate = 1 - (comparisonUnknownAutistic / Math.max(unknown.length, autistic.length));
    console.log("AUTISTIC " + similarityRate);
    similarityRate = 100 * similarityRate;
    result = result.concat("Autistic," + similarityRate);
  } else {
    similarityRate = 1 - (comparisonUnknownAutistic / Math.max(unknown.length, autistic.length));
    console.log("SYSTEM CANNOT DECIDE " + similarityRate);
    similarityRate = 100 * similarityRate;
    result = result.concat("System Cannot Decide," + similarityRate);
  }
  tmp = result.split(",");
  tmp[1] = tmp[1].substring(0, 4);
  //    $(document).ready(function(){
  //      $("#myModal").modal();
  //      $('#result').html("Closer Group: " + tmp[0] + " -- Certainty(%): " + tmp[1]);
  //    });
  visualize(unknown, autistic, control, gridX, gridY);
}

$(document).ready(function() {
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

document.getElementById("screenshot").addEventListener('change', function() {
  //Read the contents of Image File.
  var reader = new FileReader();

  reader.onload = ImageDone;

  //Initiate the JavaScript Image object.
  var image = new Image();

  //Validate the File Height and Width.

  reader.readAsDataURL(this.files[0]);
})

var ImageDone = function(event) {
  var image = new Image();
  image.onload = function() {
    height = image.height;
    width = image.width;
    console.log(height + " " + width);
  };
  image.src = event.target.result;
};
var myInterval;

function StopInterval() {
  clearInterval(myInterval);
}


var container;
var network;
var nodes;
var edges;
var startNode = new Array();
var n = new Array();
var e = new Array();
var indexHolder = new Array();
var gridX_c;
var gridY_c;

//Visualisation
function visualize(unknown, autistic, control, gridX, gridY) {
  n = [];
  e = [];
  document.getElementById("output").style.display = "block";
  window.scrollTo(1000, document.body.scrollHeight);
  startNode = new Array();
  var startEdge = new Array();
  container = document.getElementById("mynetwork");
  var bckgrnd = objectDB[0].image_path;
  bckgrnd = bckgrnd.split("\\");
  var wrtPrmt = 0;
  var backgroundSet = '';
  for(var qw = 0; qw < bckgrnd.length; qw++){
    if(bckgrnd[qw] === "CPS"){
      backgroundSet = backgroundSet.concat("\\localhost/CPS");
      wrtPrmt = 1;
    }
    if(wrtPrmt & bckgrnd[qw] != "CPS"){
      backgroundSet = backgroundSet.concat(bckgrnd[qw]);
    }
    if(qw != bckgrnd.length - 1){
      backgroundSet = backgroundSet.concat("/");
    }
  }
  container.style.backgroundImage = "url('" + backgroundSet + "')";
  var h = height;
  var w = width;
  if (w > 1000) {
    h = h / 2;
    w = w / 2;
  }
  container.style.height = h;
  container.style.width = w;

  var margin = w / 2;
  document.getElementById("autisticBox").style.margin = "0px 0px 0px " + (margin - 180) + "px";
  document.getElementById("speedLabel").style.margin = "0px 0px 0px " + (margin - 122) + "px";

  var rowLength = h / parseInt(gridX);
  var columnLength = w / parseInt(gridY);
  gridX_c = parseInt(gridX);
  gridY_c = parseInt(gridY);
  index = 1;
  startNode[0] = index;
  indexHolder[0] = index;
  for (var i = 0; i < autistic.length; i++) {
    var num = autistic.charCodeAt(i);
    num = num - 65;
    var hh = parseInt(gridY);
    var row = num / hh;
    row = Math.floor(row);
    var g = parseInt(gridY);
    var column = num % g;
    var y = row * rowLength + Math.floor(Math.random() * rowLength);
    var x = column * columnLength + Math.floor(Math.random() * columnLength);
    if (index == startNode[0]) {
      n.push({
        id: index,
        x: x,
        y: y,
        color: "#D20606",
        border: '#6E1515',
        size: 10,
        //        label: String.fromCharCode(num+65),
      });
    } else {
      n.push({
        id: index,
        x: x,
        y: y,
        color: "#D20606",
        size: 5,
        //        label: String.fromCharCode(num+65),
      });
    }
    e.push({
      id: index,
      from: (index - 1),
      to: index,
      color: {
        color: "#D20606",
      },
    });
    index++;
  }
  startNode[1] = index;
  indexHolder[1] = index;
  for (var i = 0; i < control.length; i++) {
    var num = control.charCodeAt(i);
    num = num - 65;
    var hh = parseInt(gridY);
    var row = num / hh;
    row = Math.floor(row);
    var g = parseInt(gridY);
    var column = num % g;
    var y = row * rowLength + Math.floor(Math.random() * rowLength);
    var x = column * columnLength + Math.floor(Math.random() * columnLength);
    if (index == startNode[1]) {
      n.push({
        id: index,
        x: x,
        y: y,
        color: '#093E91',
        border: '#000306',
        size: 10,
      });
    } else {
      n.push({
        id: index,
        x: x,
        y: y,
        color: '#093E91',
        size: 5,
      });
    }
    if (index != startNode[1]) {
      var t = {
        id: index,
        from: (index - 1),
        to: index,
        color: {
          color: "#093E91",
        },
      }
      e.push(t);
    }
    index++;
  }
  startNode[2] = index;
  indexHolder[2] = index;
  for (var i = 0; i < unknown.length; i++) {
    var num = unknown.charCodeAt(i);
    num = num - 65;
    var hh = parseInt(gridY);
    var row = num / hh;
    row = Math.floor(row);
    var g = parseInt(gridY);
    var column = num % g;
    var y = row * rowLength + Math.floor(Math.random() * rowLength);
    var x = column * columnLength + Math.floor(Math.random() * columnLength);
    if (index == startNode[2]) {
      n.push({
        id: index,
        x: x,
        y: y,
        color: '#15910A',
        border: '#1C6E15',
        size: 10,
      });
    } else {
      n.push({
        id: index,
        x: x,
        y: y,
        color: '#15910A',
        size: 5,
      });
    }
    if (index != startNode[2]) {
      e.push({
        id: index,
        from: (index - 1),
        to: index,
        color: {
          color: "#15910A",
        },
      });
    }
    index++;
  }
  startNode[3] = index;
  indexHolder[3] = index;

  for (var i = 0; i < parseInt(gridX); i++) {
    for (var j = 0; j < parseInt(gridY); j++) {
      index++;
      var y = i * rowLength;
      var x = j * columnLength;
      n.push({
        id: index,
        x: x,
        y: y,
        color: "#ffffff00",
        size: 25,
      })
      index++;
      var y = i * rowLength + rowLength;
      var x = j * columnLength;
      n.push({
        id: index,
        x: x,
        y: y,
        color: "#ffffff00",
        size: 25,
      })
      e.push({
        from: (index - 1),
        to: (index),
        width: 4,
        arrows: {
          to: {
            enabled: false,
          }
        },
        color: {
          color: "#606F74",
        },
      })
      index++;
      var y = i * rowLength;
      var x = j * columnLength;
      n.push({
        id: index,
        x: x,
        y: y,
        color: "#ffffff00",
        size: 25,
      })
      index++;
      var y = i * rowLength;
      var x = j * columnLength + columnLength;
      n.push({
        id: index,
        x: x,
        y: y,
        color: "#ffffff00",
        size: 25,
      })
      e.push({
        from: (index),
        to: (index - 1),
        width: 4,
        arrows: {
          to: {
            enabled: false,
          }
        },
        color: {
          color: "#606F74",
        },
      })
    }
    index++;
    n.push({
      id: index,
      x: x,
      y: y + rowLength,
      color: "#ffffff00",
      size: 25,
    })
    e.push({
      from: (index),
      to: (index - 1),
      width: 4,
      arrows: {
        to: {
          enabled: false,
        }
      },
      color: {
        color: "#606F74",
      },
    })
  }
  index++;
  var y = (parseInt(gridX)) * rowLength;
  var x = (parseInt(gridY)) * columnLength;
  n.push({
    id: index,
    x: x,
    y: y,
    color: "#ffffff00",
    size: 25,
  })
  e.push({
    from: (index),
    to: (index - 4),
    width: 4,
    arrows: {
      to: {
        enabled: false,
      }
    },
    color: {
      color: "#606F74",
    },
  })

  for (var i = 0; i < gridY - 1; i++) {
    index = index - 4;
    e.push({
      from: (index),
      to: (index - 4),
      width: 4,
      arrows: {
        to: {
          enabled: false,
        }
      },
      color: {
        color: "#606F74",
      },
    })
  }
  index++;
  startNode[4] = index;

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
      //color: "#cc00ff",
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
      arrows: {
        to: {
          enabled: true,
        }
      }
    },

    physics: false,
    interaction: {
      dragNodes: false, // do not allow dragging nodes
      zoomView: false, // do not allow zooming
      dragView: false // do not allow dragging
    }
  };

  network = new vis.Network(container, data, options);
  if (document.getElementById("element")) {
    var tempElem = document.getElementById("element");
    tempElem.remove();
  }
  var element = document.createElement("div");
  element.setAttribute("id", "element");
  var tempArray = result.split(",");
  element.appendChild(document.createTextNode("Result: " + tempArray[0]));
  element.appendChild(document.createElement('br'));
  tempArray2 = tempArray[1].split(".");
  element.appendChild(document.createTextNode("Certainty: %" + tempArray2[0] + "." + tempArray2[1][0] + tempArray2[1][1]));
  element.style.color = "white";
  element.style.fontSize = "24px";
  if (parseInt(objectDB[0].width) > 1000) {
    var pl = parseInt(objectDB[0].width) / 2 + 100;
    var pl2 = -parseInt(objectDB[0].height) / 4 - 130;;
  } else {
    var pl = parseInt(objectDB[0].width) + 100;
    var pl2 = -parseInt(objectDB[0].height) / 2 - 130;;
  }
  console.log(pl + " " + pl2);
  element.style.margin = pl2.toString() + "px 0px 0px " + pl.toString() + "px";
  document.getElementById('output').appendChild(element);
}

function displayCustomizedPaths() {
  var nn = new Array();
  var ee = new Array();
  var i_tracker = 0;
  index = 1;
  StopInterval();
  var h = objectDB[0].height;
  var w = objectDB[0].width;
  if (w > 1000) {
    h = h / 2;
    w = w / 2;
  }
  var rowLength = h / parseInt(objectDB[0].grid_x);
  var columnLength = w / parseInt(objectDB[0].grid_y);
  var gridX = objectDB[0].grid_x;
  gridX_c = gridX;
  var gridY = objectDB[0].grid_y;
  gridY_c = gridY;
  var autisticCheckBox = document.getElementById("autisticBox");
  var controlCheckBox = document.getElementById("controlBox");
  var unknownCheckBox = document.getElementById("unknownBox");
  startNode[0] = -1;
  if ($(autisticCheckBox).is(':checked')) {
    startNode[0] = index;
    for (var i = 0; i < objectDB[0].autistic_path.length; i++) {
      var num = objectDB[0].autistic_path.charCodeAt(i);
      num = num - 65;
      var hh = parseInt(gridY);
      var row = num / hh;
      row = Math.floor(row);
      var g = parseInt(gridY);
      var column = num % g;
      var y = n[indexHolder[0] + i - 1].y;
      var x = n[indexHolder[0] + i - 1].x;
      if (index == startNode[0]) {
        nn.push({
          id: index,
          x: x,
          y: y,
          color: "#D20606",
          border: '#6E1515',
          size: 10,
        });
      } else {
        nn.push({
          id: index,
          x: x,
          y: y,
          color: "#D20606",
          size: 5,
        });
      }
      ee.push({
        id: index,
        from: (index - 1),
        to: index,
        color: {
          color: "#D20606",
        },
      });
      index++;
    }
  }
  startNode[1] = -1;
  if ($(controlCheckBox).is(':checked')) {
    startNode[1] = index;
    for (var i = 0; i < objectDB[0].control_path.length; i++) {
      var num = objectDB[0].control_path.charCodeAt(i);
      num = num - 65;
      var hh = parseInt(gridY);
      var row = num / hh;
      row = Math.floor(row);
      var g = parseInt(gridY);
      var column = num % g;
      var y = n[indexHolder[1] + i - 1].y;
      var x = n[indexHolder[1] + i - 1].x;
      if (index == startNode[1]) {
        nn.push({
          id: index,
          x: x,
          y: y,
          color: '#093E91',
          border: '#000306',
          borderWidth: 2,
          size: 10,
        });
      } else {
        nn.push({
          id: index,
          x: x,
          y: y,
          color: '#093E91',
          size: 5,
        });
      }
      if (index != startNode[1]) {
        var t = {
          id: index,
          from: (index - 1),
          to: index,
          color: {
            color: "#093E91",
          },
        }
        ee.push(t);
      }
      index++;
    }
  }
  startNode[2] = -1;
  if ($(unknownCheckBox).is(':checked')) {
    startNode[2] = index;
    for (var i = 0; i < unknownPath.length; i++) {
      var num = unknownPath.charCodeAt(i);
      num = num - 65;
      var hh = parseInt(gridY);
      var row = num / hh;
      row = Math.floor(row);
      var g = parseInt(gridY);
      var column = num % g;
      var y = n[indexHolder[2] + i - 1].y;
      var x = n[indexHolder[2] + i - 1].x;
      if (index == startNode[2]) {
        nn.push({
          id: index,
          x: x,
          y: y,
          color: '#15910A',
          border: '#1C6E15',
          size: 10,
        });
      } else {
        nn.push({
          id: index,
          x: x,
          y: y,
          color: '#15910A',
          size: 5,
        });
      }
      if (index != startNode[2]) {
        ee.push({
          id: index,
          from: (index - 1),
          to: index,
          color: {
            color: "#15910A",
          },
        });
      }
      index++;
    }
  }
  startNode[3] = index;

  for (var i = 0; i < parseInt(gridX); i++) {
    for (var j = 0; j < parseInt(gridY); j++) {
      index++;
      var y = i * rowLength;
      var x = j * columnLength;
      nn.push({
        id: index,
        x: x,
        y: y,
        color: "#ffffff00",
        size: 25,
      })
      index++;
      var y = i * rowLength + rowLength;
      var x = j * columnLength;
      nn.push({
        id: index,
        x: x,
        y: y,
        color: "#ffffff00",
        size: 25,
      })
      ee.push({
        from: (index - 1),
        to: (index),
        width: 4,
        arrows: {
          to: {
            enabled: false,
          }
        },
        color: {
          color: "#606F74",
        },
      })
      index++;
      var y = i * rowLength;
      var x = j * columnLength;
      nn.push({
        id: index,
        x: x,
        y: y,
        color: "#ffffff00",
        size: 25,
      })
      index++;
      var y = i * rowLength;
      var x = j * columnLength + columnLength;
      nn.push({
        id: index,
        x: x,
        y: y,
        color: "#ffffff00",
        size: 25,
      })
      ee.push({
        from: (index),
        to: (index - 1),
        width: 4,
        arrows: {
          to: {
            enabled: false,
          }
        },
        color: {
          color: "#606F74",
        },
      })
    }
    index++;
    nn.push({
      id: index,
      x: x,
      y: y + rowLength,
      color: "#ffffff00",
      size: 25,
    })
    ee.push({
      from: (index),
      to: (index - 1),
      width: 4,
      arrows: {
        to: {
          enabled: false,
        }
      },
      color: {
        color: "#606F74",
      },
    })
  }
  index++;
  var y = (parseInt(gridX)) * rowLength;
  var x = (parseInt(gridY)) * columnLength;
  nn.push({
    id: index,
    x: x,
    y: y,
    color: "#ffffff00",
    size: 25,
  })
  ee.push({
    from: (index),
    to: (index - 4),
    width: 4,
    arrows: {
      to: {
        enabled: false,
      }
    },
    color: {
      color: "#606F74",
    },
  })
  for (var i = 0; i < gridY - 1; i++) {
    index = index - 4;
    ee.push({
      from: (index),
      to: (index - 4),
      width: 4,
      arrows: {
        to: {
          enabled: false,
        }
      },
      color: {
        color: "#606F74",
      },
    })
  }

  nodes = new vis.DataSet(nn);
  edges = new vis.DataSet(ee);

  container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges,
  }
  var options = {
    nodes: {
      shape: "dot",
      //  color: '#cc00ff',
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
      arrows: {
        to: {
          enabled: true,
        }
      }
    },

    physics: false,
    interaction: {
      dragNodes: false, // do not allow dragging nodes
      zoomView: false, // do not allow zooming
      dragView: false // do not allow dragging
    }
  };
  network = new vis.Network(container, data, options);
  var tempElem = document.getElementById("element");
  tempElem.remove();
  var element = document.createElement("div");
  element.setAttribute("id", "element");
  var tempArray = result.split(",");
  element.appendChild(document.createTextNode("Result: " + tempArray[0]));
  element.appendChild(document.createElement('br'));
  tempArray2 = tempArray[1].split(".");
  element.appendChild(document.createTextNode("Certainty: %" + tempArray2[0] + "." + tempArray2[1][0] + tempArray2[1][1]));
  element.style.color = "white";
  element.style.fontSize = "24px";
  if (parseInt(objectDB[0].width) > 1000) {
    var pl = parseInt(objectDB[0].width) / 2 + 100;
    var pl2 = -parseInt(objectDB[0].height) / 4 - 130;;
  } else {
    var pl = parseInt(objectDB[0].width) + 100;
    var pl2 = -parseInt(objectDB[0].height) / 2 - 130;
  }
  console.log(pl + " " + pl2);
  element.style.margin = pl2.toString() + "px 0px 0px " + pl.toString() + "px";
  document.getElementById('output').appendChild(element);
}

function animation() {
  for (t = 1; t < startNode[3]; t++) {
    nodes.update({
      id: t,
      color: "#ffffff00"
    });
    network.body.data.edges.clear({
      id: t
    });
  }
  var tmp_index = startNode[3];
  for (var i = 0; i < parseInt(gridX_c); i++) {
    for (var j = 0; j < parseInt(gridY_c); j++) {
      tmp_index++;
      tmp_index++;
      network.body.data.edges.add([{
        from: tmp_index,
        to: parseInt(tmp_index) - 1,
        color: {
          color: "#606F74"
        },
        hidden: false,
        width: 4,
        arrows: {
          to: {
            enabled: false,
          }
        },
      }]);
      tmp_index++;
      tmp_index++;
      network.body.data.edges.add([{
        from: tmp_index,
        to: parseInt(tmp_index) - 1,
        color: {
          color: "#606F74"
        },
        hidden: false,
        width: 4,
        arrows: {
          to: {
            enabled: false,
          }
        },
      }]);
    }
    tmp_index++;
    network.body.data.edges.add([{
      from: tmp_index,
      to: parseInt(tmp_index) - 1,
      color: {
        color: "#606F74"
      },
      hidden: false,
      width: 4,
      arrows: {
        to: {
          enabled: false,
        }
      },
    }]);
  }
  tmp_index++;

  network.body.data.edges.add([{
    from: tmp_index,
    to: (parseInt(tmp_index) - 4),
    color: {
      color: "#606F74"
    },
    hidden: false,
    width: 4,
    arrows: {
      to: {
        enabled: false,
      }
    },
  }]);
  for (var i = 0; i < gridY_c - 1; i++) {
    tmp_index = tmp_index - 4;
    network.body.data.edges.add([{
      from: tmp_index,
      to: (parseInt(tmp_index) - 4),
      color: {
        color: "#606F74"
      },
      hidden: false,
      width: 4,
      arrows: {
        to: {
          enabled: false,
        }
      },
    }]);
  }
  StopInterval();
  var i = startNode[0];
  var j = startNode[1];
  var k = startNode[2];
  var i_end = startNode[1];
  var j_end = startNode[2];
  if (i_end == -1 && j_end == -1) {
    i_end = startNode[3];
  } else if (i_end == -1) {
    i_end = startNode[2];
  } else if (j_end == -1) {
    j_end = startNode[3];
  }
  var mySpeed = document.getElementById("speedValue").value;
  mySpeed = mySpeed * 1000 //Convert to milliseconds
  myInterval = setInterval(function() {
    if (((i === i_end) || (i == -1)) && ((j === j_end) || (j == -1)) && ((k === startNode[3]) || (k == -1))) {
      nodes.update({
        id: i,
        size: 5,
        color: "#D20606"
      });
      nodes.update({
        id: j,
        size: 5,
        color: "#093E91"
      });
      nodes.update({
        id: k,
        size: 5,
        color: "#15910A"
      });
      StopInterval();
    } else {
      if ((i != i_end - 1) && (i != -1)) {
        if (i == startNode[0])
          nodes.update({
            id: i,
            color: "#D20606",
            size: 10
          });
        else
          nodes.update({
            id: i,
            color: "#D20606",
            size: 5
          });
        nodes.update({
          id: i + 1,
          color: "#D20606",
          size: 15
        });
        network.body.data.edges.add([{
          from: i,
          to: i + 1,
          color: {
            color: "#D20606"
          },
          hidden: false
        }]);
        i = i + 1;
      }
      if ((j != j_end - 1) && (j != -1)) {
        if (j == startNode[1])
          nodes.update({
            id: j,
            color: "#093E91",
            size: 10
          });
        else
          nodes.update({
            id: j,
            color: "#093E91",
            size: 5
          });
        nodes.update({
          id: j + 1,
          color: "#093E91",
          size: 15
        });
        network.body.data.edges.add([{
          from: j,
          to: j + 1,
          color: {
            color: "#093E91"
          },
          hidden: false
        }]);
        j = j + 1;
      }
      if ((k != startNode[3] - 1) && (k != -1)) {
        if (k == startNode[2])
          nodes.update({
            id: k,
            color: "#15910A",
            size: 10
          });
        else
          nodes.update({
            id: k,
            color: "#15910A",
            size: 5
          });
        nodes.update({
          id: k + 1,
          color: "#15910A",
          size: 15
        });
        network.body.data.edges.add([{
          from: k,
          to: k + 1,
          color: {
            color: "#15910A"
          },
          hidden: false
        }]);
        k = k + 1;
      }
      network.redraw;
    }
  }, mySpeed);
}
