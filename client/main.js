var socket = io.connect('http://192.168.0.41:6677',{'forceNew':true});
 socket.on('messages',(data)=>{
     console.log(data);
     render(data);
    });
 function render(datos){
    // cargar los mjes en la caja del chat
    let html = datos.map((message,index)=>{
        return(`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    let msgs = document.getElementById('messages');
    msgs.innerHTML = html;

    // visualizar mensajes mas recientes
    msgs.scrollTop = msgs.scrollHeight;
 };

 //capturar los mjes del formulario
 function addMessage(e){
    // parsear los valores
    var message = {
        nickname : document.getElementById('nickname').value,
        text : document.getElementById('text').value
    };
    //ocultar el nickname para que se mantenga la conversacion con el mismo
    document.getElementById('nickname').style.display = 'none';
    //enviar el mje al servidor
    socket.emit('add-message', message);

    return false;
 };