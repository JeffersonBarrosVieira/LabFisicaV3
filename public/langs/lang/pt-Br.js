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
    section1__content: `LabFísica é uma plataforma virtual que traz um ambiente de desenvolvimento acadêmico para estudantes e professores da área da Física. Resolva problemas físicos, visualize, interaja com eles e realize uma análise da modelagem matemática completa que é disponibilizada!!!`,
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
        `A ciência da mecânica busca fornecer uma descrição precisa e consistente da dinâmica das partículas e dos sistemas de partículas [1], é uma representação matemática dos movimentos que utilizam leis físicas baseadas em fatos experimentais.`,
        `Antes de nos desbravar das aplicações, é necessário saber alguns conceitos fundamentais, tais como:`,
        ` -> Distância;`,
        ` -> Tempo.`,
        `Com eles, é possível entender: velocidade e aceleração de um dado corpo. Portanto, nesta seção será tratado primeiramente movimentos sem suas causas, isto é, a geometria do movimento (cinemática). Depois, a implementação da causa (dinâmica).`
    ],
    
    section5__title: `1.1 CINEMÁTICA`,
    section5__content: [
        `A cinemática é a parte da mecânica que estuda e descreve os movimentos, sem se preocupar com as suas causas.`,
        `Nela se encontram conceitos extremamente importantes, tais como:`,
        ` -> Referencial: Um ponto em relação ao qual se verifica a variação da posição de um outro;`,
        ` -> Movimento: Variação da posição de um corpo em relação a um referencial, em um intervalo de tempo qualquer;`,
        ` -> Repouso: Quando a posição do corpo não varia, em relação a um referencial;`,
        ` -> Trajetória: É o caminho que ele percorreu durante sucessivos instantes de tempo, ao longo de seu movimento.`
    ],

    section6__content1: [
        `Insira um valor na Simulação 1.1 e aperte em INICIAR para movimentar o avião em uma velocidade constante.`,
        `Alterne o ponto de vista clicando em Entrar/Sair, observe que o pacote que o avião carrega visto:`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        ` -> Da Terra: Descreve um movimento retilineo na horizontal;`,
        ` -> Do Avião: Está em repouso (se movimenta junto com ele).`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        `Agora clique em SOLTAR, para arremessar o pacote.`
        
    ],
    section6__content2: [
        `Veja que a trajetória do pacote para os observadores vista: `,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        ` -> Na Terra: Será parabólica;`,
        ` -> No Avião: É Retilínea na vertical.`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        `Perceba, os conceitos de movimento, repouso e trajetória dependem do referencial adotado. Sabendo disso, é de extrema importância diferenciar deslocamento de distância percorrida, veja a Simulação 1.2:`,
        
    ],

    section7__dadosquadro: [
        ``,
    ],
    section7__content: [
        `onde:`,
        `Dp- Distância percorrida;`,
        `Dd- Distância deslocada (deslocamento).`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        `Observe que, com o objeto centrado na origem temos:`,
        `# Distancia percorrida = 21,84m;`,
        `# Deslocamento = 3m.`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        `Com o objeto deslocado (clique em Deslocar):`,
        `# Distancia percorrida = 18,84m;`,
        `# Deslocamento = 0m.`,
        
    ],


    section8__content1: [
        `Ambas situações tomam como referência o ponto de partida do objeto.`,
        `Sendo assim:`,
        `-> Distância percorrida está ligado ao comprimento trajetória;`,
        `-> Deslocamento tem uma ligação direta entre o ponto inicial e final.`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        `Para calcular a distância percorrida na primeira situação, como o objeto parte da origem, basta fazer a soma entre o raio da circunferência e o perímetro dela:`,
        `$$Dp = {R + P} = {R + 2\\pi R}.$$`,
        `Inserindo os valores temos:`,
        `$$ {3 + 2\\pi 3} = {3+18,84}={21,84m}.$$`,
        
    ],
    section8__content2: [
        `Já a distância percorrida na segunda situação foi apenas uma trajetória circular, logo, basta cálcular o perímetro dela:`,
        `$$ Dp = {P} = {2\\pi R}.$$`,
        `Inserindo os valores temos:`,
        `$$ {2\\pi 3} = {18,84m}.$$`,
        `Para achar o deslocamento, basta calcular a posição final menos a inicial e chegará nos valores citado.`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        `Por enquanto apenas o entendimento de deslocamento é necessário, não realizaremos esse cálculo pois necessita conceituar vetores. No entanto, perceba que: se um corpo parte de um ponto e volta ao mesmo ponto, o deslocamento será zero independente da distância percorrida!`
    ],

    section9__title: `1.1.1 Cinemática Escalar`,
    section9__content: [
        `Entendido os conceitos contido no movimento de um corpo, agora é possível compreender velocidade média. Matematicamente ela é expressa da seguinte forma:`,
        `$$ {V} = { { \\Delta S } \\over { \\Delta t } }\\hspace10ex (1.1)$$`,
        `Logo, quando a posição "S" de um corpo varia com o passar do tempo "t", dizemos que ele está em movimento, isto é, ele possui uma certa velocidade.`,
    ],
    section9__dados__quadro: [
       ``
    ],

    section10__content1: [
        `Insira uma velocidade na Simulação 1.3 para movimentar o carrinho. Alterne o ponto de vista clicando em Entrar/Sair. Ao pressionar em Andar/Parar perceba que é gerado um gráfico, nele mostra a posição do carro em um determinado instante de tempo.`,
        `Os números na vertical indica a posição em relação a origem (em metros), os números da horizonatal indica o tempo (em segundos).`,
        `Observe que a inclinação da reta será:`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        ` -> Maior, se inserir uma velocidade maior;`,
        ` -> Menor, se inserir uma velocidade menor;`,
        ` -> Zero, se estiver em repouso;`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
    ],
    section10__content2: [
        `Além disso, perceba que:`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        ` -> Se V > 0 (positiva), a reta é crescente (inclinada para cima);`,
        ` -> Se V < 0 (negativa), a reta é decrescente (inclinada para baixo).`,
        ` . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . `,
        `O movimento visto na Simulação 1.3, onde a variação da posição em relação ao tempo é uniforme (velocidade constante), é denominado: Movimento Retilineo Uniforme - MRU.`,
        `Nesse tipo de movimento é possível prever a posição de um dado corpo em movimento, desde que, conheça sua velocidade e sua posição inicial. Para isso basta utilizar a seguinte equação:`,
        `$$ S(t) = S_0 + V.t \\hspace10ex (1.2)$$`
    ],

    
    // footer__reference__title: `Referências`,
    footer__reference__title: ``,
    footer__references: [
        // `[1] - J.B. Marion, S.T. Thornton, Classical Dynamics of Particles and Systems, 5th Edition (Brooks/Cole Thomson Learning, 2004), p.43;`,
        `[1] - HALLIDAY, David; RESNICK, Robert; WALKER, Jearl. Fundamentos de física. 8. ed. Rio de Janeiro, RJ: LTC, vol 1`,
    ]
    // &nbsp; adiciona 1 espaço
    // &ensp; adiciona 2 espaços
    // &emsp; adiciona 4 espaços
}