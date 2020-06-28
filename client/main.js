var socket = io.connect('http://192.168.0.41:6677',{'forceNew':true});
 socket.on('messages',(data)=>{
     console.log(data);
     render(data);
    });
 function render(datos){
    let html = datos.map((message,index)=>{
        return(`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    document.getElementById('messages').innerHTML = html;
 };