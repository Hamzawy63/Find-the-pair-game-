function changeBackGround(color) {
   document.body.style.backgroundColor = color; 
}
window.onload = function() {
  changeBackGround('red');
  setTimeout(function() {
    changeBackGround('blue');
  }, 1000);
}

var size = 4; // this value is changeable by the user 
var click = 0; 
//--------------------------------
function addTable(n1,n2) { // n1 is always equal  n2 but we make the function more general    
  var counter = 0 ; 
  var myTableDiv = document.getElementById("puzzle");
  var table = document.createElement('TABLE');
  

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  for (var i = 0; i < n1; i++) {
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);

    for (var j = 0; j < n2; j++) {
        var td = document.createElement('TD');
        var img = document.createElement('IMG');
        
        var att = document.createAttribute('src');
        att.value = "https://via.placeholder.com/80";
        
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
    element.src = miniSources[element.id];
     setTimeout(function() {
    checkImg(element);
  }, 500);
}
function checkImg(element)
{
    
    //element.src = miniSources[element.id];  
   
    if(click%2 == 0)
    {
       console.log("click number "+click);        
    }
    else
    {
        var flag = false;
        var alltds = document.querySelectorAll("TD");

        for(var k = 0 ;k<alltds.length ;k++)
        {
            var image = alltds[k].firstChild;
            console.log(element.src+"<<>>"+image.src) //not important just debugger helper 
            
            if(element.src == image.src && image.id !=element.id)
            {
                //alert("dfadfsf");
                flag = true;
                image.dataset.matched = "true";
                element.dataset.matched = "true";
            }
        }           
        if(flag == false){
             for(var l = 0 ;l<alltds.length ;l++ )
             {
                var image = alltds[l].firstChild;
                 if(image.dataset.matched == "false")
                     {
                         image.src = "https://via.placeholder.com/80/" ;
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








