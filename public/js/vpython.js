/* - - - - - - -  funções  - - - - - - - */
function multiplicarVetor(vetor, num) {
    return vec(vetor.x * num, vetor.y * num, vetor.z * num)
}

function somarVetor(vetor1, vetor2, fator = 1) {
    return vec(vetor1.x + fator * vetor2.x, vetor1.y + fator * vetor2.y, vetor1.z + fator * vetor2.z)
}

function calcHipo(vetor1, vetor2) {
    let x = (vetor1.x - vetor2.x) ** 2;
    let y = (vetor1.y - vetor2.y) ** 2;
    let z = (vetor1.z - vetor2.z) ** 2;

    return (x + y + z) ** (1 / 2);
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
    scene.forward = vec(-1, -2, -3);
    scene.range = 8;
    box({ pos: vec(0, -0.1, 0), size: vec(1000, 0.1, 5) });


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

    let dt = 0.01;
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
    label({ text: 'X', pos: vec(4, 0, 0), color: color.blue, box: false, opacity: 0, heigth: 18 });
    arrow({ // Eixo Y
        color: vec(200 / 255, 30 / 255, 50 / 255),
        pos: vec(0, 0, 0),
        axis: vec(0, 4, 0),
        shaftwidth: 0.1
    });
    label({ text: 'Y', pos: vec(0, 4, 0), color: color.blue, box: false, opacity: 0, height: 18 });
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

    document.getElementById('vel-referencial').value = 5;

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
                if (aviao.pos.x - particula.pos.x > 5) {
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

            particula.acc = vec(0, -9.8, 0);
            angulo = -0.001;
            lancarObjeto(vec(parseInt(v.value), 0, 0));

            btnStart.style.backgroundColor = "#414a56"
            btnStart.innerHTML = "Reset";
            btnStart.style.color = "white";

        } else if (btnStart.innerHTML == 'Reset') {
            document.getElementById('vel-referencial').value = '5';

            lancarObjeto(vec(0, 0, 0));
            particula.pos = particula.pos0;
            particula.acc = vec(0, 0, 0)
            particula.clear_trail();

            aviao.pos = aviao.pos0;
            angulo = 0;
            aviao.acc = vec(0, 0, 0)
            aviao.clear_trail();

            btnStart.style.backgroundColor = "#61bd71";
            btnStart.innerHTML = "Iniciar";
            btnStart.style.color = "rgb(11,13,15)";
        }

    })

    return 0;

}

window.__context = { glowscript_container: $("#referencial") };
arremesso();


