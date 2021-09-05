let state = true;


/* - - - - - - -  CUBO  - - - - - - - */
async function cubo() {

    let scene = canvas()
    scene.range = 2
    let bloco = box({color:color.cyan})
    bloco.rotate({angle:0.5, axis:vec(0,1,1)})
    
    async function rotacionar(obj) {
        let t = clock()

        while (true) {
            await rate(100);
            obj.rotate({angle:0.07, axis:vec(0,1,1)});
            if (clock()-t > 3) break; 
        }

        return 0;
    }

    window.addEventListener('load', async () => {
        await new Promise( resolve => setTimeout(resolve, 2000));
        let x = await rotacionar(bloco);
    })
}

window.__context = { glowscript_container: $("#cubo") };
cubo();

/* - - - - - - -  CILINDRO  - - - - - - - */
async function cilindro() {

    let scene = canvas();
    scene.range = 2;
    let cilindro = cylinder({color:color.cyan, axis: vec(6,0,0), pos: vec(-2, 0, 0)});
    let a = arrow({color: vec(89/255, 189/255, 136/255)});
    cilindro.rotate({angle: 0.8, axis: vec(1,1,0)});

    return 0;
}

window.__context = { glowscript_container: $("#cilindro") };
cilindro();



/* - - - - - - -  funções  - - - - - - - */
function multiplicarVetor( vetor, num ) {
    return vec( vetor.x * num, vetor.y * num, vetor.z * num )
}

function somarVetor( vetor1, vetor2 ) {
    return vec( vetor1.x + vetor2.x, vetor1.y + vetor2.y, vetor1.z + vetor2.z)
}

/* - - - - - - -  TRAJETÓRIA  - - - - - - - */
async function trajetoria() {

    let scene = canvas();
    let dt = 0.001
    scene.range = 4;
    let particula = sphere({
        color:color.cyan,
        radius: 0.5,
        make_trail: true,
        retain: 200,
        pos: vec(0, 0, 0),
        velocity: vec(0, 0, 0),
    });
    
    let btnStart = document.getElementById('btn-trajetoria');
    let btnReset = document.getElementById('reset-trajetoria');
    let btnFollow = document.getElementById('follow-trajetoria');

    async function lancarObjeto(velocidade){
        particula.velocity = velocidade;
        let cond = true;

        btnStart.addEventListener('click', () =>{
            cond = false
        });
        btnReset.addEventListener('click', () =>{
            cond = false
        });


        while (cond){
            await rate(100);
            particula.pos = somarVetor(particula.pos, multiplicarVetor(particula.velocity, dt));
        }
    }

    btnStart.addEventListener('click', async () => {
        let vx = document.getElementById('velx-tragetoria');
        let vy = document.getElementById('vely-tragetoria');
        let vz = document.getElementById('velz-tragetoria');

        lancarObjeto( vec(vx.value, vy.value, vz.value) );
    })

    btnReset.addEventListener('click', async () => {
        document.getElementById('velx-tragetoria').value = '';
        document.getElementById('vely-tragetoria').value = '';
        document.getElementById('velz-tragetoria').value = '';

        lancarObjeto( vec(0, 0, 0) );
        particula.pos = vec(0,0,0);
        particula.clear_trail();
    })


    let follow = true;
    btnFollow.addEventListener('click', async () => {
        follow ? scene.camera.follow(particula) : scene.camera.follow(null);
        follow = !follow;
    })

    return 0;
}



window.__context = { glowscript_container: $("#trajetoria") };
trajetoria();