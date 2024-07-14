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

