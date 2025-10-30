document.addEventListener("DOMContentLoaded", function () {
    // === Variáveis Globais (Disponíveis em todo o script) ===
    const main = document.querySelector("main");
    const telaOriginalMain = main ? main.innerHTML : '';


    // =========================================================
    // 1. FUNÇÕES DE TEMA (APENAS ORIGINAL/ESCURO → CLARO)
    // =========================================================

    function toggleTema() {
        const body = document.body;

        // Se estiver no claro → volta para o escuro
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            localStorage.setItem('raizVivaTema', 'escuro');
            return;
        }

        // Se estiver no escuro → muda para claro
        body.classList.add('light-mode');
        localStorage.setItem('raizVivaTema', 'claro');
    }

    function aplicarTemaSalvo() {
        const temaSalvo = localStorage.getItem('raizVivaTema');
        const switchTema = document.getElementById('light-mode-switch');

        if (temaSalvo === 'claro') {
            document.body.classList.add('light-mode');
            if (switchTema) switchTema.checked = true;
        }

        if (switchTema) {
            switchTema.addEventListener('change', toggleTema);
        }
    }

    function aplicarTemaSalvo() {
        const temaSalvo = localStorage.getItem('raizVivaTema');
        const switchTema = document.getElementById('light-mode-switch');

        if (temaSalvo === 'dark') {
            document.body.classList.add('dark-mode');
        }

        if (temaSalvo === 'light') {
            document.body.classList.add('light-mode');
            if (switchTema) switchTema.checked = true;
        }

        if (switchTema) {
            switchTema.addEventListener('change', toggleTema);
        }
    }





    // --- Funções de Mensagem de Boas-Vindas (Específico da Home) ---
    function handleWelcomeMessage() {
        const welcomeContainer = document.getElementById('welcome-message-container');

        // Só executa se o container existir (Home Page)
        if (!welcomeContainer) {
            return;
        }

        const primeiraVisita = localStorage.getItem('raizVivaPrimeiraVisita');

        if (!primeiraVisita) {
            const mensagemHTML = `
                <div class="aviso-boas-vindas">
                    <h3> Bem-vindo(a) à Raiz Viva!</h3>
                    <p> É um prazer ter você aqui💚</p>
                    <button id="fechar-aviso">Ok</button>
                </div>
            `;
            welcomeContainer.innerHTML = mensagemHTML;

            // Anexa o evento para fechar o aviso
            document.getElementById('fechar-aviso').addEventListener('click', () => {
                welcomeContainer.style.display = 'none';
                localStorage.setItem('raizVivaPrimeiraVisita', 'true');
            });
        }
    }

    // =========================================================
    // 1. FUNÇÃO CENTRAL: ANEXAR TODOS OS EVENTOS
    // =========================================================
    function anexarTodosOsEventos() {

        // --- 1.1 Efeito de Clique em Botões (.botao-link) ---
        const botoes = document.querySelectorAll('.botao-link');
        botoes.forEach(botao => {
            botao.removeEventListener('click', handleBotaoClick);
            botao.addEventListener('click', handleBotaoClick);
        });
        function handleBotaoClick(event) {
            event.preventDefault();
            const botao = event.currentTarget;
            botao.classList.add('clicado');
            setTimeout(() => {
                botao.classList.remove('clicado');
                window.location.href = botao.href;
            }, 700);
        }

        // --- 1.2 Menu Hambúrguer ---
        const menuToggle = document.querySelector('.menu-hamburguer');
        const navMenu = document.getElementById('menu-principal');
        if (menuToggle && navMenu) {
            menuToggle.removeEventListener('click', handleMenuHamburguer);
            menuToggle.addEventListener('click', handleMenuHamburguer);
        }
        function handleMenuHamburguer() {
            menuToggle.classList.toggle('aberto');
            navMenu.classList.toggle('aberto');
            const isExpanded = navMenu.classList.contains('aberto');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        }

        // ====================================================================
        // --- 1.3 LÓGICA CONDICIONAL: SUBMENUS E SPA DOS CARDS (APENAS EM PROJETOS.HTML) ---
        // ====================================================================

        const cards = document.querySelectorAll('.projeto');

        // VERIFICA SE ESTÁ NA PÁGINA DE PROJETOS
        if (cards.length > 0) {

            // --- 1.3.1 Submenus dos Cards (Dropdown) ---
            const toggles = document.querySelectorAll('.menu-opener');
            toggles.forEach(toggle => {
                toggle.removeEventListener('click', handleMenuToggle);
                toggle.addEventListener('click', handleMenuToggle);
            });
            function handleMenuToggle(event) {
                event.preventDefault();
                event.stopPropagation();

                const menuId = event.currentTarget.getAttribute('aria-controls');
                const submenu = document.getElementById(menuId);

                if (submenu) {
                    // Lógica de fechar outros menus
                    document.querySelectorAll('.card-submenu.aberto').forEach(openMenu => {
                        if (openMenu !== submenu) {
                            openMenu.classList.remove('aberto');
                            const correspondingToggle = document.querySelector(`[aria-controls="${openMenu.id}"]`);
                            if (correspondingToggle) {
                                correspondingToggle.setAttribute('aria-expanded', 'false');
                            }
                        }
                    });

                    submenu.classList.toggle('aberto');
                    const isExpanded = submenu.classList.contains('aberto');
                    event.currentTarget.setAttribute('aria-expanded', isExpanded);
                }
            }

            // --- 1.3.2 SPA e Templates com JavaScript (Clique nos Cards) ---
            cards.forEach(card => {
                card.removeEventListener('click', handleCardClick);
                card.addEventListener('click', handleCardClick);
            });

            function gerarTemplate(projetoTitulo) {
                return `
                <section class="spa-projeto">
                    <h2>${projetoTitulo}</h2>
                    <p>A Raiz Viva agradece seu interesse! 💚<br>
                    Em breve você poderá acessar mais conteúdos sobre este projeto.</p>
                    <button id="voltarProjetos" class="botao-link">Voltar aos Projetos</button>
                </section>
                `;
            }

            function handleCardClick(e) {
                if (e.target.tagName.toLowerCase() === "a" || e.target.closest('.menu-opener')) return;

                const tituloElement = this.querySelector("h3") || this.querySelector("h2");
                const titulo = tituloElement ? tituloElement.innerText.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '').trim() : "Projeto";

                main.innerHTML = gerarTemplate(titulo);

                document.getElementById("voltarProjetos").addEventListener("click", () => {
                    main.innerHTML = telaOriginalMain;
                    anexarTodosOsEventos();
                });
            }
        } // FIM DA VERIFICAÇÃO cards.length > 0

        // Chamada da função de Mensagem de Boas-Vindas
        handleWelcomeMessage();

    } // FIM da função anexarTodosOsEventos()


    // =========================================================
    // 3. INICIALIZAÇÃO E LISTENERS GLOBAIS
    // =========================================================

    // 1. Aplica o Tema Escuro na carga (usando localStorage)
    aplicarTemaSalvo();

    // 2. ANEXA TODOS OS EVENTOS NA PRIMEIRA CARGA DA PÁGINA (inclui Menu Hambúrguer e a lógica SPA)
    anexarTodosOsEventos();

    // 3. Listener Global para fechar o submenu ao clicar fora (Só precisa ser anexado uma vez)
    document.addEventListener('click', function (event) {
        const toggles = document.querySelectorAll('.menu-opener');
        toggles.forEach(toggle => {
            const menuId = toggle.getAttribute('aria-controls');
            const submenu = document.getElementById(menuId);

            if (submenu && submenu.classList.contains('aberto') && !toggle.contains(event.target) && !submenu.contains(event.target)) {
                submenu.classList.remove('aberto');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

}); // FIM do DOMContentLoaded