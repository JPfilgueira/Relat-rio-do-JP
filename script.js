function gerar(pdf = false, print = false) {
    // Preenche informações básicas
    document.getElementById('doc-cliente').textContent = 
        document.getElementById('cliente').value || "Não informado";
    
    const dataInput = document.getElementById('data').value;
    document.getElementById('doc-data').textContent = 
        dataInput ? new Date(dataInput).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR');
    
    // Atualiza a data atual
    const today = new Date();
    document.getElementById('current-date').textContent = 
        today.toLocaleDateString('pt-BR');
    
    // Preenche itens da compra
    const itensContainer = document.getElementById('doc-itens');
    itensContainer.innerHTML = '';
    
    const rows = document.querySelectorAll('.item-row');
    let total = 0;
    
    rows.forEach((row, index) => {
        const desc = row.querySelector('.item-desc').value || `Item ${index + 1}`;
        const qtd = parseFloat(row.querySelector('.item-qtd').value) || 0;
        const valor = parseFloat(row.querySelector('.item-valor').value) || 0;
        const itemTotal = qtd * valor;
        
        total += itemTotal;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${desc}</td>
            <td>${qtd}</td>
            <td>R$ ${valor.toFixed(2).replace('.', ',')}</td>
            <td>R$ ${itemTotal.toFixed(2).replace('.', ',')}</td>
        `;
        itensContainer.appendChild(tr);
    });
    
    // Atualiza total
    document.getElementById('doc-total').textContent = 
        `R$ ${total.toFixed(2).replace('.', ',')}`;
    
    // Preenche observações
    document.getElementById('doc-observacoes').textContent = 
        document.getElementById('observacoes').value || "Nenhuma observação informada.";
    
    // Preenche assinaturas
    document.getElementById('doc-solicitante').textContent = 
        document.getElementById('solicitante').value || "Não informado";
    document.getElementById('doc-aprovador').textContent = 
        document.getElementById('aprovador').value || "Não informado";
    
    // Mostra o relatório
    const relatorio = document.getElementById('relatorio');
    relatorio.style.visibility = 'visible';
    relatorio.style.position = 'static';
  
    // Gera PDF ou imprime conforme o botão clicado
    if (pdf) {
        html2pdf().from(relatorio).save('Documento_JPCompany.pdf');
    } else if (print) {
        window.print();
    }
}

function adicionarItem() {
    const container = document.getElementById('itens-container');
    const newRow = document.createElement('div');
    newRow.className = 'item-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Descrição" class="item-desc">
        <input type="number" placeholder="Qtd" class="item-qtd" min="1">
        <input type="number" placeholder="Valor Unit." class="item-valor" step="0.01" min="0">
        <button class="btn-remove" onclick="removerItem(this)">×</button>
    `;
    container.appendChild(newRow);
}

function removerItem(button) {
    const row = button.closest('.item-row');
    row.remove();
}