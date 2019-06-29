var size = 4; // this value is changeable by the user 
var click = 0;
var isStartButtonClicked = false; //to assure that start button is clicked before the user play
var sizeIsSelected = false; // to assure that user can not change the size within the game 
//--------------------------------
function addTable(n1,n2) { // n1 is always equal  n2 but we make the function more general    
  var counter = 0 ; 
  var myTableDiv = document.getElementById("puzzle");
  var table = document.createElement('TABLE');
    table.setAttribute("id","tableOfGame");

  

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  for (var i = 0; i < n1; i++) {
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);

    for (var j = 0; j < n2; j++) {
        var td = document.createElement('TD');
        var img = document.createElement('IMG');
        
        var att = document.createAttribute('src');
        att.value = "cover.jpg";
        
        var attr2 = document.createAttribute('onclick');
        attr2.value = "showImg(this)";
        
        var id = document.createAttribute('id');
        id.value = (counter++).toString(); 
        
        var matched = document.createAttribute('data-matched');
        matched.value = "false";
        
        img.setAttributeNode(matched);
        img.setAttributeNode(att);
        img.setAttributeNode(attr2);
        img.setAttributeNode(id);
        td.appendChild(img);
     
      tr.appendChild(td);
    }
  }
  myTableDiv.appendChild(table);
}
// create table 
addTable(size  ,size);
//----------------------------------------------------------
//---Create an array of all sources of the image to be shuffled each time the game starts 
var sources = [
    "img/letters/0.jpg" ,"img/letters/1.jpg" ,"img/letters/2.jpg" ,"img/letters/3.jpg" ,"img/letters/4.jpg" ,"img/letters/5.jpg" ,"img/letters/6.jpg", "img/letters/7.jpg" ,"img/letters/8.jpg" ,"img/letters/9.jpg" ,"img/letters/10.jpg","img/letters/11.jpg"    ,"img/letters/12.jpg","img/letters/13.jpg","img/letters/14.jpg","img/letters/15.jpg"    ,"img/letters/16.jpg","img/letters/17.jpg","img/letters/18.jpg","img/letters/19.jpg"    ,"img/letters/20.jpg","img/letters/21.jpg","img/letters/22.jpg","img/letters/23.jpg","img/letters/24.jpg","img/letters/25.jpg","img/letters/26.jpg","img/letters/27.jpg","img/letters/28.jpg","img/letters/29.jpg","img/letters/30.jpg","img/letters/31.jpg","img/letters/32.jpg","img/letters/33.jpg","img/letters/34.jpg","img/letters/35.jpg"]
//----------------------------------------------------------
var miniSources= [];
for(var k = 0 ;k<((size*size)) ;k++ )
{
    miniSources[k] = sources[k%((size*size)/2)];
}
shuffle(miniSources);
//--------------------------------------------

// on click on the picture we will replace the placeholder with a picture
//shuffle(sources); // to make the shuffle to the sources array 
function  showImg(element)
{
    if(!isStartButtonClicked)
        {
            alert("You have to press start button first ");
            return;
        }
    element.src = miniSources[element.id];
     setTimeout(function() {
    checkImg(element);
  }, 200);
}
function checkImg(element)
{
    
    //element.src = miniSources[element.id];  
   
    if(click%2 == 0)
    {
       //console.log("click number "+click);        
    }
    else
    {
        var flag = false;
        var alltds = document.querySelectorAll("TD");

        for(var k = 0 ;k<alltds.length ;k++)
        {
            var image = alltds[k].firstChild;
            //console.log(element.src+"<<>>"+image.src) //not important just debugger helper 
            
            if(element.src == image.src && image.id !=element.id)
            {
                //alert("dfadfsf");
                flag = true;
                image.dataset.matched = "true";
                element.dataset.matched = "true";
                checkEndOfTheGame();
            }
        }           
        if(flag == false){
             for(var l = 0 ;l<alltds.length ;l++ )
             {
                var image = alltds[l].firstChild;
                 if(image.dataset.matched == "false")
                     {
                         image.src = "cover.jpg" ;
                     }
             }            
        }
        
    }

    click++;
}
function shuffle(array) { // create random shuffling 
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
} 
/// Here we make the counter for the game 
var seconds = 0;
var el = document.getElementById('seconds-counter');


function incrementSeconds() {
    seconds += 1;
    el.innerText = "You have been here for " + seconds + " seconds.";
}
function begin(element){
    var selectBox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if(selectedValue!=4&&selectedValue!=6&&selectedValue!=8)
        {
            alert("You have to select the size");
            return;
        }
    //first we uncover all pictures for a while
    unCoverAllImgs();
    setTimeout(function() {
    coverAllImgs();
  }, 600);
    
    isStartButtonClicked = true;    
    var cancel = setInterval(incrementSeconds, 1000);    
    removeElement(element.id);
   // setTimeout(function(){coverAllImgs();},10);
    document.getElementById("solveBtn").style.display = "inline-block";
    
}

function changeFunc() {
    if(sizeIsSelected == true)
        {
            alert("Size can not be changed during the game ");
            return;
        }
    sizeIsSelected  = true;
    var selectBox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    removeElement("tableOfGame");
    //removeElement("selectBox");
    miniSources = [];
    for(var k = 0 ;k<((selectedValue*selectedValue));k++ )
    {
        
        //alert(miniSources.length);
        miniSources[k] = sources[k%((selectedValue*selectedValue)/2)];
        //alert(miniSources.length);
    }    
    shuffle(miniSources);    
    addTable(selectedValue,selectedValue)
   }


function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    
    element.parentNode.removeChild(element);
}
//removeElement("")


function userQuit()
{
    
     if(confirm("Are you sure you want to uncover the cards ??"))
     {
        
        isStartButtonClicked =true;
        unCoverAllImgs();
         //var text = document.getElementById("seconds-counter"); // remove
         removeElement("seconds-counter");
         var btn =  document.getElementById("solveBtn");
         btn.setAttribute("value","PlayAgain");
         btn.setAttribute("onclick","reload()");
         //remove
         
    
        // alert(text.innerText);
         
     }
    
}
function unCoverAllImgs()
{
     var tds = document.querySelectorAll("TD");
        for(var k = 0;k<tds.length ;k++ )
        {
            var img = tds[k].firstChild; // the image
            img.src = miniSources[img.id]
        }
}
function coverAllImgs()
{
     var tds = document.querySelectorAll("TD");
        for(var k = 0;k<tds.length ;k++ )
        {
            var img = tds[k].firstChild; // the image
            img.src ="cover.jpg";
        }
    
}
function reload()
{
    location.reload();

}
function checkEndOfTheGame()
{
    var flag = 0;
    var tds = document.querySelectorAll("TD");
    for(var k = 0 ;k<tds.length;k++)
    {
        var img = tds[k].firstChild;
        if(img.src.includes("cover.jpg"))
          {  flag = 1; }
    }
    if(flag == 0){
         var text = document.getElementById("seconds-counter");
         alert("Congrats You Finished The game within"+text.innerText.substr(22));
         removeElement("seconds-counter");
         var btn =  document.getElementById("solveBtn");
         btn.setAttribute("value","PlayAgain");
         btn.setAttribute("onclick","reload()");
        }
}