/* - - - - - - -  DESLOCAMENTO  - - - - - - - */
async function deslocamento() {
    let scene = canvas();
    scene.forward = vec(-0.5, -1.5, -3);
    scene.range = 4;

    arrow({ // Eixo X
        color: vec(200 / 255, 30 / 255, 50 / 255),
        pos: vec(0, 0, 0),
        axis: vec(4, 0, 0),
        shaftwidth: 0.1
    });
    label({ text: 'X', pos: vec(4, 0, 0), color: color.blue, box: false, opacity: 0, heigth: 18 });
    arrow({ // Eixo Z
        color: vec(200 / 255, 30 / 255, 50 / 255),
        pos: vec(0, 0, 0),
        axis: vec(0, 0, 4),
        shaftwidth: 0.1
    });
    label({ text: 'Z', pos: vec(0, 0, 4), color: color.blue, box: false, opacity: 0, heigth: 18 });

    let particula = sphere({
        radius: 0.2,

        pos: vec(0, 0, 0),
        pos0: vec(0, 0, 0),
        velocity: vec(15, 0, 15),

        color: color.cyan,
        make_trail: true,
        retain: 2050,
    })

    let r = arrow({
        color: vec(20 / 255, 255 / 255, 50 / 255),
        pos: particula.pos0,
        axis: particula.pos,
        shaftwidth: 0.05
    })

    let distanciaPercorrida = label({ text: 'Dp = 0 m', pos: particula.pos, color: color.cyan, box: false, opacity: 0, heigth: 18 });
    let distanciaDeslocada = label({ text: 'Dd = 0 m', pos: vec(0, 0, 4), color: color.green, box: false, opacity: 0, heigth: 18 });

    distanciaPercorrida.pos = somarVetor(particula.pos, vec(0, 0.3, 0));
    distanciaDeslocada.pos = somarVetor(multiplicarVetor(particula.pos, 0.5), particula.pos0, -1);


    let R = 3;
    let theta0 = 0;
    let theta = 0;
    let w = 10;
    let afastado = true;

    let dt = 0.001;

    async function deslocamento1() {

        let cond = true;

        btn.addEventListener('click', () => {
            cond = false
            return 0;
        });
        btnFollow.addEventListener('click', () => {
            cond = false
            return 0;
        });

        let reta = true;

        while (cond) {
            await rate(100);

            if (calcHipo(vec(0, 0, 0), particula.pos) <= R && reta) {
                particula.pos = somarVetor(particula.pos, particula.velocity, dt);

                r.pos = particula.pos0;
                r.axis = somarVetor(particula.pos, particula.pos0, -1);

                distanciaPercorrida.pos = somarVetor(particula.pos, vec(0, 0.3, 0));
                distanciaPercorrida.text = `Dp = ${(calcHipo(particula.pos0, particula.pos)).toFixed(2)} m`;

                distanciaDeslocada.pos = somarVetor(multiplicarVetor(somarVetor(particula.pos, r.pos, -1), 0.5), r.pos);
                distanciaDeslocada.text = `Dd = ${(calcHipo(particula.pos0, particula.pos)).toFixed(2)} m`;

            } else if (theta <= 2 * Math.PI) {

                if (reta) {
                    theta0 = Math.atan(particula.pos.z / particula.pos.x);
                    reta = false;
                }

                particula.pos.x = R * Math.cos(theta + theta0);
                particula.pos.z = R * Math.sin(theta + theta0);

                r.pos = particula.pos0;
                r.axis = somarVetor(particula.pos, particula.pos0, -1);

                distanciaPercorrida.pos = somarVetor(particula.pos, vec(0, 0.3, 0));
                distanciaPercorrida.text = `Dp = ${(
                    afastado ? calcHipo(particula.pos0, particula.pos) * (1 + theta) : 3 * theta
                ).toFixed(2)
                    } m`;

                distanciaDeslocada.pos = somarVetor(multiplicarVetor(somarVetor(particula.pos, r.pos, -1), 0.5), r.pos);
                distanciaDeslocada.text = `Dd = ${(calcHipo(particula.pos0, particula.pos)).toFixed(2)} m`;

                theta += w * dt;
            } else {
                return 0;
            }

        }
    }


    let btn = document.getElementById('btn-deslocamento');
    let btnFollow = document.getElementById('follow-deslocamento');

    btn.innerHTML = 'Iniciar';
    btn.addEventListener('click', async () => {
        if (btn.innerHTML == 'Iniciar') {
            R = 3;
            theta = 0;
            deslocamento1();

            btn.style.backgroundColor = "#414a56";
            btn.style.color = "white";
            btn.innerHTML = 'Reset';
        } else {

            if (afastado) {
                R = 0;
            } else {
                R = 3;
            }
            particula.pos = particula.pos0;
            theta = 0;
            particula.clear_trail();

            btn.style.backgroundColor = "#61bd71";
            btn.style.color = "rgb(11,13,15)";
            btn.innerHTML = 'Iniciar';
        }

        r.pos = particula.pos0;
        r.axis = somarVetor(particula.pos, particula.pos0, -1);

        distanciaPercorrida.pos = somarVetor(particula.pos, vec(0, 0.3, 0));
        distanciaPercorrida.text = `Dp = ${(calcHipo(particula.pos0, particula.pos)).toFixed(2)} m`;

        distanciaDeslocada.pos = somarVetor(multiplicarVetor(somarVetor(particula.pos, r.pos, -1), 0.5), r.pos);
        distanciaDeslocada.text = `Dd = ${(calcHipo(particula.pos0, particula.pos)).toFixed(2)} m`;
    })

    btnFollow.addEventListener('click', async () => {

        if (afastado) {
            btnFollow.style.backgroundColor = '#314761';
            btnFollow.innerHTML = "Voltar";

            particula.pos0 = vec(3 * Math.cos(Math.PI * 45 / 180), 0, 3 * Math.sin(Math.PI * 45 / 180));
            particula.pos = particula.pos0;
            R = 3;
            theta = 0;
            particula.clear_trail();

            btn.style.backgroundColor = "#61bd71";
            btn.style.color = "rgb(11,13,15)";
            btn.innerHTML = 'Iniciar';
        } else {

            btnFollow.style.backgroundColor = '#414a56';
            btnFollow.innerHTML = "Deslocar";

            particula.pos0 = vec(0, 0, 0);
            particula.pos = particula.pos0;
            R = 0;
            theta = 0;
            particula.clear_trail();

            btn.style.backgroundColor = "#61bd71";
            btn.style.color = "rgb(11,13,15)";
            btn.innerHTML = 'Iniciar';
        }

        r.pos = particula.pos0;
        r.axis = somarVetor(particula.pos, particula.pos0, -1);

        distanciaPercorrida.pos = somarVetor(particula.pos, vec(0, 0.3, 0));
        distanciaPercorrida.text = `Dp = ${(calcHipo(particula.pos0, particula.pos)).toFixed(2)} m`;

        distanciaDeslocada.pos = somarVetor(multiplicarVetor(somarVetor(particula.pos, r.pos, -1), 0.5), r.pos);
        distanciaDeslocada.text = `Dd = ${(calcHipo(particula.pos0, particula.pos)).toFixed(2)} m`;

        afastado = !afastado;
    })

}

