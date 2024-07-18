const socket = io();
const input = document.querySelector(".input")
const messageBox = document.querySelector(".message")

document.querySelector(".send").addEventListener("click", function(e){
    socket.emit("message", input.value)
    input.value = "";
})

input.addEventListener('input', () => {
    socket.emit('typing',  `${socket.id}`);
});

input.addEventListener('blur', () => {
    socket.emit('stop typing');
});
socket.on('typing', (data) => {
    document.querySelector('.typing-status').innerText =  data;
});
socket.on('stop typing', () => {
    document.querySelector('.typing-status').innerText = '';
});

input.addEventListener("keydown", function(e){

    if( e.key === "Enter" &&  e.shiftKey) {
        const cursorPosition = input.selectionStart;
        input.value = input.value.slice(0,cursorPosition)+"\n"+input.value.slice(cursorPosition)
        input.selectionStart = cursorPosition+1;
        input.selectionEnd = cursorPosition+1;
    }else if(e.key === "Enter"){
        e.preventDefault();
        if(input.value.length > 0){
            socket.emit("message", input.value)
            input.value = "";
            socket.emit('stop typing');//for is typing
        }else{
        }
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
<div class="flex ${data.id === socket.id ? 'justify-end' : 'justify-start'} mb-2 space-y-1">
    <div class=" p-3 bg-gradient-to-r ${data.id === socket.id ? 'rounded-l-lg  rounded-br-lg' : 'rounded-lg rounded-tl-none'} from-blue-400 to-blue-600 shadow-lg">
        <div class="text-xs font-semibold text-gray-200">${data.username}</div>
        <p class="text-xl mt-1  text-white  whitespace-pre-line">${messageWithBreak}</p>
    </div>
</div>`
                    
                    messageBox.innerHTML = cutter;
                    document.querySelector(".message-container").scrollTop = document.querySelector(".message-container").scrollHeight;
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