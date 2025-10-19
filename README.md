# Projeto ONG Vida Nova

## 1. Visão Geral do Projeto

Este projeto é um website institucional front-end para a "ONG Vida Nova", uma organização fictícia focada em educação, cultura e esporte para jovens. O site foi desenvolvido como atividade acadêmica, consolidando conhecimentos em HTML5, CSS3 e JavaScript moderno, com foco em responsividade, acessibilidade e boas práticas de desenvolvimento.

O site foi construído usando uma arquitetura **SPA (Single Page Application)**, onde a navegação entre as páginas (Início, Projetos, Participe) é feita dinamicamente com JavaScript, carregando apenas o conteúdo principal sem recarregar a página inteira, proporcionando uma experiência de usuário mais fluida.


## 2. Funcionalidades Implementadas

* **Design Responsivo:** O layout se adapta a desktops, tablets e celulares (mobile-first).
* **SPA (Single Page Application):** Navegação assíncrona usando `fetch()` API para carregar conteúdo das páginas dinamicamente.
* **Templates JS:** A página de "Projetos" é renderizada via JavaScript a partir de um objeto de dados, facilitando a manutenção.
* **Formulário de Cadastro Interativo:**
    * Validação de campos em tempo real (ao sair do campo) e no envio.
    * Máscaras automáticas para CPF, Telefone e CEP.
    * Feedback visual de erros claro para o usuário.
* **Acessibilidade (WCAG 2.1 AA):**
    * **Modo Escuro / Alto Contraste:** Um seletor de tema que altera a paleta de cores do site e salva a preferência do usuário no `localStorage`.
    * **Navegação por Teclado:** Todos os elementos interativos (links, botões, campos) são totalmente acessíveis via tecla "Tab".
    * **Semântica HTML:** Uso correto de tags como `<main>`, `<nav>`, `<header>`, `<footer>` e `<fieldset>` para leitores de tela.
    * **Contraste de Cores:** Paleta de cores cuidadosamente escolhida para atender aos requisitos mínimos de contraste.

## 3. Tecnologias Utilizadas

* **HTML5:** Estruturação semântica do conteúdo.
* **CSS3:**
    * **CSS Grid** e **Flexbox** para layouts complexos e responsivos.
    * **Variáveis CSS** para fácil manutenção e implementação do modo escuro.
    * Arquitetura **Modular** (arquivos separados para `_layout`, `_components`, `_variables`, etc.).
* **JavaScript (ES6+):**
    * Manipulação do DOM.
    * `fetch()` API para requisições assíncronas (SPA).
    * `localStorage` para persistência de dados (tema).
    * Validação de formulários com Regex.

## 4. Práticas de Desenvolvimento e Deploy

* **GitFlow:** Utilização de branches `main`, `develop` e `feature/` para organizar o desenvolvimento.
* **Commits Semânticos:** Mensagens de commit padronizadas (ex: `feat:`, `fix:`, `style:`) para um histórico claro.
* **Otimização de Produção:**
    * Minificação de arquivos CSS e JS (instruções no próximo item).
    * Compressão de imagens (ex: via TinyPNG).

## 5. Como Executar Localmente

1.  Clone este repositório:
    ```bash
    git clone [https://github.com/guilhermeyoshio/PROJETO_ONG_JAVA.git]
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd [PROJETO_ONG_JAVA]
    ```
3.  Abra o arquivo `index.html` no seu navegador de preferência.

## 6. Otimização (Passo a passo para entrega)

Para gerar os arquivos de produção minificados (como exigido na atividade):

1.  **CSS:** Junte o conteúdo de `_variables.css`, `_layout.css`, `_components.css`, `_accessibility.css` e `_responsive.css` (nessa ordem) em um único local. Use um minificador online (como cssminifier.com) para comprimir esse código e salve o resultado em `css/style.min.css`.
2.  **JS:** Use um minificador online (como javascript-minifier.com) para comprimir o `js/main.js` e salve o resultado em `js/main.min.js`.
3.  **HTML:** Em todos os arquivos `.html`, troque as referências para os arquivos minificados:
    * `<link rel="stylesheet" href="css/style.css">` -> `<link rel="stylesheet" href="css/style.min.css">`
    * `<script src="js/main.js"></script>` -> `<script src="js/main.min.js"></script>`

---
*Autor: [Guilherme Yoshio Takeuti Takaki]*
*Curso: Análise e Desenvolvimento de Sistemas*