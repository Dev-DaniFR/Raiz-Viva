
const botoes = document.querySelectorAll('.botao-link');

botoes.forEach(botao => {
    botao.addEventListener('click', (event) => {

        event.preventDefault();

        botao.classList.add('clicado');


        setTimeout(() => {
            botao.classList.remove('clicado');
            window.location.href = botao.href;
        }, 700);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Seleciona os botões que abrem o submenu nos cards
    const toggles = document.querySelectorAll('.menu-opener');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation(); // Impede o fechamento imediato

            // 1. Identifica o ID do submenu alvo
            const menuId = this.getAttribute('aria-controls');
            const submenu = document.getElementById(menuId);

            if (submenu) {
                // 2. Fecha todos os outros menus abertos (para garantir que apenas um esteja aberto)
                document.querySelectorAll('.card-submenu.aberto').forEach(openMenu => {
                    if (openMenu !== submenu) {
                        openMenu.classList.remove('aberto');
                        // Atualiza o ARIA do botão correspondente
                        const correspondingToggle = document.querySelector(`[aria-controls="${openMenu.id}"]`);
                        if (correspondingToggle) {
                            correspondingToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                });

                // 3. Alterna a classe 'aberto' no submenu clicado
                submenu.classList.toggle('aberto');

                // 4. Atualiza o atributo ARIA
                const isExpanded = submenu.classList.contains('aberto');
                this.setAttribute('aria-expanded', isExpanded);
            }
        });
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', function (event) {
        toggles.forEach(toggle => {
            const menuId = toggle.getAttribute('aria-controls');
            const submenu = document.getElementById(menuId);

            // Verifica se o clique não foi no botão e nem dentro do menu aberto
            if (submenu && submenu.classList.contains('aberto') && !toggle.contains(event.target) && !submenu.contains(event.target)) {
                submenu.classList.remove('aberto');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // === PARA O MENU HAMBURGUER ===
    const menuToggle = document.querySelector('.menu-hamburguer');
    const navMenu = document.getElementById('menu-principal');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            // 1. Alterna a classe 'aberto' no botão (para a animação do X)
            menuToggle.classList.toggle('aberto');

            // 2. Alterna a classe 'aberto' na navegação (para deslizar o menu)
            navMenu.classList.toggle('aberto');

            // 3. Atualiza o atributo ARIA para acessibilidade
            const isExpanded = navMenu.classList.contains('aberto');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
});