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

btn_formulario.addEventListener('click', (e) => {
    e.preventDefault()

    assunto.value = ''
    mensagem.value = ''
})