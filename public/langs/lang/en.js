module.exports = {
    user: null,
    
    lang: `en`,
    route: `/en`,
    title: `LabFísica`,

    preload__name: `Loading...`,

    header__tutorial__button: `Tutorial`,

    header__topicos__btn: [
        {
            name: `Classical Mechanics`,
            id: `m_c`,
            href: `#mecanica-classica`,
        },
        // {
        //     name: `Oscillations and Waves`,
        //     id: `o_o`,
        //     href: `#oscilacao-ondas`,
        // },
        // {
        //     name: `Thermodynamics`,
        //     id: `t_d`,
        //     href: `#termodinamica`,
        // },
        // {
        //     name: `Geometrical Optics`,
        //     id: `o_g`,
        //     href: `#optica-geometrica`
        // }
    ],
    header__topicos__referencias: `References`,
    main__topo__singUp: `Sing Up`,
    main__topo__logIn: `Log In`,

    main__topo__pesquisar__campo: `Search`,

    section1__title: `A Physics Laboratory in your hands`,
    section1__content: `LabFisica is a virtual platform that provides an environment for academic development for students and professors in the field of Physics. Solve physical problems, visualize, interact with them and perform an analysis of the complete mathematical modeling that is available!!!`,
    section1__hashtag: `#Let'sModel`,

    section2__card1__icon: `/img/cubo.png`,
    section2__card1__title: `Physical Simulation`,
    section2__card1__content: `Often due to the impossibility of testing techniques and solving hypotheses directly in the real world. We are forced to solve problems through an analogy with reality: Simulation.`,

    section2__card2__icon: `/img/raiz.png`,
    section2__card2__title: `Mathematical Model`,
    section2__card2__content: `Simulations use models in many cases if an analytical solution is possible. If these retain characteristics: PHYSICAL and LOGICAL of the imitated REAL SYSTEM, it will bring results close to reality.`,

    section2__card3__icon: `/img/balao.png`,
    section2__card3__title: `Suggestions`,
    section2__card3__content: `Found a problem? Or do you have physical situations in mind that you want to suggest to be simulated here at LabFisica? Very cool!!! Well send a message now!! Explaining in detail.`,
    section2__card3__button: `To write`,

    section3__title: `Let's start?`,
    section3__content: `These animations are interactive! It is possible to rotate the object and zoom in!!! :0 Very cool right?! ^^ So... let's go? To view the instructions, press and hold the option that corresponds to your device:`,
    section3__aparelho1: `Smartphone`,
    section3__aparelho2: `Computer`,

    section4__title: `1 CLASSICAL MECHANICS`,
    section4__content: [
        `The science of mechanics seeks to provide an accurate and consistent description of the dynamics of particles and particle systems [1], it is a mathematical representation of motion using physical laws based on experimental facts.`,
        `Before breaking into applications, it is necessary to know some fundamental concepts, such as:`,
        ` -> Distance;`,
        ` -> Time.`,
        `With them, it is possible to understand: velocity and acceleration of a given body. Therefore, in this section we will first deal with movements without their causes, that is, the geometry of the movement (kinematics). Then the implementation of the (dynamic) cause.`
    ],
    
    section5__title: `1.1 KINEMATICS`,
    section5__content: [
        `Kinematics is the part of mechanics that studies and describes movements, without worrying about their causes.`,
        `It contains extremely important concepts, such as:`,
        ` -> Referential: A point in relation to which the position of another one varies;`,
        ` -> Movement: Variation of the position of a body in relation to a reference frame, in any time interval;`,
        ` -> Rest: When the position of the body does not vary, relative to a reference frame;`,
        ` -> Trajectory: It is the path he traveled during successive moments of time, along his movement.`
    ],

    section6__content1: [
        `Enter a value in Simulation 1.1 and press START to move the plane at a constant speed.`,
        `Switch the viewpoint by clicking Enter/Exit, note that the package the plane carries is seen:`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        ` -> From Earth: Describes a straight horizontal motion;`,
        ` -> From the Airplane: It is at rest (moves with it).`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        `Now click on DROP, to throw the package.`
        
    ],
    section6__content2: [
        `See that the trajectory of the packet for observers seen: `,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        ` -> On Earth: It will be parabolic;`,
        ` -> On the plane: It is straight upright.`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        `You see, the concepts of movement, rest and trajectory depend on the adopted framework. Knowing this, it is extremely important to differentiate displacement from the distance covered, see Simulation 1.2:`,
        
    ],

    section7__dadosquadro: [
        ``,
    ],
    section7__content: [
        `where:`,
        `Dp- Distance covered;`,
        `Dd- Displaced distance (offset).`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        `Note that with the object centered at the origin we have:`,
        `# Distance covered = 21.84m;`,
        `# Displacement = 3m.`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        `With the object shifted (click on Shift):`,
        `# Distance covered = 18.84m;`,
        `# Displacement = 0m.`,
        
    ],


    section8__content1: [
        `Both situations take as reference the starting point of the object.`,
         `Therefore:`,
         `-> Distance traveled is linked to trajectory length;`,
         `-> Offset has a direct link between the start and end point.`,
         ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
         `To calculate the distance covered in the first situation, as the object starts from the origin, just add the radius of the circle and its perimeter:`,
         `$$Dp = {R + P} = {R + 2\\pi R}.$$`,
         `Inserting the values we have:`,
         `$$ {3 + 2\\pi 3} = {3+18.84}={21.84m}.$$`,
        
    ],
    section8__content2: [
        `The distance covered in the second situation was just a circular trajectory, so just calculate its perimeter:`,
         `$$ Dp = {P} = {2\\pi R}.$$`,
         `Inserting the values we have:`,
         `$$ {2\\pi 3} = {18.84m}.$$`,
         `To find the displacement, just calculate the final position minus the initial one and it will arrive at the quoted values.`,
         ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
         `For now only the understanding of displacement is necessary, we will not perform this calculation because it needs to conceptualize vectors. However, note that: if a body starts from a point and returns to the same point, the displacement will be zero regardless of the distance covered!`
    ],

    section9__title: `1.1.1 Scalar Kinematics`,
    section9__content: [
        `Understanding the concepts contained in the movement of a body, it is now possible to understand average speed. Mathematically it is expressed as follows:`,
         `$$ {V} = { { \\Delta S } \\over { \\Delta t } }\\hspace10ex (1.1)$$`,
         `So, when the position "S" of a body varies with time "t", we say that it is in motion, that is, it has a certain speed.`,
    ],
    section9__dados__quadro: [
       ``
    ],

    section10__content1: [
        `Enter a speed in Simulation 1.3 to move the cart. Switch the view by clicking Enter/Exit. By pressing on Walk/Stop, notice that a graph is generated, showing the position of the car at a given instant of time.`,
         `The numbers on the vertical indicate the position in relation to the origin (in meters), the numbers on the horizonatal indicate the time (in seconds).`,
         `Note that the slope of the line will be:`,
         ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
         ` -> Higher, if you enter a higher speed;`,
         ` -> Lower, if you enter a lower speed;`,
         ` -> Zero, if at rest;`,
         ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
    ],
    section10__content2: [
        `Also, note that:`,
         ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
         ` -> If V > 0 (positive), the line is increasing (sloping upwards);`,
         ` -> If V < 0 (negative), the line is decreasing (sloping down).`,
         ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
         `The movement seen in Simulation 1.3, where the variation of position in relation to time is uniform (constant velocity), is called: Uniform Straight Movement - MRU.`,
         `In this type of movement it is possible to predict the position of a given moving body, as long as you know its speed and its starting position. To do this, just use the following equation:`,
         `$$ S(t) = S_0 + V.t \\hspace10ex (1.2)$$`
    ],

    
    footer__reference__title: `References`,
    footer__references: [
        // `[1] - J.B. Marion, S.T. Thornton, Classical Dynamics of Particles and Systems, 5th Edition (Brooks/Cole Thomson Learning, 2004), p.43;`,
        `[1] - HALLIDAY, David; RESNICK, Robert; WALKER, Jearl. Fundamentos de física. 8. ed. Rio de Janeiro, RJ: LTC, vol 1;`,
    ]

}