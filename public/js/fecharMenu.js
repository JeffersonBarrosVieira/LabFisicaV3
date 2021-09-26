const menu__lateral__seta = document.getElementById('menu__lateral__seta');
const menu__lateral = document.getElementById('menu__lateral');
const conteudo = document.getElementById('conteudo');

let osc = -1;

menu__lateral__seta.addEventListener('click', () => fecharMenu() );
conteudo.addEventListener('click', () => { osc < 0 ? fecharMenu() : false });

function fecharMenu() {
    menu__lateral.style.transform = `translate(${osc < 0 ? '-208px' : '0px'})`;
    conteudo.style.marginLeft = `${osc < 0 ? '20px' : '228px'}`;
    menu__lateral__seta.style.transform = `rotate(${osc < 0 ? '0deg' : '180deg'})`;
    osc *= -1;
}

window.onload = async () => {
    await new Promise(r => setTimeout(r, 700));
    conteudo.click();
};

let time = 300;

document.getElementById('tutorial').addEventListener('click', async () => {
    await new Promise(r => setTimeout(r, time));
    conteudo.click();
})

document.getElementById('canvas1').addEventListener('click', async () => {
    await new Promise(r => setTimeout(r, time));
    conteudo.click();
})

// document.getElementById('m_c').addEventListener('click', async () => {
//     await new Promise(r => setTimeout(r, time));
//     conteudo.click();
// })

// document.getElementById('o_o').addEventListener('click', async () => {
//     await new Promise(r => setTimeout(r, time));
//     conteudo.click();
// })

// document.getElementById('t_d').addEventListener('click', async () => {
//     await new Promise(r => setTimeout(r, time));
//     conteudo.click();
// })

// document.getElementById('o_g').addEventListener('click', async () => {
//     await new Promise(r => setTimeout(r, time));
//     conteudo.click();
// })

document.getElementById('referencias').addEventListener('click', async () => {
    await new Promise(r => setTimeout(r, time));
    conteudo.click();
})