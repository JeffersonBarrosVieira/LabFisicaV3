
// Canvas 2 plano de fundo
const canvas2 = document.getElementById('wallpaper');
const ctx2 = canvas2.getContext('2d');

let particleRandom = [];
let spacingPoints2 = 20;

canvas2.width = innerWidth 
canvas2.height = innerHeight

// Mouse
const mouse = {
    x2: null,
    y2: null,
    radius: 17,
    radius2: 100
}

window.addEventListener('mousemove', (event) => {
    mouse.x2 = event.x - canvas2.offsetLeft;
    mouse.y2 = event.y - canvas2.offsetTop;
})

// Particulas
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
        }
    }
    update(){
        let dx;
        let dy;
        if(this.random) {
            dx = mouse.x2 - this.x;
            dy = mouse.y2 - this.y;
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

function init () {
    particleRandom = []

    for (let j = 0; j <1+ canvas2.height/(spacingPoints2*4); j++) {
        for (let i = 0; i <1+ canvas2.width/(spacingPoints2*4); i++) {
            particleRandom.push(new Particle(Math.random() * canvas2.width, Math.random() * canvas2.height, 1, true));
        }
    }

}
init()


function animate(){

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


function connect() {

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

window.addEventListener('resize', (e) => {
    canvas2.width = innerWidth;
    canvas2.height = innerHeight;

    init()
})