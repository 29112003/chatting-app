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


var cutter = "";
socket.on("message",function(data){
    const messageWithBreak = data.replace(/\n/g, "<br>");
    cutter += `<div class="flex justify-end " >
                        <div class="rounded-l-lg p-3 bg-blue-500 rounded-br-lg text-white">
                            <p class="text-sm">
                                ${messageWithBreak}
                            </p>
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
        // console.log(nameChangingInput.value)
        username.textContent = nameChangingInput.value;
        socket.emit("name", nameChangingInput.value);
        nameChangingInput.value = ""
        overlay.classList.toggle("hidden");
        // console.log("hello")
    }

})