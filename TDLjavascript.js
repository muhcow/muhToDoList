//main javascrpt


//add new item to list
//also add style class to it
//and then also reset the form which has text in it
function addItem(newItem){

    //make new list element and add text and styles
    var listNode = document.createElement("LI");  
    var newNode = document.createTextNode(newItem.data);
    listNode.appendChild(newNode);
    listNode.classList.add("listStyle");

    //add delete item on click event listener
    listNode.addEventListener("click", function deleteItem(event){
        var callingNode = event.target;
        var list = document.getElementById("myList");
        var currentIndex = Array.prototype.indexOf.call(document.getElementById("myList"), callingNode);
        list.removeChild(callingNode);
    });

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
        imageNode.setAttribute("src",'like.png'); 
        imageNode.setAttribute("id", "heartIcon");
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
        //animeList.appendChild(document.createElement("br"));
        var episodeNode = document.createTextNode("Episodes: " + episodes);
        animeList.appendChild(episodeNode);
        animeList.classList.add("listStyle"); 
        listNode.appendChild(animeList);   
        //listNode.classList.add("listStyle"); 
            
        //add click to delete and add to main list event listener
        listNode.addEventListener("click", function deleteItem(event){ 
            var list = document.getElementById("mySearch");
            var title = document.createTextNode(list.lastElementChild.lastChild.nodeValue);
            addItem(title);
            list.removeChild(list.firstElementChild);
        });
        
        //add element to search list and reset form field
        listNode.classList.add("myLike");
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