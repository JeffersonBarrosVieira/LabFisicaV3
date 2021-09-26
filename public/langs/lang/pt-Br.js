module.exports = {
    lang: `pt-Br`,
    route: `/`,
    title: `LabFísica`,

    preload__name: `Carregando...`,

    header__tutorial__button: `Tutorial`,

    header__topicos__btn: [
        {
            name: `Mecânica Clássica`,
            id: `m_c`,
            href: `#mecanica-classica`,
        },
        // {
        //     name: `Oscilações e Ondas`,
        //     id: `o_o`,
        //     href: `#oscilacao-ondas`,
        // },
        // {
        //     name: `Termodinâmica`,
        //     id: `t_d`,
        //     href: `#termodinamica`,
        // },
        // {
        //     name: `Óptica Geométrica`,
        //     id: `o_g`,
        //     href: `#optica-geometrica`
        // }
    ],
    header__topicos__referencias: `Referências`,
    
    main__topo__pesquisar__campo: `Pesquisar`,

    section1__title: `Um Laboratório de Física em suas mãos`,
    section1__content: `LabFísica é um ambiente de desenvolvimento acadêmico para estudantes e professores da área da Física. Resolva problemas físicos, visualize, interaja com ele e realize uma análise da modelagem matemática completa que será disponibilizada!!!`,
    section1__hashtag: `#VamosModelar`,

    section2__card1__icon: `/img/cubo.png`,
    section2__card1__title: `Simulação Física`,
    section2__card1__content: `Muitas vezes devido a impossibilidade de testar técnicas e hipóteses de resolução diretamente no mundo real. Somos impostos a solucionar problemas através de uma analogia com a realidade: a Simulação.`,

    section2__card2__icon: `/img/raiz.png`,
    section2__card2__title: `Modelo Matemático`,
    section2__card2__content: `Simulações utilizam modelos, em muitos casos, se uma solução analítica for possível. Se estes conservam características: FÍSICAS e LÓGICAS do SISTEMA REAL imitado, trará resultados próximos ao da realidade.`,

    section2__card3__icon: `/img/balao.png`,
    section2__card3__title: `Sugestões`,
    section2__card3__content: `Encontrou algum problema? Ou você tem situações físicas em mente que deseja sugerir para serem simuladas aqui no LabFísica? Que massa!!! Pois envie uma mensagem agora!! Explicando detalhadamente.`,
    section2__card3__button: `Escrever`,

    section3__title: `Vamos começar?`,
    section3__content: `Essas animações são interativas! É possível rotacionar o objeto e dar zoom!!! :0 Muito legal né?! ^^ Então... vamos lá? Para visualizar as instruções mantenha pressionado a opção que corresponde ao seu aparelho:`,
    section3__aparelho1: `Celular`,
    section3__aparelho2: `Computador`,

    section4__title: `1 MECÂNICA CLÁSSICA`,
    section4__content: [
        `A ciência da mecânica busca fornecer uma descrição precisa e consistente da dinâmica das partículas e dos sistemas de partículas, é uma representação matemática dos movimentos que utilizam leis físicas baseadas em fatos experimentais.`,
        `Antes de nos desbravar das aplicações, é necessário saber alguns conceitos fundamentais, tais como:`,
        ` -> Distância;`,
        ` -> Tempo.`,
        `Com eles, é possível entender: velocidade e aceleração de um dado corpo. Portanto, nesta seção será tratado primeiramente movimentos sem suas causas, isto é, a geometria do movimento (cinemática). Depois, a implementação da causa (dinâmica).`
    ],
    
    section5__title: `1.1 Cinemática`,
    section5__content: [
        `A cinemática é a parte da mecânica que estuda e descreve os movimentos, sem se preocupar com as suas causas.`,
        `Nela se encontram conceitos extremamente importantes, tais como:`,
        ` -> Referencial: é todo ponto em relação ao qual se verifica a variação da posição de um outro corpo;`,
        ` -> Movimento: Quando a posição de um corpo varia, em relação a um referencial, durante um intervalo de tempo qualquer;`,
        ` -> Repouso: Quando a posição do corpo não varia, em relação a um referencial;`,
        ` -> Trajetória: É caminho que ele percorreu durante sucessivos instantes de tempo, ao longo de seu movimento.`
    ],

    section6__content1: [
        `Insira um valor na simulação e aperte em INICIAR para movimentar o avião em uma velocidade constante. Em seguida clique em SOLTAR, para arremessar o pacote.`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .`,
        ` Alterne o ponto de vista clicando em SEGUIR, veja que a trajetória do pacote para os observadores: `,
        ` -> Na Terra: Será parabólica;`,
        ` -> No avião: Aproximadamente retilínea e vertical.`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .`,
        `Assim, os conceitos de movimento, repouso e trajetória dependem do referencial adotado`
    ],
    section6__content2: [
        `...`,
    ],


    sectionControl__title: `Controles Teste`,

    
    footer__reference__title: `Referências`,
    footer__references: [
        `[1] - J.B. Marion, S.T. Thornton, Classical Dynamics of Particles and Systems, 5th Edition (Brooks/Cole Thomson Learning, 2004), p.43;`,
    ]

}