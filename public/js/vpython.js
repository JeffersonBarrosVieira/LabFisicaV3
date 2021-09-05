/* - - - - - - -  funções  - - - - - - - */
function multiplicarVetor(vetor, num) {
    return vec(vetor.x * num, vetor.y * num, vetor.z * num)
}

function somarVetor(vetor1, vetor2) {
    return vec(vetor1.x + vetor2.x, vetor1.y + vetor2.y, vetor1.z + vetor2.z)
}


/* - - - - - - -  CUBO  - - - - - - - */
async function cubo() {

    let scene = canvas()
    scene.range = 2
    let bloco = box({ color: color.cyan })
    bloco.rotate({ angle: 0.5, axis: vec(0, 1, 1) })

    async function rotacionar(obj) {
        let t = clock()

        while (true) {
            await rate(100);
            obj.rotate({ angle: 0.07, axis: vec(0, 1, 1) });
            if (clock() - t > 3) break;
        }

        return 0;
    }

    window.addEventListener('load', async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let x = await rotacionar(bloco);
    })
}

window.__context = { glowscript_container: $("#cubo") };
cubo();



/* - - - - - - -  CILINDRO  - - - - - - - */
async function cilindro() {

    let scene = canvas();
    scene.range = 2;
    let cilindro = cylinder({ color: color.cyan, axis: vec(6, 0, 0), pos: vec(-2, 0, 0) });
    let a = arrow({ color: vec(89 / 255, 189 / 255, 136 / 255) });
    cilindro.rotate({ angle: 0.8, axis: vec(1, 1, 0) });

    return 0;
}

window.__context = { glowscript_container: $("#cilindro") };
cilindro();



/* - - - - - - -  TRAJETÓRIA  - - - - - - - */
async function trajetoria() {

    let scene = canvas();
    // scene.range = 4;
    scene.forward = vec(-3, -3.5, -4);

    let dt = 0.001;
    let particula = sphere({
        color: color.cyan,
        radius: 0.5,
        make_trail: true,
        retain: 200,
        pos: vec(0, 0, 0),
        velocity: vec(0, 0, 0),
    });

    arrow({ // Eixo X
        color: vec(200 / 255, 30 / 255, 50 / 255),
        pos: vec(0, 0, 0),
        axis: vec(4, 0, 0),
        shaftwidth: 0.1
    });
    arrow({ // Eixo Y
        color: vec(200 / 255, 30 / 255, 50 / 255),
        pos: vec(0, 0, 0),
        axis: vec(0, 4, 0),
        shaftwidth: 0.1
    });
    arrow({ // Eixo Z
        color: vec(200 / 255, 30 / 255, 50 / 255),
        pos: vec(0, 0, 0),
        axis: vec(0, 0, 4),
        shaftwidth: 0.1
    });

    let btnStart = document.getElementById('btn-trajetoria');
    let btnReset = document.getElementById('reset-trajetoria');
    let btnFollow = document.getElementById('follow-trajetoria');

    async function lancarObjeto(velocidade) {
        particula.velocity = velocidade;
        let cond = true;

        btnStart.addEventListener('click', () => {
            cond = false
            return 0;
        });
        btnReset.addEventListener('click', () => {
            cond = false
            return 0;
        });


        while (cond) {
            await rate(100);
            particula.pos = somarVetor(particula.pos, multiplicarVetor(particula.velocity, dt));
        }
    }

    btnStart.addEventListener('click', async () => {
        let vx = document.getElementById('velx-tragetoria');
        let vy = document.getElementById('vely-tragetoria');
        let vz = document.getElementById('velz-tragetoria');

        lancarObjeto(vec(vx.value, vy.value, vz.value));
    })

    btnReset.addEventListener('click', async () => {
        document.getElementById('velx-tragetoria').value = '';
        document.getElementById('vely-tragetoria').value = '';
        document.getElementById('velz-tragetoria').value = '';

        lancarObjeto(vec(0, 0, 0));
        particula.pos = vec(0, 0, 0);
        particula.clear_trail();
    })


    let follow = true;
    btnFollow.addEventListener('click', async () => {
        follow ? scene.camera.follow(particula) : scene.camera.follow(null);
        follow ? btnFollow.style.backgroundColor = '#314761' : btnFollow.style.backgroundColor = '#414a56';
        follow = !follow;
    })

    return 0;
}

window.__context = { glowscript_container: $("#trajetoria") };
trajetoria();



async function planoInclinado() {
    let scene = canvas();
    scene.forward = vec(-2, -0.4, -2);
    scene.range = 3;

    let piso = box({
        pos: vec(0, -0.025, 0),
        size: vec(3, 0.05, 5),
        texture: textures.gravel
    })

    let alfa = 30;
    alfa *= Math.PI / 180;

    let h = 1;
    let rampa = box({
        size: vec(1, 0.05, 2 * h / Math.sin(alfa)),
        pos: vec(0, 0.025 + h, 0),
        texture: textures.wood
    });
    rampa.rotate({ angle: alfa, axis: vec(1, 0, 0) });

    let parede = box({
        size: vec(1, 2 * h, 0.05),
        pos: vec(0, h, -rampa.size.z * Math.cos(alfa) / 2),
        texture: textures.wood
    });

    let dy = rampa.size.y * Math.cos(alfa) + rampa.pos.y + (h - 0.5 * Math.cos(alfa)) + 0.25 / Math.cos(alfa);
    let dz = rampa.size.y * Math.sin(alfa) + rampa.pos.z + (-rampa.size.z * Math.cos(alfa) / 2 + 0.5 * Math.sin(alfa));


    let g = 9.8;
    let gx = g * Math.sin(alfa)

    let bloco = box({
        pos: vec(0, 0.25 + dy, 0 + dz),
        size: vec(0.5, 0.5, 0.5),
        color: color.cyan,
        velocity: vec(0, 0, 0),
        acceleration: vec(0, -gx * Math.sin(alfa), gx * Math.cos(alfa))
    })
    bloco.rotate({ angle: alfa, axis: vec(1, 0, 0) });

    async function deslisar() {
        let dt = 0.01;

        while (true) {
            await rate(100);
            bloco.pos = somarVetor(bloco.pos, multiplicarVetor(bloco.velocity, dt));
            bloco.velocity = somarVetor(bloco.velocity, multiplicarVetor(bloco.acceleration, dt));
            if (bloco.pos.y < bloco.size.y / (2 * Math.cos(alfa))) break;
        }
    }
    scene.camera.follow(bloco);
    deslisar();
}

// window.__context = { glowscript_container: $("#plano-inclinado") };
// planoInclinado();