function exibirEnderecosSalvos() {
    const tabela = document.getElementById('table');
    let enderecosSalvos = JSON.parse(localStorage.getItem('enderecos')) || [];
    enderecosSalvos.forEach(endereco => {
        let tr = document.createElement('tr');
        tr.classList.add('border-b-2', 'border-collapse', 'border-text');
        ['logradouro', 'bairro', 'localidade', 'uf', 'cep'].forEach(chave => {
            let td = document.createElement('td');
            td.classList.add('px-5', 'py-1.5');
            td.textContent = endereco[chave];
            tr.appendChild(td);
        });
        tabela.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const cepInput = document.getElementById('input-cep');
    const submitButton = document.getElementById('submit');
    const guardarCep = document.getElementById('guardar');
    const dialog = document.querySelector('dialog');
    let backdrop = document.getElementById('backdrop');

    cepInput.addEventListener('input', function (e) {
        let value = e.target.value;
        value = value.replace(/\D/g, ''); 
        if (value.length > 5) {
            value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
        }
        e.target.value = value;
    });

    submitButton.addEventListener('click', function (e) {
        e.preventDefault();
        const cep = cepInput.value;
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById('logradouro').textContent = data.logradouro;
                document.getElementById('bairro').textContent = data.bairro;
                document.getElementById('localidade').textContent = data.localidade;
                document.getElementById('uf').textContent = data.uf;
                document.getElementById('cep').textContent = data.cep;
                dialog.showModal();
                backdrop.style.display = 'block';
                guardarCep.dataset.endereco = JSON.stringify(data);
            });
    });

    guardarCep.addEventListener('click', function (e) {
        e.preventDefault();
        const endereco = JSON.parse(guardarCep.dataset.endereco);
        let enderecosSalvos = JSON.parse(localStorage.getItem('enderecos')) || [];
        enderecosSalvos.push(endereco);
        localStorage.setItem('enderecos', JSON.stringify(enderecosSalvos));
        alert('Endereço salvo com sucesso!');
        dialog.close();
    });

    exibirEnderecosSalvos();
});