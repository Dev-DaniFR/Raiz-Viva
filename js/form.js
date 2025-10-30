document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    const form = document.querySelector("form");
    const camposObrigatorios = document.querySelectorAll("input[required]");
    const emailInput = document.getElementById("email");

    // ---- TEMPLATES SPA ---- //
    const telaSucesso = `
        <section class="sucesso">
            <h2>🎉 Cadastro realizado com sucesso!</h2>
            <p>Obrigado por fazer parte do projeto Raiz Viva 💚</p>
            <button id="voltar">Voltar ao cadastro</button>
        </section>
    `;

    const mostrarAlertaCampo = (input, mensagem) => {
        input.classList.add("erro-campo");
        input.setAttribute("title", mensagem);
    };

    const removerAlertaCampo = (input) => {
        input.classList.remove("erro-campo");
        input.removeAttribute("title");
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let valido = true;

        camposObrigatorios.forEach((input) => {
            if (input.value.trim() === "") {
                mostrarAlertaCampo(input, "Campo obrigatório");
                valido = false;
            } else {
                removerAlertaCampo(input);
            }
        });

        // Verificação do e-mail
        if (!emailInput.value.includes("@")) {
            mostrarAlertaCampo(emailInput, "E-mail inválido");
            valido = false;
        }

        if (!valido) return;

        // ✅ Se tudo OK → carregar template SPA
        app.innerHTML = telaSucesso;

        // Botão para retornar ao formulário
        document.getElementById("voltar").addEventListener("click", () => {
            location.reload(); // Simples e funcional
        });
    });
});
