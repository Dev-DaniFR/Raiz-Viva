
document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // 1. LÓGICA DO MENU HAMBURGUER (OK)
    // ===========================================
    const botaoHamburguer = document.querySelector('.menu-hamburguer');
    const menu = document.getElementById('menu-principal');

    if (botaoHamburguer && menu) {
        botaoHamburguer.addEventListener('click', () => {
            menu.classList.toggle('aberto');
            botaoHamburguer.classList.toggle('aberto');
            const estaAberto = menu.classList.contains('aberto');
            botaoHamburguer.setAttribute('aria-expanded', estaAberto);
            document.body.style.overflow = estaAberto ? 'hidden' : 'auto';
        });

        const linksMenu = menu.querySelectorAll('a');
        linksMenu.forEach(link => {
            link.addEventListener('click', () => botaoHamburguer.click());
        });
    }

    // ===========================================
    // 2. MÁSCARAS DE INPUT
    // ===========================================
    const telefone = document.getElementById('telefone');
    const cep = document.getElementById('cep');
    const cpf = document.getElementById('cpf');

    // Máscaras
    telefone?.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    cep?.addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2');
    });

    cpf?.addEventListener('input', function (e) {
        e.target.value = e.target.value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    });

    // ====================================================================
    // 3. LÓGICA DO FORMULÁRIO 
    // ====================================================================
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const botaoSubmit = form ? form.querySelector("button[type='submit']") : null;

    // FUNÇÃO TOAST: Cria o elemento e define a lógica
    const toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);

    function mostrarToast(mensagem) {
        toast.textContent = mensagem;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }


    if (form && botaoSubmit && emailInput) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Impede o envio do formulário

            // ⚠️ Validação de E-mail
            const emailValue = emailInput.value.trim();
            // Verifica se tem '@' e '.' para uma validação mínima
            if (!emailValue.includes("@") || !emailValue.includes(".")) {
                mostrarToast("Por favor, insira um e-mail válido!");
                return; // Para a execução se falhar
            }

            // --- Se a validação passar, executa a lógica de sucesso ---

            // Mensagem de Sucesso
            const mensagem = document.createElement("p");
            mensagem.textContent = "🌱 Obrigado por se cadastrar no Raiz Viva!";

            mensagem.style.color = "#2b7a0b";
            mensagem.style.fontWeight = "bold";
            mensagem.style.marginTop = "20px";
            mensagem.style.textAlign = "center";


            const mensagemExistente = form.querySelector(".mensagem");
            if (mensagemExistente) mensagemExistente.remove();


            mensagem.classList.add("mensagem");
            form.appendChild(mensagem);
            form.reset();

            // Efeito de fade-in
            mensagem.style.opacity = 0;
            setTimeout(() => {
                mensagem.style.transition = "opacity 0.8s ease";
                mensagem.style.opacity = 1;
            }, 100);
        });
    }
});