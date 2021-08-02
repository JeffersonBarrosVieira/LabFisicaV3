const enviar_email = document.getElementById('send-email');
const corpo_formulario = document.getElementById('formulario-content');
const fechar_formulario = document.querySelector('#formulario .fa-times');
const btn_formulario = document.querySelector('#formulario .btn-formulario');
const formulario = document.getElementById('formulario');

const assunto = document.getElementById('assunto');
const mensagem = document.getElementById('mensagem');

enviar_email.addEventListener('click', (e) => {
    e.preventDefault();

    corpo_formulario.style.visibility = 'visible';
    formulario.style.transform = 'scale(1)';
})

fechar_formulario.addEventListener('mouseenter', () => {
    fechar_formulario.style.transform = 'rotate(180deg) scale(1.2)';
})
fechar_formulario.addEventListener('mouseleave', () => {
    fechar_formulario.style.transform = 'rotate(0deg) scale(1)';
})

fechar_formulario.addEventListener('click', () => {
    corpo_formulario.style.visibility = 'hidden';
    formulario.style.transform = 'scale(0.1)';
    fechar_formulario.style.transform = 'rotate(0deg) scale(0.3)';
})

// Enviar formulário

btn_formulario.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(assunto.value !== '' && mensagem.value !== ''){

        var data = new FormData();
        data.append('assunto', assunto.value);
        data.append('mensagem', mensagem.value);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/send', true);
        // xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == 4 && http.status == 200) {
                alert(xhr.responseText);
            }
        }
        xhr.onload = function () {
            // do something to response
            console.log(this.responseText);
        };
        // xhr.send(JSON.stringify({
        //     assunto: assunto.value,
        //     mensagem: mensagem.value
            
        // }));

        xhr.send(data);
    
        assunto.value = '';
        mensagem.value = '';
    
        // alert("Mensagem enviada!")

    }
    
})