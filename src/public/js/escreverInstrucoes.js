const celular = document.querySelector('#aparelho .celular');
const aparelho = document.querySelector('#aparelho .computador');

const celular_selecionado = document.getElementById('celular');
const computador_selecionado = document.getElementById('computador');

celular.addEventListener('click', () => {
    celular_selecionado.style.backgroundColor = '#15c3f7';
    computador_selecionado.style.backgroundColor = 'transparent';

    escreverTexto(instrucaoCelular);
})

aparelho.addEventListener('click', () => {
    celular_selecionado.style.backgroundColor = 'transparent';
    computador_selecionado.style.backgroundColor = '#15c3f7';

    escreverTexto(instrucaoComputador);
})

const instrucaoCelular = `
                            -Rotacionar: Arraste um dedo sobre a região animada;<br>
                            -Zoom: Aproxime dois dedos entre si ou afaste-os sobre a região.
                        `;

const instrucaoComputador = `
                            -Rotacionar: Segure Ctrl + Botão esquerdo do mouse sobre a região animada e arraste; <br>
                            -Zoom: Gire botão Scroll do mouse (uma bolinha que gira).
                        `;


const instrucoes = document.getElementById('instrucoes');

function escreverTexto(texto) {

    instrucoes.innerHTML = texto;
}