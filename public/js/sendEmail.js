const enviar_email = document.getElementById('send-email');
const corpo_formulario = document.getElementById('formulario-content');
const btn_formulario = document.querySelector('#formulario .btn-formulario');
const formulario = document.getElementById('formulario');

const fechar = document.getElementById('fechar');

const assunto = document.getElementById('assunto');
const mensagem = document.getElementById('mensagem');

enviar_email.addEventListener('click', (e) => {
    e.preventDefault();

    corpo_formulario.style.visibility = 'visible';
    formulario.style.transform = 'scale(1)';
})

fechar.addEventListener('click', () => {
    corpo_formulario.style.visibility = 'hidden';
    formulario.style.transform = 'scale(0.1)';
})

// Enviar formulário

btn_formulario.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(assunto.value !== '' && mensagem.value !== ''){

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/send', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            assunto: assunto.value,
            mensagem: mensagem.value
            
        }));
    
        assunto.value = '';
        mensagem.value = '';
    
        alert("Mensagem enviada!")

    }
    
})