function exibirEnderecosSalvos() {
    const tabela = document.querySelector('#table tbody');
    tabela.innerHTML = '';
    let enderecosSalvos = JSON.parse(localStorage.getItem('enderecos')) || [];

    enderecosSalvos.forEach((endereco, index) => {
        let tr = document.createElement('tr');
        tr.classList.add('border-collapse', 'border-text');
        ['logradouro', 'bairro', 'localidade', 'uf', 'cep', 'complemento'].forEach(chave => {
            let td = document.createElement('td');
            td.classList.add('px-5', 'py-1.5', 'border-b-2');
            td.textContent = endereco[chave];
            tr.appendChild(td);
        });
        let button = document.createElement('button');
        button.classList.add('bg-button', 'px-2', 'py-1', 'rounded-md', 'hover:bg-text', 'hover:text-button', 'transition-colors', 'duration-300', 'ease-in-out', 'ml-2')
        button.textContent = 'Apagar';

        button.addEventListener('click', () => {
            enderecosSalvos.splice(index, 1);
            localStorage.setItem('enderecos', JSON.stringify(enderecosSalvos));
            tr.remove();
            hiddenTable();
        });
        
        let tdButton = document.createElement('td');
        tdButton.appendChild(button);

        tr.appendChild(tdButton);

        tabela.appendChild(tr);
        
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const cepInput = document.getElementById('input-cep');
    const submitButton = document.getElementById('submit');
    const guardarCep = document.getElementById('guardar');
    const dialog = document.querySelector('dialog');
    const novaBusca = document.getElementById('novo');
    let backdrop = document.getElementById('backdrop');
    const complementoInput = document.getElementById('complemento');

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
                backdrop.classList.remove('hidden');
                guardarCep.dataset.endereco = JSON.stringify(data);
            });
    });

    guardarCep.addEventListener('click', function (e) {
        e.preventDefault();
        const endereco = JSON.parse(guardarCep.dataset.endereco);
        endereco.complemento = complementoInput.value;
        let enderecosSalvos = JSON.parse(localStorage.getItem('enderecos')) || [];
        enderecosSalvos.push(endereco);
        localStorage.setItem('enderecos', JSON.stringify(enderecosSalvos));
        exibirEnderecosSalvos();
        alert('Endereço salvo com sucesso!');
        dialog.close();
        backdrop.classList.add('hidden');
        cepInput.value = '';
        complementoInput.value = '';
        hiddenTable();
    });

    novaBusca.addEventListener('click', () => {
        dialog.close();
        backdrop.classList.add('hidden');
        cepInput.value = '';
        complementoInput.value = '';
    });

    exibirEnderecosSalvos();
    hiddenTable();

});

function hiddenTable() {
    let enderecosSalvos = JSON.parse(localStorage.getItem('enderecos')) || [];
    if (enderecosSalvos.length === 0) {
        document.getElementById('tr-base').classList.add('hidden');
    } else {
        document.getElementById('tr-base').classList.remove('hidden');
    }
}

