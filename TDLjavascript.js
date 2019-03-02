//main javascrpt


//add new item to list
//also add style class to it
//and then also reset the form which has text in it
function addItem(newItem){

    
    var listNode = document.createElement("LI");  
    var newNode = document.createTextNode(newItem.value);
    listNode.appendChild(newNode);
    listNode.classList.add("listStyle");
    //listNode.onclick = deleteItem;
    listNode.addEventListener("click", function deleteItem(event){
        var callingNode = event.target;
        var list = document.getElementById("myList");
        var currentIndex = Array.prototype.indexOf.call(document.getElementById("myList"), callingNode);
        list.removeChild(callingNode);
       // console.log(currentIndex);
        //console.log(event.target);
        //console.log(document.getElementById("myList").childNodes[0]);
    });
    document.getElementById("myList").appendChild(listNode);
    
    document.getElementById("myForm").reset();
}

//for the number of items in the list remove all of them
function clearList(){
    var list = document.getElementById("myList");
    var i;
    var arrayLength = list.childNodes.length;
        for(i=0;i<arrayLength;i++){
           // console.log("yooop");
            list.removeChild(list.childNodes[0]);
        }
}

//search for anime using jikan rest api
function searchItem(newItem){
    //console.log("yoo wussup");
    var getRequest = 'https://api.jikan.moe/v3/search/';
    getRequest = getRequest + 'anime?q=';
    getRequest = getRequest + newItem.value;
    getRequest = getRequest + '&page=1';
    //console.log(getRequest);

    
    var anime = $.get(
        getRequest,{
            
        },
        //get MAL id of anime you searched for
        function(data){
            var output = data.results[0];
            var animeID = output.mal_id;
            var animeImageURL = output.image_url;
            var animeTitle = output.title;
            //console.log(output);
            //console.log(animeID);
            //console.log(animeTitle);
            //console.log(animeImageURL);
            return output;
        })

        return anime;
    }

    async function addSearch(newItem){
        //recieve anime search request object
        var animeSearch = await searchItem(newItem);
        

        //get the top search result
        var topAnime = animeSearch.results[0];

        //get title, id and image
        var animeID = topAnime.mal_id;
        var animeImageURL = topAnime.image_url;
        var animeTitle = topAnime.title;

        var listNode = document.createElement("LI");  
        var newNode = document.createTextNode(animeTitle);
        listNode.appendChild(newNode);
        listNode.classList.add("listStyle");
        listNode.addEventListener("click", function deleteItem(event){
            var callingNode = event.target;
            var list = document.getElementById("mySearch");
            var currentIndex = Array.prototype.indexOf.call(document.getElementById("mySearch"), callingNode);
            list.removeChild(callingNode);

        });
        var newSpanNode = document.cre
        document.getElementById("mySearch").appendChild(listNode);
        console.log(animeImageURL);
        
        //add anime image to searchlist
        $('#mySearch').append('<li><img src="' + animeImageURL + '"/></li>');

        //document.getElementById("mySearch").appendChild(topAnime.image_url);
        
        document.getElementById("myForm").reset(); 
}

//function to make text+picture element then add it to list



//check if enter is pressed instead of submit button click
//if it is then do the same thing
//wait till DOM is fully loaded to run
window.onload=function(){
var input = document.getElementById("newInput");
    input.addEventListener("keydown",function(event) {  
        if(event.keyCode===13){
            event.preventDefault();
            document.getElementById("addButton").click();
        }
    }
    )
    ;
}    