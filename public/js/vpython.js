/* - - - - - - -  funções  - - - - - - - */
function multiplicarVetor(vetor, num) {
    return vec(vetor.x * num, vetor.y * num, vetor.z * num)
}

function somarVetor(vetor1, vetor2, fator = 1) {
    return vec(vetor1.x + fator * vetor2.x, vetor1.y + fator * vetor2.y, vetor1.z + fator * vetor2.z)
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


/* - - - - - - -  REFERENCIAL  - - - - - - - */
async function arremesso() {

    let scene = canvas();
    scene.forward = vec(-2, -3, -2);
    scene.range = 8;
    box({ pos: vec(0,-0.1,0), size: vec(1000, 0.1, 10) });


    // Construção Avião
    let vetor = vec(0, 5, 0);

    let aviao = cylinder({
        color: color.blue, axis: vec(2, 0, 0), pos: somarVetor(vec(-1, 0, 0), vetor), radius: 0.2, pos0: somarVetor(vec(-1, 0, 0), vetor),
        velocity: vec(0, 0, 0),
        acc: vec(0, 0, 0), make_trail: true,
        retain: 1000
    });
    let frente = sphere({ color: color.blue, radius: 0.2, pos: somarVetor(aviao.pos, aviao.axis) })

    let crista = box({ color: color.yellow, size: vec(2, 0.15, 0.1), pos: somarVetor(aviao.pos, vec(1, 0.15, 0)) })
    crista.rotate({ angle: -0.03, axis: vec(0, 0, 1) })
    let rabo = box({
        color: color.yellow, size: vec(0.5, 0.3, 0.1), pos: somarVetor(aviao.pos, vec(0.27, 0.2, 0))
    })
    rabo.rotate({ angle: -0.52, axis: vec(0, 0, 1) })

    let asaEsquerda = box({
        color: color.blue, size: vec(1.5, 0.1, 0.6), pos: somarVetor(aviao.pos, vec(0.8, 0, 0.5))
    });
    asaEsquerda.rotate({ angle: 0.82, axis: vec(0, 1, 0) });

    let asaDireita = box({
        color: color.blue, size: vec(1.5, 0.1, 0.6), pos: somarVetor(aviao.pos, vec(0.8, 0, -0.5))
    });
    asaDireita.rotate({ angle: -0.82, axis: vec(0, 1, 0) });

    function attPosicaoAviao() {
        frente.pos = somarVetor(aviao.pos, aviao.axis);
        crista.pos = somarVetor(aviao.pos, vec(1, 0.15, 0));
        rabo.pos = somarVetor(aviao.pos, vec(0.27, 0.2, 0));
        asaEsquerda.pos = somarVetor(aviao.pos, vec(0.8, 0, 0.5));
        asaDireita.pos = somarVetor(aviao.pos, vec(0.8, 0, -0.5))
    }

    // Fim construção Avião

    let dt = 0.001;
    let particula = box({
        color: color.cyan,
        size: vec(0.2, 0.2, 0.2),
        make_trail: true,
        retain: 1000,
        pos0: vec(0, 5 - aviao.radius, 0),
        pos: vec(0, 5 - aviao.radius, 0),
        velocity: vec(0, 0, 0),
        acc: vec(0, 0, 0)
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
    // arrow({ // Eixo Z
    //     color: vec(200 / 255, 30 / 255, 50 / 255),
    //     pos: vec(0, 0, 0),
    //     axis: vec(0, 0, 4),
    //     shaftwidth: 0.1
    // });

    let r = arrow({
        color: vec(20 / 255, 255 / 255, 50 / 255),
        pos: vec(0, 0, 0),
        axis: particula.pos,
        shaftwidth: 0.05
    })

    let btnStart = document.getElementById('btn-referencial');
    let btnFollow = document.getElementById('follow-referencial');

    document.getElementById('vel-referencial').value = '10';

    let follow = true;
    btnFollow.addEventListener('click', async () => {

        if (follow) {
            scene.camera.follow(aviao);
            btnFollow.style.backgroundColor = '#314761';
            btnFollow.innerHTML = "Sair";
        } else {
            scene.camera.follow(null);
            btnFollow.style.backgroundColor = '#414a56';
            btnFollow.innerHTML = "Entrar";
        }

        follow = !follow;
    })

    
    let angulo = 0;

    async function lancarObjeto(velocidade = vec(0, 0, 0)) {
        

        particula.velocity = velocidade;
        aviao.velocity = velocidade;

        let cond = true;
        let z = true;

        btnStart.addEventListener('click', () => {
            cond = false
            return 0;
        });


        while (cond) {
            await rate(100);

            if (particula.pos.y > 0) {
                particula.pos = somarVetor(particula.pos, multiplicarVetor(particula.velocity, dt));
                particula.velocity = somarVetor(particula.velocity, multiplicarVetor(particula.acc, dt));

                particula.rotate({ angle: angulo, axis: vec(0, 0, 1) });
                angulo += angulo * dt * 4

            } else {
                if( aviao.pos.x - particula.pos.x > 5){
                    return 0;
                }
            }

            aviao.pos = somarVetor(aviao.pos, multiplicarVetor(aviao.velocity, dt));
            aviao.velocity = somarVetor(aviao.velocity, multiplicarVetor(aviao.acc, dt));
            attPosicaoAviao();

            if (follow) {
                r.pos = vec(0, 0, 0)
                r.axis = particula.pos;
            } else {
                r.pos = somarVetor(aviao.pos, multiplicarVetor(aviao.axis, 0.5));
                r.axis = somarVetor(particula.pos, r.pos, -1);
            }

            if (aviao.pos.x > 1000) {
                return 0;
            }

        }
    }

    btnStart.innerHTML = 'Iniciar';
    btnStart.addEventListener('click', async () => {
        let v = document.getElementById('vel-referencial');

        if (btnStart.innerHTML == 'Iniciar') {
            btnStart.style.backgroundColor = "rgba(230, 20, 20, 0.7)"
            lancarObjeto(vec(parseInt(v.value), 0, 0));
            btnStart.innerHTML = "Soltar";
            btnStart.style.color = "white";

        } else if (btnStart.innerHTML == 'Soltar') {
            btnStart.style.backgroundColor = "#414a56"

            particula.acc = vec(0, -9.8, 0);
            angulo = -0.001;
            lancarObjeto(vec(parseInt(v.value), 0, 0));

            btnStart.innerHTML = "Reset";
            btnStart.style.color = "white";

        } else if (btnStart.innerHTML == 'Reset') {
            document.getElementById('vel-referencial').value = '5';
            btnStart.style.backgroundColor = "#61bd71";

            lancarObjeto(vec(0, 0, 0));
            particula.pos = particula.pos0;
            particula.acc = vec(0, 0, 0)
            particula.clear_trail();

            aviao.pos = aviao.pos0;
            angulo = 0;
            aviao.acc = vec(0, 0, 0)
            aviao.clear_trail();

            btnStart.innerHTML = "Iniciar";
            btnStart.style.color = "rgb(11,13,15)";
        }

    })

    return 0;

}

window.__context = { glowscript_container: $("#referencial") };
arremesso();


/* - - - - - - -  CONTROLES  - - - - - - - */
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

window.__context = { glowscript_container: $("#controles") };
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