let apple = document.querySelector("img[src='/img/apple.png']");
let newton = document.querySelector("img[src='/img/newton.png']");


// console.log(newton.getBoundingClientRect().y - apple.getBoundingClientRect().y);

let newton0 = newton.getBoundingClientRect().y;
let proporcao = newton0 / window.innerHeight;
let esconder = false;

document.getElementById('conteudo').addEventListener('scroll', () => {
    
    // console.log((((newton0 - newton.getBoundingClientRect().y) / proporcao)/window.innerHeight)*200);
    if(!esconder){
        apple.style.marginTop = `${(newton0 - newton.getBoundingClientRect().y) + ((newton0 - newton.getBoundingClientRect().y)*1 / proporcao) + ((((newton0 - newton.getBoundingClientRect().y + 200) / proporcao)/window.innerHeight)*600)}px`;

        if( newton.getBoundingClientRect().y < apple.getBoundingClientRect().y ){
            esconder = true;
            apple.style.visibility = 'hidden';
        }
    }
})