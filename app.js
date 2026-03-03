function $(id){ return document.getElementById(id); }

function openSuite(){
  const code = $("code").value.trim();
  const suite = window.SUITES?.[code];

  const box = $("suiteBox");
  if(!suite){
    box.classList.remove("hidden");
    box.innerHTML = `
      <div class="warn"><b>Código inválido.</b><br/>
      Confira se copiou certinho (maiúsculas, hífen etc.).</div>
    `;
    return;
  }
  const FRIGOBAR_ITENS = [
  { qt: 2, desc: "Água", preco: 5.00 },
  { qt: 2, desc: "Água c/ gás", preco: 5.00 },
  { qt: 2, desc: "Coca-Cola", preco: 8.00 },
  { qt: 1, desc: "Coca Zero", preco: 8.00 },
  { qt: 1, desc: "Guaraná", preco: 8.00 },
  { qt: 1, desc: "Schweppes", preco: 8.00 },
  { qt: 2, desc: "Cerveja Heineken", preco: 12.00 },
  { qt: 2, desc: "Achocolatado", preco: 6.00 },
  { qt: 2, desc: "Biscoito doce", preco: 5.00 },
  { qt: 1, desc: "Amendoim ou salgadinho", preco: 5.00 },
];

  function renderFrigobarTabela() {
  const el = document.getElementById("frigobar-tabela");
  if (!el) return;

  const rows = FRIGOBAR_ITENS.map(i => `
    <tr>
      <td>${String(i.qt).padStart(2, "0")}</td>
      <td>${i.desc}</td>
      <td>R$ ${i.preco.toFixed(2).replace(".", ",")}</td>
    </tr>
  `).join("");

  el.innerHTML = `
    <div class="table-wrap">
      <table class="price-table">
        <thead>
          <tr><th>QT</th><th>Descrição</th><th>Preço unit.</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p class="muted small">No check-in, verifique o inventário. No check-out, será cobrado conforme inventário. Em caso de divergência, avise a recepção imediatamente.</p>
    </div>
  `;
}

  box.classList.remove("hidden");
  box.innerHTML = `
    <h3>✅ Suíte ${suite.numero} • ${suite.nome}</h3>
    <p><b>Portão (eWeLink)</b></p>
    <div class="box">
      <p><b>Login:</b> ${suite.ewelinkLogin}</p>
      <p><b>Senha:</b> ${suite.ewelinkSenha}</p>
      <p class="muted small">Use exatamente como foi fornecido (minúsculo).</p>
    </div>
    <div class="warn">
      <b>Fechadura digital:</b> você receberá o código personalizado pelo WhatsApp
      após preencher o check-in online completo.
    </div>
  `;
}
document.addEventListener("DOMContentLoaded", () => {
  renderFrigobarTabela();
});
document.addEventListener("DOMContentLoaded", () => {
  $("btnOpen").addEventListener("click", openSuite);
  $("code").addEventListener("keydown", (e) => {
    if(e.key === "Enter") openSuite();
  });
});
