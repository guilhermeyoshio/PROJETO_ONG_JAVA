// ARQUIVO: js/main.js (COMPLETO E MODIFICADO)

// --- INICIALIZAÇÃO DO MODO DE ACESSIBILIDADE ---
// Roda IMEDIATAMENTE (IIFE) para evitar "flicker" de tema
(function() {
    // 1. Verifica preferência salva no localStorage
    const preferencia = localStorage.getItem('theme');
    if (preferencia === 'dark-mode') {
        document.body.classList.add('dark-mode');
    }
})();
// --- FIM DA SEÇÃO DE ACESSIBILIDADE ---


// CÓDIGO ORIGINAL DO PROJETO (com a adição do listener do botão)
document.addEventListener('DOMContentLoaded', () => {

    // --- ADICIONADO: INICIALIZA O BOTÃO DE ACESSIBILIDADE ---
    // (A função IIFE acima já aplicou o tema, aqui só adicionamos o clique)
    function inicializarToggleAcessibilidade() {
        const toggleBtn = document.getElementById('accessibility-toggle-btn');
        
        // Verifica se o botão existe e se já não tem um listener
        if (toggleBtn && !toggleBtn.dataset.listenerAtivo) {
            toggleBtn.dataset.listenerAtivo = 'true'; // Marca que o listener foi adicionado
            toggleBtn.addEventListener('click', () => {
                const isDarkMode = document.body.classList.toggle('dark-mode');
                
                // Salva a preferência
                if (isDarkMode) {
                    localStorage.setItem('theme', 'dark-mode');
                } else {
                    localStorage.setItem('theme', 'light-mode');
                }
            });
        }
    }
    // Chama a função na carga inicial
    inicializarToggleAcessibilidade();
    // NOTA: Como o SPA do seu código *NÃO* recarrega o header,
    // não precisamos chamar essa função de novo dentro do `carregarPagina`.
    // --- FIM DA ADIÇÃO DE ACESSIBILIDADE ---


    // --- VALIDAÇÃO DO FORMULÁRIO (AGORA DENTRO DE UMA FUNÇÃO) ---
    function inicializarValidacaoFormulario() {
        const formCadastro = document.querySelector('form'); // Encontra o form na PÁGINA ATUAL
        const nomeInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const cpfInput = document.getElementById('cpf');
        const telefoneInput = document.getElementById('telefone');
        const cepInput = document.getElementById('cep');
        const dataNascimentoInput = document.getElementById('nascimento');
        const enderecoInput = document.getElementById('endereco');
        const cidadeInput = document.getElementById('cidade');
        const estadoInput = document.getElementById('estado');

        // Função genérica para mostrar erro
        function mostrarErro(inputElement, message) {
            if (!inputElement) return;
            const errorSpan = document.getElementById(`${inputElement.id}-error`);
            if (errorSpan) {
                errorSpan.textContent = message;
            }
            inputElement.classList.add('error');
        }

        // Função genérica para limpar erro
        function limparErro(inputElement) {
             if (!inputElement) return;
            const errorSpan = document.getElementById(`${inputElement.id}-error`);
            if (errorSpan) {
                errorSpan.textContent = '';
            }
            inputElement.classList.remove('error');
        }

        // Função para validar email
        function validarEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        // Função para validar campo obrigatório
        function validarCampoObrigatorio(inputElement) {
            if (!inputElement) return true;
            if (inputElement.value.trim() === '') {
                mostrarErro(inputElement, 'Este campo é obrigatório.');
                return false;
            }
            // Só limpa erro genérico se não houver erro específico de formato
            const errorSpan = document.getElementById(`${inputElement.id}-error`);
            if (errorSpan && errorSpan.textContent === 'Este campo é obrigatório.') {
                 limparErro(inputElement);
            }
            return true;
        }

        // Validação específica para Email
        function validarCampoEmail(inputElement) {
            if (!inputElement) return true;
            if (!validarCampoObrigatorio(inputElement)) return false;

            if (!validarEmail(inputElement.value)) {
                mostrarErro(inputElement, 'Formato de e-mail inválido.');
                return false;
            }
            limparErro(inputElement);
            return true;
        }

         // Função para validar formato com Regex
         function validarFormato(inputElement, regex, mensagemErroFormato) {
            if (!inputElement) return true;
             if (!validarCampoObrigatorio(inputElement)) return false;

             let valorSemMascara = inputElement.value;
             if(inputElement.id === 'cpf') valorSemMascara = valorSemMascara.replace(/\D/g, '');
             if(inputElement.id === 'telefone') valorSemMascara = valorSemMascara.replace(/\D/g, '');
             if(inputElement.id === 'cep') valorSemMascara = valorSemMascara.replace(/\D/g, '');


             if (!regex.test(inputElement.value)) {
                 mostrarErro(inputElement, mensagemErroFormato);
                 return false;
             }

             if(inputElement.id === 'cpf' && valorSemMascara.length !== 11){
                 mostrarErro(inputElement, mensagemErroFormato);
                 return false;
             }
             if(inputElement.id === 'cep' && valorSemMascara.length !== 8){
                 mostrarErro(inputElement, mensagemErroFormato);
                 return false;
             }

             limparErro(inputElement);
             return true;
         }

         const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
         const telefoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
         const cepRegex = /^\d{5}-\d{3}$/;


        // --- Validação no SUBMIT ---
        // Adiciona o listener APENAS se o formulário existir nesta página
        if (formCadastro) {
            formCadastro.addEventListener('submit', (event) => {
                event.preventDefault(); // Previne o envio

                let formValido = true;

                // Valida TODOS os campos
                formValido = validarCampoObrigatorio(nomeInput) && formValido;
                formValido = validarCampoObrigatorio(dataNascimentoInput) && formValido;
                formValido = validarCampoObrigatorio(enderecoInput) && formValido;
                formValido = validarCampoObrigatorio(cidadeInput) && formValido;
                formValido = validarCampoObrigatorio(estadoInput) && formValido;
                formValido = validarCampoEmail(emailInput) && formValido;
                formValido = validarFormato(cpfInput, cpfRegex, 'Formato de CPF inválido (use xxx.xxx.xxx-xx)') && formValido;
                formValido = validarFormato(telefoneInput, telefoneRegex, 'Formato de telefone inválido (use (xx) xxxxx-xxxx)') && formValido;
                formValido = validarFormato(cepInput, cepRegex, 'Formato de CEP inválido (use xxxxx-xxx)') && formValido;

                if (formValido) {
                    alert('Cadastro enviado com sucesso! (Simulação)');
                } else {
                    alert('Por favor, corrija os erros destacados no formulário.');
                }
            });

             // --- Máscaras e Validação Dinâmica ---
             const inputsParaValidar = [
                 nomeInput, emailInput, cpfInput, telefoneInput, dataNascimentoInput,
                 cepInput, enderecoInput, cidadeInput, estadoInput
             ];

             inputsParaValidar.forEach(input => {
                 if (input) {
                     input.addEventListener('input', () => { // Máscaras
                         if (input === cpfInput) {
                             let value = input.value.replace(/\D/g, '');
                             value = value.replace(/(\d{3})(\d)/, '$1.$2');
                             value = value.replace(/(\d{3})(\d)/, '$1.$2');
                             value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                             input.value = value.slice(0, 14);
                         }
                         if (input === telefoneInput) {
                             let value = input.value.replace(/\D/g, '');
                             value = value.replace(/^(\d{2})(\d)/, '($1) $2');
                             value = value.replace(/(\d{5})(\d)/, '$1-$2');
                             input.value = value.slice(0, 15);
                         }
                          if (input === cepInput) {
                             let value = input.value.replace(/\D/g, '');
                             value = value.replace(/(\d{5})(\d)/, '$1-$2');
                             input.value = value.slice(0, 9);
                         }
                     });

                     input.addEventListener('blur', () => { // Validação ao sair
                         if (input === nomeInput) validarCampoObrigatorio(input);
                         if (input === emailInput) validarCampoEmail(input);
                         if (input === cpfInput) validarFormato(input, cpfRegex, 'Formato de CPF inválido (use xxx.xxx.xxx-xx)');
                         if (input === telefoneInput) validarFormato(input, telefoneRegex, 'Formato de telefone inválido (use (xx) xxxxx-xxxx)');
                         if (input === cepInput) validarFormato(input, cepRegex, 'Formato de CEP inválido (use xxxxx-xxx)');
                         if (input === dataNascimentoInput) validarCampoObrigatorio(input);
                         if (input === enderecoInput) validarCampoObrigatorio(input);
                         if (input === cidadeInput) validarCampoObrigatorio(input);
                         if (input === estadoInput) validarCampoObrigatorio(input);
                     });
                 }
             });
        } // Fim do if(formCadastro)
    } // Fim da função inicializarValidacaoFormulario


    // --- SISTEMA DE SPA BÁSICO ---

    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('header nav a:not(.submenu a)'); // Seleciona só links do menu principal

    async function carregarPagina(url) {
        // Mostra um feedback visual de carregamento (opcional)
        if(mainContent) mainContent.innerHTML = '<p style="text-align: center; padding: 50px;">Carregando...</p>';

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
            const text = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const novoMainContent = doc.getElementById('main-content');
            const novoTitle = doc.querySelector('title');

            if (mainContent && novoMainContent) {
                mainContent.innerHTML = novoMainContent.innerHTML;
                document.title = novoTitle ? novoTitle.textContent : 'ONG Vida Nova';

                // Re-inicializa scripts conforme a página carregada
                const pageUrl = url.split('/').pop(); // Pega o nome do arquivo

                if (pageUrl === 'cadastro.html') {
                    inicializarValidacaoFormulario();
                }
                if (pageUrl === 'projetos.html') {
                     carregarProjetosComTemplate();
                }

            } else {
                 throw new Error('Conteúdo principal não encontrado.');
            }

        } catch (error) {
            console.error('Falha ao carregar página via SPA:', error);
            if (mainContent) mainContent.innerHTML = `<p style="color: red; text-align: center; padding: 50px;">Erro ao carregar conteúdo: ${error.message}</p>`;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const urlDestino = link.getAttribute('href');

            // Só intercepta links internos relativos
            if (urlDestino && !urlDestino.startsWith('http') && !urlDestino.startsWith('#')) {
                event.preventDefault();
                carregarPagina(urlDestino);
                history.pushState({ page: urlDestino }, '', urlDestino); // Atualiza URL
            }
        });
    });

    // Lida com Voltar/Avançar do navegador
    window.addEventListener('popstate', (event) => {
        // Se o estado tiver a informação da página, carrega ela, senão carrega a inicial
        const url = event.state ? event.state.page : 'index.html';
        carregarPagina(url);
    });

    // --- FIM DO SISTEMA DE SPA ---


    // --- SISTEMA DE TEMPLATES JAVASCRIPT (PARA PÁGINA DE PROJETOS) ---
    const dadosProjetos = [
        { imagem: 'imagens/projeto1.jpg', alt: 'Crianças em roda de leitura', badges: [{ classe: 'badge-educacao', texto: 'Educação' }, {classe: 'badge-cultura', texto: 'Cultura'}], titulo: 'Projeto "Ler para Crescer"', descricao: 'Incentivamos o hábito da leitura com oficinas e doação de livros.' },
        { imagem: 'imagens/Futebol-para-Todos.png', alt: 'Crianças jogando futebol', badges: [{ classe: 'badge-esporte', texto: 'Esporte' }], titulo: 'Projeto "Futebol para Todos"', descricao: 'Aulas de futebol gratuitas, promovendo saúde e integração social.' },
        { imagem: 'imagens/horta-comunitaria.png', alt: 'Crianças em horta comunitária', badges: [{ classe: 'badge-meio-ambiente', texto: 'Meio Ambiente' }], titulo: 'Projeto "Horta Comunitária"', descricao: 'Ensinamos sobre sustentabilidade e cultivo de alimentos orgânicos.' }
    ];

    function criarCardProjetoHTML(projeto) {
        const badgesHTML = projeto.badges.map(badge => `<span class="badge ${badge.classe}">${badge.texto}</span>`).join('');
        return `
            <article class="card" style="grid-column: span 4;">
                <img src="${projeto.imagem}" alt="${projeto.alt}">
                <div class="card-content">
                    <div class="badge-container">${badgesHTML}</div>
                    <h2>${projeto.titulo}</h2>
                    <p>${projeto.descricao}</p>
                    <a href="#" class="btn">Saiba Mais</a>
                </div>
            </article>
        `;
    }

    function carregarProjetosComTemplate() {
        // Procura pelo grid DENTRO do #main-content atual
        const gridProjetos = document.querySelector('#main-content .grid-12');
        if (gridProjetos) {
             gridProjetos.innerHTML = '';
             dadosProjetos.forEach(projeto => {
                 gridProjetos.innerHTML += criarCardProjetoHTML(projeto);
             });
        } else {
            // Isso pode acontecer se tentarmos carregar projetos em outra página
            // console.warn("Grid de projetos não encontrado na página atual.");
        }
    }
    // --- FIM DOS TEMPLATES ---


    // --- INICIALIZAÇÃO ---
    // Verifica qual página carregou inicialmente e roda as funções necessárias
    const initialPage = window.location.pathname.split('/').pop() || 'index.html'; // Garante que a raiz seja 'index.html'

    if (initialPage === 'cadastro.html') {
        inicializarValidacaoFormulario();
    }
    if (initialPage === 'projetos.html') {
        carregarProjetosComTemplate();
    }
    // Para o caso da página inicial (index.html) também ter projetos (se aplicável)
    if (initialPage === 'index.html') {
       // Se a home também tivesse projetos, chamaria aqui.
       // No seu caso, a home não tem, então está ok.
    }


}); // Fim do DOMContentLoaded