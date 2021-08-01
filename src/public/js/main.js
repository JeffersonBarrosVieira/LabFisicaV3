main_slide_bar = document.getElementById('main-slide-bar');
main_content = document.getElementById('main-content');
seta = document.getElementById('seta');

function esconderBar(cond){
    if(cond) {
        main_slide_bar.style.marginLeft = "-208px";
        main_content.style.marginLeft = "17px";
        seta.style.transform = "rotate(0deg)";
    }
    if(!cond){
        main_slide_bar.style.marginLeft = "0px";
        main_content.style.marginLeft = "238px";
        seta.style.transform = "rotate(180deg)";
    }
}

main_content.addEventListener('click', () => {
    if(esconder){
        esconderBar(true)
        esconder = !esconder
    }
})

let esconder = true
seta.addEventListener('click', () => {
    esconderBar(esconder);
    esconder = !esconder;
})

// Canvas 1
const canvas1 = document.getElementById('canvas1');
const ctx = canvas1.getContext('2d');

canvas1.width = 187
canvas1.height = 110

let particleArray = [];
let spacingPoints = 3;

// Canvas 2 (plano de fundo do LabFísica)
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

let particleRandom = [];
let spacingPoints2 = 20;

canvas2.width = innerWidth
canvas2.height = innerHeight

// Mouse
const mouse = {
    x: null,
    y: null,
    x2: null,
    y2: null,
    radius: 17,
    radius2: 100
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x - canvas1.offsetLeft;
    mouse.y = event.y - canvas1.offsetTop;
    mouse.x2 = event.x - canvas2.offsetLeft;
    mouse.y2 = event.y - canvas2.offsetTop;
})

// Desenho do Canvas 1
ctx.fillStyle = 'white';
ctx.font = '20px Roboto';
ctx.fillText('Lab', 10, 16);
ctx.fillText('Física', 0, 34);

const textCoordinates = ctx.getImageData(0, 0, 100, 110);

// Criação das particulas
class Particle {
    constructor(x, y, size, random=false) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 10) + 2
        this.random = random
    }

    draw() {
        if(this.random){
            ctx2.fillStyle = 'white';
            ctx2.beginPath();
            ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx2.closePath();
            ctx2.fill();
        } else {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }
    update(){
        let dx;
        let dy;
        if(this.random) {
            dx = mouse.x2 - this.x;
            dy = mouse.y2 - this.y;
        } else {
            dx = mouse.x - this.x;
            dy = mouse.y - this.y;
        }
        let distance = Math.sqrt(dx**2 + dy**2);

        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        let maxDistance = this.random? mouse.radius2 : mouse.radius;
        let force = (maxDistance - distance) / maxDistance;

        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if(distance < maxDistance){
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx/5;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy/5;
            }
        }
    }
    move(r){
        this.baseX += ((Math.random() * r) - r/2);
        this.baseY += ((Math.random() * r) - r/2);
    }
}

// Função inicializa as coodenadas dos pontos do Canvas 1 e Canvas 2
function init () {
    particleArray = []
    particleRandom = []

    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                let positionX = x ;
                let positionY = y ;
                particleArray.push(new Particle(positionX * spacingPoints, positionY * spacingPoints, 0.5));
            }
        }
    }

    for (let j = 0; j <1+ canvas2.height/(spacingPoints2*4); j++) {
        for (let i = 0; i <1+ canvas2.width/(spacingPoints2*4); i++) {
            particleRandom.push(new Particle(Math.random() * canvas2.width, Math.random() * canvas2.height, 1, true));
        }
    }

}

init()

// Função que anima as particulas
function animate(){
    ctx.clearRect(0,0, canvas1.width, canvas1.height);
    for (let i = 0; i < particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();
    }

    ctx2.clearRect(0,0, canvas2.width, canvas2.height);
    for (let i = 0; i < particleRandom.length; i++){
        particleRandom[i].draw();
        particleRandom[i].update();
    }
    for (let i = 0; i < particleRandom.length; i++){
        particleRandom[i].move(1.5);
    }

    connect();
    requestAnimationFrame(animate);
}

animate()

// Função que desenha um segmento de reta entre as partículas
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;

            let distance = Math.sqrt(dx**2 + dy**2);

            if ( distance < 2.5*spacingPoints) {
                opacityValue = 1 - (distance/(2.5*spacingPoints))
                ctx.strokeStyle = `rgba(${255*opacityValue/2},255,255,${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }

    for (let a = 0; a < particleRandom.length; a++) {
        for (let b = a; b < particleRandom.length; b++) {
            let dx = particleRandom[a].x - particleRandom[b].x;
            let dy = particleRandom[a].y - particleRandom[b].y;

            let distance = Math.sqrt(dx**2 + dy**2);

            if ( distance < 6*spacingPoints2) {
                opacityValue = 1 - (distance/(6*spacingPoints2))
                ctx2.strokeStyle = `rgba(${255*opacityValue/2},255,255,${opacityValue})`;
                ctx2.lineWidth = 1;
                ctx2.beginPath();
                ctx2.moveTo(particleRandom[a].x, particleRandom[a].y);
                ctx2.lineTo(particleRandom[b].x, particleRandom[b].y);
                ctx2.stroke();
            }
        }
    }
}

// Mover as particulas do Canvas 2 de forma randomica
window.addEventListener('scroll', (e) => {
    for (let i = 0; i < particleRandom.length; i++){
        particleRandom[i].move(5);
    }
})

// Atualizar as dimensões do Canvas 2 (plano de fundo do LabFísica) ao mudar as dimensões da tela do client
window.addEventListener('resize', (e) => {
    canvas2.width = innerWidth;
    canvas2.height = innerHeight;

    init()
})