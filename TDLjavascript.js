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

/*
//find index of clicked element and remove that element from the list
function deleteItem(event){
    var callingNode = event.target.value;
    var currentIndex = Array.prototype.indexOf.call(document.getElementById("myList"), callingNode);
    console.log(currentIndex);
    console.log(event.target.value);
    //list.removeChild(list.childNodes[0]);

}
*/

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