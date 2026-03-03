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
  $("btnOpen").addEventListener("click", openSuite);
  $("code").addEventListener("keydown", (e) => {
    if(e.key === "Enter") openSuite();
  });
});
