document.addEventListener("DOMContentLoaded", getData("findall"), false);

function getData(url, i){
  let r_url = new URL("http://localhost:8082/"+url);
  /* optioneel: i */
  r_url.searchParams.set("id", i);
  let r = new XMLHttpRequest();
  r.onreadystatechange = function(){
    if(this.readyState==4){
      var data = JSON.parse(this.responseText);
      if(url=="findall"){
        /* laat data zien in een tabel */
        showTable(data);
      }
      if(url=="findone"){
        /* wijzig de interface en vul het formulier in */
        showWijzigen();
        fillForm(data);
      }            
    };
  }
  r.open("GET",r_url, true);
  r.send();
 } 

function postData(url, data){
  let r = new XMLHttpRequest();
  r.onreadystatechange = function(){
    if(this.readyState==4){
      if(url=="delete"){
        /* na het verwijderen: tabel refreshen*/
        resetTable();
        getData("findall");
      }
      if(url=="save"){
        /* tabel refreshen, interface updaten */
        resetTable();
        getData("findall");
        showToevoegen();      
      }
    };
  }
  r.open("POST","http://localhost:8082/"+url,true); //asynchroon
  r.setRequestHeader("Content-Type","application/json");
  r.send(data);
}

function btnVerwijderen(x){
  /* instantie verwijderen */
  postData("delete", x.id);
}

function btnWijzigen(x){
  /* instantie ophalen, om te wijzigen */
  getData("findone",x.id);  
}

function save(){
  /* nieuwe instantie toevoegen */
  var id = "";
  var wijk = document.getElementById("wijk").value;
  var cap = document.getElementById("cap").value;
  var raam = document.getElementById("raam").checked;
  
  note = document.getElementById("notification_save");
  if(checkInput(note, wijk, cap)){
    emptyFields();
    saveOrUpdate(id, wijk, cap, raam);
  }  
}

function update(){
  /* gewijzigde gegevens extraheren */
  var id = document.getElementById("w_id").value;
  var wijk = document.getElementById("w_wijk").value;
  var cap = document.getElementById("w_cap").value;
  var raam = document.getElementById("w_raam").checked;

  note = document.getElementById("notification_update");
  if(checkInput(note, wijk, cap)){
    saveOrUpdate(id, wijk, cap, raam);
  }
}

function saveOrUpdate(id, wijk, cap, raam){
  /* optional: id */
  var tafel = {};
  tafel.id = id;
  tafel.wijk = wijk;
  tafel.capaciteit = cap;
  tafel.bijHetRaam = raam;  
  postData("save",JSON.stringify(tafel));
}

function checkInput(note, wijk, cap){
  if(wijk=="" || cap=="" ){
    note.innerHTML="niet alle verplichte velden (wijk en cap) zijn ingevuld";
    note.style.visibility = "visible";
    return;
  }
  if(isNaN(cap)){
    note.innerHTML="capiciteit moet een getal zijn"
    note.style.visibility = "visible";
    return;
  }
  note.style.visibility="hidden";
  return true;
}

function fillForm(tafel){
  /* de gegevens van een opgevraagde instantie laten zien */
  document.getElementById("w_id").value=tafel.id;
  document.getElementById("w_wijk").value = tafel.wijk;
  document.getElementById("w_cap").value = tafel.capaciteit;
  document.getElementById("w_raam").checked = tafel.bijHetRaam;
}

function showToevoegen(){
  /* formulier toevoegen laten zien */
  document.getElementById("toevoegen").style.visibility="visible";
  document.getElementById("wijzigen").style.visibility="hidden";
}

function showWijzigen(){
  /* formulier wijzigen laten zien */
  document.getElementById("toevoegen").style.visibility="hidden";
  document.getElementById("wijzigen").style.visibility="visible";
}

function emptyFields(){
  /* het formulier toevoegen leegmaken */
  document.getElementById("wijk").value="";
  document.getElementById("cap").value="";
  document.getElementById("raam").checked=false;
}

function cancel(){
  /* reset wijzigen, ga terug naar 'start' */
  showToevoegen();
}

function resetTable(){
  document.getElementById("table").innerHTML="";
}

function showTable(data){
  /* maak een tabel gebaseerd op de input */
  resetTable();
  var table = document.getElementById("table");
  var tr_headers = document.createElement("tr");
  tr_headers.innerHTML = "<td>ID</td><td>wijk</td><td>capaciteit</td><td>bij"+
   "het raam</td><td></td><td></td>";
  table.appendChild(tr_headers);
  data.forEach(function(object){
    var tr = document.createElement("tr");
    tr.innerHTML = "<td>" + object.id + "</td>" +
    "<td>" + object.wijk + "</td>" +
    "<td>" + object.capaciteit + "</td>" +
    "<td>" + object.bijHetRaam + "</td>" +
    "<td><input id="+object.id+" type=button value='wijzigen' "+
    "onclick='btnWijzigen(this)'></td>" + "<td><input id="+object.id+" "+
    "type=button value='verwijderen' onclick='btnVerwijderen(this)'></td>";
    table.appendChild(tr);
  });
}