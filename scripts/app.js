document.addEventListener('DOMContentLoaded', function () {
    const cepInput = document.getElementById('input-cep');
    const submitButton = document.getElementById('submit');
    const guardarCep = document.getElementById('guardar');
    const novaBusca = document.getElementById('novo');
    const dialog = document.querySelector('dialog');
    let backdrop = document.getElementById('backdrop');

    dialog.close();

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
            });
    });
});