//main javascrpt


//add new item to list
//also add style class to it
//and then also reset the form which has text in it
function addItem(newItem){

    //make new list element and add text and styles
    var listNode = document.createElement("LI"); 
    
    //find heartBorderIcon element and clone it + add css to it
    var heart = document.getElementById("heartBorder-liked");
    var heartBorderClone = heart.cloneNode(true);
    heartBorderClone.classList.add("heartIcons");
    //find heartIcon element and clone it + add css to it
    var heart = document.getElementById("heartIcon");
    var heartClone = heart.cloneNode(true);
    heartClone.classList.add("heartIcons");
    var liked = true;
    heartClone.addEventListener("click", function changeColor(event){ 
        console.log(this.style);
        if(liked){
            //this.style.opacity = 0;
            this.classList.add("liked");
            // this.id="not-liked";
            liked = false;
            console.log("first if");
            console.log(liked);
          }
          else{
            //this.style.opacity = 1;
            this.classList.remove("liked");
            //this.style.position = "relative";
            //this.id="liked";
            liked = true;
            console.log("else");
            console.log(liked);
          }
            });
    
    listNode.appendChild(heartClone);
    //listNode.appendChild(heartBorderClone);
    
    /*
    //add click event to listNode
    listNode.addEventListener("click", function changeColor(event){ 
    if(this.firstElementChild.id!="not-liked"){
      this.firstElementChild.style.display = "none";
      this.firstElementChild.id="not-liked";
    }
    else{
      this.firstElementChild.style.display = "block";
      this.firstElementChild.style.position = "absolute";
      this.firstElementChild.id="liked";
    }
        });
        */
        
        

  //add to list
  //document.getElementById("myList").appendChild(listNode);

    //add anime title
    var newNode = document.createTextNode(newItem.data);
    listNode.appendChild(newNode);

    //make new trash icon
    var trash = document.getElementById("aniTrash");
    var trashClone = trash.cloneNode(true);
    //add on click event
    trashClone.addEventListener("click", function deleteItem(event){
        var list = document.getElementById("myList");
        list.removeChild(this.parentElement);
    });
    //add hover event (not working r n)
    trashClone.addEventListener("mouseover", function addCss(event){
        this.style.cursor = "pointer"; 
        console.log(this.parentElement);
        this.parentElement.style.textDecoraton =  "line-through";
    });
    listNode.appendChild(trashClone); 
    
    listNode.classList.add("watchList");

  

    //add element to main list
    document.getElementById("myList").appendChild(listNode);
    document.getElementById("myForm").reset();
}

//for the number of items in the list remove all of them
function clearList(){
    var list = document.getElementById("myList");
    var i;
    var arrayLength = list.childNodes.length;
        for(i=0;i<arrayLength;i++){
            list.removeChild(list.childNodes[0]);
        }
}

//search for anime using jikan rest api
function searchItem(newItem){
    //get top search result for anime based on search query
    var getRequest = 'https://api.jikan.moe/v3/search/';
    getRequest = getRequest + 'anime?q=';
    getRequest = getRequest + newItem.value;
    getRequest = getRequest + '&page=1';

    var anime = $.get(
        getRequest,{        
        },
        function(data){
            var output = data.results[0];
            var animeID = output.mal_id;
            var animeImageURL = output.image_url;
            var animeTitle = output.title;
            return output;
        })
        return anime;
    }

    async function addSearch(newItem){
        //recieve anime search request object (waits for api get request to finish)
        var animeSearch = await searchItem(newItem);     

        var topAnime = animeSearch.results[0];
        var animeID = topAnime.mal_id;
        var animeImageURL = topAnime.image_url;
        var animeTitle = topAnime.title;
        var episodes = topAnime.episodes;

        console.log(episodes);    

        //build list element
        var listNode = document.createElement("UL");

        
        //add like icon
        var imageNode = document.createElement("img");
        imageNode.setAttribute("src",'heart-shape-outline.png'); 
        //imageNode.setAttribute("id", "heartIcon");
        imageNode.classList.add("iconStyle");
        listNode.appendChild(imageNode); 

        //add anime image
        var imageNode = document.createElement("img");
        imageNode.setAttribute("src",animeImageURL); 
        imageNode.classList.add("imgStyle");
        listNode.appendChild(imageNode);
        

        //add anime title
        var animeList = document.createElement("UL");
        var titleNode = document.createTextNode(animeTitle);
        animeList.appendChild(titleNode);
        animeList.appendChild(document.createElement("br"));
        var episodeNode = document.createTextNode("Episodes: " + episodes);
        animeList.classList.add("listStyle"); 
        animeList.setAttribute("id",'myAnimeStats');
        animeList.appendChild(episodeNode);
        listNode.appendChild(animeList);   
        //listNode.classList.add("listStyle"); 
            
        //add click to delete and add to main list event listener
        listNode.addEventListener("click", function deleteItem(event){ 
            var list = document.getElementById("mySearch");
            addItem(this.childNodes[2].firstChild);
            list.removeChild(this);
        });
        
        //add element to search list and reset form field
        listNode.classList.add("myLike");
        listNode.classList.add("mySearchList");
        document.getElementById("mySearch").appendChild(listNode);     
        document.getElementById("myForm").reset(); 
}

//check if enter is pressed instead of submit button click
//if it is then do the same thing
//wait till DOM is fully loaded to run
window.onload=function(){
var input = document.getElementById("newInput");
    input.addEventListener("keydown",function(event) {  
        if(event.keyCode===13){
            event.preventDefault();
            document.getElementById("searchButton").click();
        }
    });
}    