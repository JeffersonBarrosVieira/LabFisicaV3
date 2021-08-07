const menu__lateral__seta = document.getElementById('menu__lateral__seta');
const menu__lateral = document.getElementById('menu__lateral');
const conteudo = document.getElementById('conteudo');

let osc = -1;

menu__lateral__seta.addEventListener('click', () => fecharMenu() );
conteudo.addEventListener('click', () => { osc < 0 ? fecharMenu() : false });

function fecharMenu() {
    menu__lateral.style.transform = `translate(${osc < 0 ? '-208px' : '0px'})`;
    conteudo.style.marginLeft = `${osc < 0 ? '30px' : '238px'}`;
    menu__lateral__seta.style.transform = `rotate(${osc < 0 ? '0deg' : '180deg'})`;
    osc *= -1;
}

window.onload = async () => {
    await new Promise(r => setTimeout(r, 1500));
    conteudo.click();
};