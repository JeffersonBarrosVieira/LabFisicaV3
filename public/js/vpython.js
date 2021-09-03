let state = true;


// document.getElementById('mudar').addEventListener('click', () => {
//     state = !state;
//     if(state){
//         $('#glowscript2').empty();
//         window.__context = { glowscript_container: $("#glowscript2") };
//         esfera()

//     } else {
//         $('#glowscript2').empty();
//         window.__context = { glowscript_container: $("#glowscript2") };
//         cilindro()
//     }
// })



async function cubo() {
    var vector = vec
    let scene = canvas()
    scene.range = 2
    let b = box({color:color.cyan})
    b.rotate({angle:0.5, axis:vec(0,1,1)})
    
    async function rotacionar(obj) {
        let t = clock()

        while (true) {
            await rate(100)
            obj.rotate({angle:0.07, axis:vec(0,1,1)})
            if (clock()-t > 3) break
        }

        return 0
    }

    window.addEventListener('load', async () => {
        await new Promise( resolve => setTimeout(resolve, 2000));
        let x = await rotacionar(b);
    })
}

async function cilindro() {

    var vector = vec;
    let scene = canvas();
    // console.log(vec(0,1,1))
    scene.range = 2;
    let b = cylinder({color:color.cyan, axis: vec(6,0,0), pos: vec(-2, 0, 0)});
    let a = arrow({color: vec(89/255, 189/255, 136/255)});
    b.rotate({angle: 0.8, axis: vec(1,1,0)});
}

async function esfera() {

    var vector = vec
    let scene = canvas()
    scene.range = 2
    let b = sphere({color:color.cyan})
}

window.__context = { glowscript_container: $("#cubo") };
cubo();

window.__context = { glowscript_container: $("#cilindro") };
cilindro();

