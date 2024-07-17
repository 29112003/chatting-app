const socket = io();
const input = document.querySelector(".input")
const messageBox = document.querySelector(".message")

document.querySelector(".send").addEventListener("click", function(e){
    socket.emit("message", input.value)
    input.value = "";
})

input.addEventListener("keydown", function(e){

    if( e.key === "Enter" &&  e.shiftKey) {
        const cursorPosition = input.selectionStart;
        input.value = input.value.slice(0,cursorPosition)+"\n"+input.value.slice(cursorPosition)
        input.selectionStart = cursorPosition+1;
        input.selectionEnd = cursorPosition+1;
    }else if(e.key === "Enter"){
        e.preventDefault();
        socket.emit("message", input.value)
        input.value = "";
    }
})
var totalCount = document.querySelector("#people");
// console.log(totalCount.textContent);
socket.on("people", function(people){
    totalCount.textContent = people;
})
socket.on("name",function(name){
    console.log(name);
    console.log("kaise ho")
})
var cutter = "";
socket.on("message",function(data){
    const messageWithBreak = data.message.replace(/\n/g, "<br>");
    cutter += `
<div class="flex flex-col items-end mb-2 space-y-1">
    <div class=" p-3 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg rounded-l-lg  rounded-br-lg">
        <div class="text-xs font-semibold text-gray-200">${data.username}</div>
        <p class="text-xl mt-1  text-white  whitespace-pre-line">${messageWithBreak}</p>
    </div>
</div>`
                    
                    messageBox.innerHTML = cutter;
                    
})

var overlay = document.querySelector(".overlay");
var resetName = document.querySelector(".resetName");
resetName.addEventListener("click", function(e){
    overlay.classList.toggle("hidden");
})
var nameChangingInput = document.querySelector(".nameChangingInput")
var nameChangeSubmit = document.querySelector(".nameChangeSubmit")
var username = document.querySelector(".username")

nameChangingInput.addEventListener("input", function(){
    if(nameChangingInput.value.length > 1){
        nameChangingInput.value = nameChangingInput.value.replace(/ /g,"_")
    }
    else{
        nameChangingInput.value = nameChangingInput.value.trim();
    }
})

nameChangeSubmit.addEventListener("click", function(e){
    if(nameChangingInput.value.length > 0){
        username.textContent = nameChangingInput.value;
        socket.emit("name", nameChangingInput.value);
        nameChangingInput.value = ""
        overlay.classList.toggle("hidden");
    }

})