window.__context = { glowscript_container: $("#deslocamento") };
deslocamento();

// let Ts = [textures.flower, textures.granite, textures.gravel, textures.metal, textures.rock, textures.rough, textures.rug, textures.stones, textures.stucco, textures.wood, textures.wood_old, textures.earth]

/* - - - - - - -  VELOCIDADE  - - - - - - - */
async function velocidade() {
    let scene = canvas();
    scene.forward = vec(-2, -1, -1);
    scene.range = 3;

    box({ pos: vec(0, -0.1, 0), size: vec(1000, 0.2, 5), color: vec(20 / 255, 20 / 255, 20 / 255) }); // Chão
    for (let i = -500; i < 800; i += 10) {
        box({ pos: vec(i + 1.5, -0.09, 0), size: vec(3, 0.2, 0.5) }); // faixa
    }

    let eixoX = arrow({ // Eixo X
        color: vec(200 / 255, 30 / 255, 50 / 255),
        pos: vec(0, 0, 0),
        axis: vec(4, 0, 0),
        shaftwidth: 0.1
    });
    label({ text: 'X', pos: somarVetor(eixoX.pos, eixoX.axis), color: color.blue, box: false, opacity: 0, heigth: 18 });
    let eixoY = arrow({ // Eixo Y
        color: vec(200 / 255, 30 / 255, 50 / 255),
        pos: eixoX.pos,
        axis: vec(0, 4, 0),
        shaftwidth: 0.1
    });
    label({ text: 'Y', pos: somarVetor(eixoY.pos, eixoY.axis), color: color.blue, box: false, opacity: 0, heigth: 18 });

    /* Construção do carro */

    let carro = {
        chassis: {
            solo: box({ pos: vec(0, 0, 0), pos0: vec(0, 0, 0), size: vec(2.0, 0.2, 0.8), color: color.cyan, texture: textures.metal }),
            meio: box({ pos: vec(-0.4, 0.4, 0), pos0: vec(-0.4, 0.4, 0), size: vec(0.8, 0.6, 0.8), color: color.cyan, texture: textures.metal }),
            tras: box({ pos: vec(-0.82, 0.34, 0), pos0: vec(-0.82, 0.34, 0), size: vec(0.7, 0.2, 0.8), color: color.cyan, texture: textures.metal }),
            frente: box({ pos: vec(0.02, 0.34, 0), pos0: vec(0.02, 0.34, 0), size: vec(0.7, 0.2, 0.8), color: color.cyan, texture: textures.metal }),
            capo: box({ pos: vec(0.55, 0.15, 0), pos0: vec(0.55, 0.15, 0), size: vec(0.9, 0.2, 0.8), color: color.cyan, texture: textures.metal }),
        },
        roda: {
            frente_direita: cylinder({ pos: vec(0.8, 0, 0.4), pos0: vec(0.8, 0, 0.4), radius: 0.3, axis: vec(0, 0, 0.4), color: color.white, texture: textures.stucco }),
            frente_esquerda: cylinder({ pos: vec(0.8, 0, -0.4), pos0: vec(0.8, 0, -0.4), radius: 0.3, axis: vec(0, 0, -0.4), color: color.white, texture: textures.stucco }),
            tras_direita: cylinder({ pos: vec(-0.8, 0, 0.4), pos0: vec(-0.8, 0, 0.4), radius: 0.3, axis: vec(0, 0, 0.4), color: color.white, texture: textures.stucco }),
            tras_esquerda: cylinder({ pos: vec(-0.8, 0, -0.4), pos0: vec(-0.8, 0, -0.4), radius: 0.3, axis: vec(0, 0, -0.4), color: color.white, texture: textures.stucco }),
        },
        farol: {
            frente_direita: cylinder({ pos: vec(1, 0.1, 0.3), pos0: vec(1, 0.1, 0.3), radius: 0.08, axis: vec(0.02, 0, 0), color: color.yellow }),
            frente_esquerda: cylinder({ pos: vec(1, 0.1, -0.3), pos0: vec(1, 0.1, -0.3), radius: 0.08, axis: vec(0.02, 0, 0), color: color.yellow }),
        }

    }

    // let lamp1 = local_light({pos: somarVetor(carro.farol.frente_direita.pos, vec(3, 0, 0)), color: color.white});
    // let lamp2 = local_light({pos: somarVetor(carro.farol.frente_esquerda.pos, vec(3, 0, 0)), color: color.white});
    let lamp = local_light({ pos: somarVetor(carro.chassis.solo.pos, vec(-1, 0, 0)), color: color.red });

    carro.chassis.tras.rotate({ angle: 1.25, axis: vec(0, 0, 1) });
    carro.chassis.frente.rotate({ angle: -1.25, axis: vec(0, 0, 1) });
    carro.chassis.capo.rotate({ angle: 0.05, axis: vec(0, 0, 1) });

    function attCarro(w = 0) {
        for (var parte in carro) {
            for (var pedaco in carro[parte]) {
                if (pedaco !== "solo") {
                    carro[parte][pedaco].pos = somarVetor(carro.chassis.solo.pos, carro[parte][pedaco].pos0);
                }
            };

        }

        for (var roda in carro.roda) {

            carro.roda[roda].rotate({ angle: w * -0.001, axis: vec(0, 0, 1) });
        }

        lamp.pos = somarVetor(carro.chassis.solo.pos, vec(-1, 0, 0));
    }

    carro.chassis.solo.pos = vec(0, 0.3, 0);
    carro.chassis.solo.pos0 = vec(0, 0.3, 0);
    attCarro();

    /* Fim Construção do Carro */


    /* Construção gráfico */

    let grafico = graph({
        // title: "Coordenadas",
        x: 0,
        y: 0,
        width: 150,
        height: 150,
        // xtitle: "t",
        // ytitle: "x",
        // align: "left",
        foreground: color.black,
        background: color.black,
        // scroll: true,
        // xmin: 0,
        // xmax: 20,
        // ymin: 0,
        // ymax: 20,
    })

    let curva = gcurve({
        graph: grafico,
        color: color.cyan
    })

    curva.plot(0, 0);

    /* Fim Construção gráfico */


    document.getElementById('vel-velocidade').value = 5;

    let dt = 0.01;
    let t = 0;
    let velocidade = vec(0, 0, 0);
    let w = 0;

    let btnAndar = document.getElementById('btn-velocidade');
    let andar = false;
    let velMed = document.getElementById('vel-velocidade-media');
    let distPercorrida = 0;
    let graphReset = true;
    let x1 = 0;
    let x2 = 0;
    btnAndar.addEventListener('click', async () => {
        let iniciar = true;

        document.getElementById('reset-velocidade').addEventListener('click', () => {
            iniciar = false;
            return 0;
        });
        document.getElementById('btn-velocidade').addEventListener('click', () => {
            if (graphReset) {
                curva.data = []; // esvaziando os pontos do gráfico
                curva.plot(0, 0);
                graphReset = false;
            }
            iniciar = false;
            return 0;
        });

        if (andar) {
            // document.getElementById('vel-velocidade').value = 0;

            velocidade = vec(0, 0, 0);
            w = velocidade.x / carro.roda.frente_direita.radius;

            btnAndar.style.backgroundColor = "#61bd71";
            btnAndar.style.color = "rgb(11,13,15)";
            btnAndar.innerHTML = "Andar";
        } else {

            velocidade = vec(document.getElementById('vel-velocidade').value, 0, 0);
            w = velocidade.x / carro.roda.frente_direita.radius;

            btnAndar.style.backgroundColor = "#414a56"
            btnAndar.style.color = "white";
            btnAndar.innerHTML = "Parar";

        }
        andar = !andar;

        while (iniciar) {
            velMed.value = ( distPercorrida / (t == 0 ? 1 : t)).toFixed(1);
            distPercorrida += x2 - x1;
            
            x1 = carro.chassis.solo.pos.x;
            carro.chassis.solo.pos = somarVetor(carro.chassis.solo.pos, multiplicarVetor(velocidade, dt));
            x2 = carro.chassis.solo.pos.x;
            
            attCarro(w);

            t += dt;
            
            curva.plot(t, carro.chassis.solo.pos.x);

            await rate(100);
        }

    })

    let btnReset = document.getElementById('reset-velocidade');
    btnReset.addEventListener('click', async () => {
        andar = false;
        graphReset = true;
        velocidade = vec(0, 0, 0);
        w = 0;

        await rate(100);

        // velMed.value = ( distPercorrida / t).toFixed(1);
        
        distPercorrida = 0;
        x1 = 0;
        x2 = 0;
        t = 0;
        
        carro.chassis.solo.pos = carro.chassis.solo.pos0;
        attCarro();
        
        document.getElementById('vel-velocidade').value = 5;
        btnAndar.style.backgroundColor = "#61bd71";
        btnAndar.style.color = "rgb(11,13,15)";
        btnAndar.innerHTML = "Andar";
    })

    let btnFollow = document.getElementById('follow-velocidade');
    let follow = true;
    btnFollow.addEventListener('click', async () => {

        if (follow) {
            scene.camera.follow(carro.chassis.solo);
            btnFollow.style.backgroundColor = '#314761';
            btnFollow.innerHTML = "Sair";
        } else {
            scene.camera.follow(null);
            btnFollow.style.backgroundColor = '#414a56';
            btnFollow.innerHTML = "Entrar";
        }

        follow = !follow;
    })
}

window.__context = { glowscript_container: $("#velocidade") };
velocidade();




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

// window.__context = { glowscript_container: $("#controles") };
// trajetoria();



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

// window.__context = { glowscript_container: $("#cubo") };
// planoInclinado();