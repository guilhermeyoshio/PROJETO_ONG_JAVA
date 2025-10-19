// ARQUIVO: js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // --- VALIDAÇÃO DO FORMULÁRIO DE CADASTRO ---
    // Focado em verificar campos vazios e formato básico

    const formCadastro = document.querySelector('form'); // Encontra o form na página de cadastro
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    const dataNascimentoInput = document.getElementById('nascimento'); // Adicionado
    const enderecoInput = document.getElementById('endereco'); // Adicionado
    const cidadeInput = document.getElementById('cidade'); // Adicionado
    const estadoInput = document.getElementById('estado'); // Adicionado

    // Função genérica para mostrar erro
    function mostrarErro(inputElement, message) {
        if (!inputElement) return; // Segurança
        const errorSpan = document.getElementById(`${inputElement.id}-error`);
        if (errorSpan) {
            errorSpan.textContent = message;
        }
        inputElement.classList.add('error'); // Adiciona classe CSS de erro
    }

    // Função genérica para limpar erro
    function limparErro(inputElement) {
         if (!inputElement) return; // Segurança
        const errorSpan = document.getElementById(`${inputElement.id}-error`);
        if (errorSpan) {
            errorSpan.textContent = '';
        }
        inputElement.classList.remove('error'); // Remove classe CSS de erro
    }

    // Função para validar email (formato básico)
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Função para validar se o campo está preenchido
    function validarCampoObrigatorio(inputElement) {
        if (!inputElement) return true; // Se não existe, não valida
        if (inputElement.value.trim() === '') {
            mostrarErro(inputElement, 'Este campo é obrigatório.');
            return false;
        }
        // Se chegou aqui e não tem erro específico de formato, limpa erro genérico
        if(!inputElement.classList.contains('error')) { // Só limpa se não houver outro erro
             limparErro(inputElement);
        }
        return true;
    }

    // Validação específica para Email (Obrigatório + Formato)
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

     // Função para validar formato com Regex (usado para CPF, Tel, CEP)
     function validarFormato(inputElement, regex, mensagemErroFormato) {
        if (!inputElement) return true;
         if (!validarCampoObrigatorio(inputElement)) return false;

         // Remove a máscara antes de validar o formato
         let valorSemMascara = inputElement.value;
         if(inputElement.id === 'cpf') valorSemMascara = valorSemMascara.replace(/\D/g, '');
         if(inputElement.id === 'telefone') valorSemMascara = valorSemMascara.replace(/\D/g, '');
         if(inputElement.id === 'cep') valorSemMascara = valorSemMascara.replace(/\D/g, '');


         if (!regex.test(inputElement.value)) { // Testa com a máscara ainda
             mostrarErro(inputElement, mensagemErroFormato);
             return false;
         }

        // Verificação extra para CPF (11 dígitos) e CEP (8 dígitos) sem máscara
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

     // Regex para validação
     const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
     const telefoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
     const cepRegex = /^\d{5}-\d{3}$/;


    // --- Validação ao enviar o formulário ---
    if (formCadastro && window.location.pathname.includes('cadastro.html')) { // Garante que só rode na página de cadastro
        formCadastro.addEventListener('submit', (event) => {
            event.preventDefault(); // SEMPRE previne o envio para validar primeiro

            let formValido = true;

            // Valida TODOS os campos obrigatórios
            formValido = validarCampoObrigatorio(nomeInput) && formValido;
            formValido = validarCampoObrigatorio(dataNascimentoInput) && formValido;
            formValido = validarCampoObrigatorio(enderecoInput) && formValido;
            formValido = validarCampoObrigatorio(cidadeInput) && formValido;
            formValido = validarCampoObrigatorio(estadoInput) && formValido;

            // Valida campos com formato específico
            formValido = validarCampoEmail(emailInput) && formValido;
            formValido = validarFormato(cpfInput, cpfRegex, 'Formato de CPF inválido (use xxx.xxx.xxx-xx)') && formValido;
            formValido = validarFormato(telefoneInput, telefoneRegex, 'Formato de telefone inválido (use (xx) xxxxx-xxxx)') && formValido;
            formValido = validarFormato(cepInput, cepRegex, 'Formato de CEP inválido (use xxxxx-xxx)') && formValido;


            // Se todos os campos estiverem válidos...
            if (formValido) {
                alert('Cadastro enviado com sucesso! (Simulação)');
                // formCadastro.submit(); // Descomente se quiser permitir o envio real
            } else {
                alert('Por favor, corrija os erros destacados no formulário.');
            }
        });

         // --- Máscaras e Validação Dinâmica (Enquanto digita/sai do campo) ---
         const inputsParaValidar = [
             nomeInput, emailInput, cpfInput, telefoneInput, dataNascimentoInput,
             cepInput, enderecoInput, cidadeInput, estadoInput
         ];

         inputsParaValidar.forEach(input => {
             if (input) {
                 input.addEventListener('input', () => { // Aplica máscara enquanto digita
                     if (input === cpfInput) {
                         let value = input.value.replace(/\D/g, '');
                         value = value.replace(/(\d{3})(\d)/, '$1.$2');
                         value = value.replace(/(\d{3})(\d)/, '$1.$2');
                         value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                         input.value = value.slice(0, 14); // Limita tamanho
                     }
                     if (input === telefoneInput) {
                         let value = input.value.replace(/\D/g, '');
                         value = value.replace(/^(\d{2})(\d)/, '($1) $2');
                         value = value.replace(/(\d{5})(\d)/, '$1-$2');
                         input.value = value.slice(0, 15); // Limita tamanho
                     }
                      if (input === cepInput) {
                         let value = input.value.replace(/\D/g, '');
                         value = value.replace(/(\d{5})(\d)/, '$1-$2');
                         input.value = value.slice(0, 9); // Limita tamanho
                     }
                 });

                 input.addEventListener('blur', () => { // Valida quando sai do campo
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
    }

    // --- FIM DA VALIDAÇÃO DO FORMULÁRIO ---

    // (Código da SPA e Templates virá aqui depois)

}); // Fim do DOMContentLoaded