// ===============================
// Vila Itália - Mini Site (limpo)
// ===============================

// Senha simples para mostrar o login do portão (proteção básica).
const SENHA_PORTAO = "0000";

// Tabela do frigobar
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

// Códigos de acesso por suíte (você manda por WhatsApp)
// OBS: coloquei os exemplos que você já tinha mostrado.
// Você pode trocar "ABCD" por códigos reais depois.
const SUITES = {
  "VI-101-ABCD": { numero: "101", nome: "AMALFI", ewelinkLogin: "laamalfi101@gmail.com", ewelinkSenha: "vilaitalia123" },
  "VI-102-ABCD": { numero: "102", nome: "VERONA", ewelinkLogin: "laverona102@gmail.com", ewelinkSenha: "vilaitalia123" },
  "VI-103-ABCD": { numero: "103", nome: "LA PELOSA", ewelinkLogin: "lapelosa103@gmail.com", ewelinkSenha: "vilaitalia123" },
  "VI-104-ABCD": { numero: "104", nome: "FIRENZE", ewelinkLogin: "104firenze@gmail.com", ewelinkSenha: "vilaitalia123" },
  "VI-105-ABCD": { numero: "105", nome: "LA MADDALENA", ewelinkLogin: "lamaddalena105@gmail.com", ewelinkSenha: "vilaitalia123" },
  "VI-106-ABCD": { numero: "106", nome: "TAORMINA", ewelinkLogin: "lataormina106@gmail.com", ewelinkSenha: "vilaitalia123" },
  "VI-107-ABCD": { numero: "107", nome: "NAPOLI", ewelinkLogin: "107lanapoli@gmail.com", ewelinkSenha: "vilaitalia123" },
  "VI-108-ABCD": { numero: "108", nome: "MILANO", ewelinkLogin: "108milano108@gmail.com", ewelinkSenha: "vilaitalia123" },

  "VI-201-ABCD": { numero: "201", nome: "VENEZIA", ewelinkLogin: "lavenezia201@gmail.com", ewelinkSenha: "vilaitalia123" },
  "VI-202-ABCD": { numero: "202", nome: "ISOLA DE CAPRI", ewelinkLogin: "isoladecapri202@gmail.com", ewelinkSenha: "vilaitalia123" },
  "VI-203-ABCD": { numero: "203", nome: "PISA", ewelinkLogin: "lapisa203@gmail.com", ewelinkSenha: "vilaitalia123" },
  "VI-204-ABCD": { numero: "204", nome: "PORTO CERVO", ewelinkLogin: "portocervo204@gmail.com", ewelinkSenha: "vilaitalia123" },
  "VI-205-ABCD": { numero: "205", nome: "GARGANO", ewelinkLogin: "lagargano205@gmail.com", ewelinkSenha: "vilaitalia123" },
  "VI-206-ABCD": { numero: "206", nome: "OSTUNI", ewelinkLogin: "laostuni206@gmail.com", ewelinkSenha: "vilaitalia123" },
  "VI-207-ABCD": { numero: "207", nome: "ROMA", ewelinkLogin: "207laroma@gmail.com", ewelinkSenha: "vilaitalia123" },
  "VI-208-ABCD": { numero: "208", nome: "GENOVA", ewelinkLogin: "lagenova208@gmail.com", ewelinkSenha: "vilaitalia123" },
};

// Guarda a suíte atual após abrir o código
let SUITE_ATUAL = null;

function fmtBRL(n) {
  return "R$ " + Number(n).toFixed(2).replace(".", ",");
}

function renderFrigobarTabela() {
  const el = document.getElementById("frigobar-tabela");
  if (!el) return;

  const rows = FRIGOBAR_ITENS.map(i => `
    <tr>
      <td>${String(i.qt).padStart(2, "0")}</td>
      <td>${i.desc}</td>
      <td>${fmtBRL(i.preco)}</td>
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

      <p class="muted small" style="margin-top:10px;">
        • No check-in, verifique o <b>inventário</b>.<br/>
        • No check-out, será cobrado conforme inventário.<br/>
        • Em caso de divergência, avise a recepção <b>imediatamente</b>.
      </p>
    </div>
  `;
}

function normalizeCode(s) {
  return (s || "").trim().toUpperCase();
}

function openSuite() {
  const input = document.getElementById("suite-code");
  const box = document.getElementById("suite-result");
  if (!input || !box) return;

  const code = normalizeCode(input.value);
  const data = SUITES[code];

  if (!code) {
    alert("Digite o código da sua suíte.");
    return;
  }

  if (!data) {
    box.classList.remove("hidden");
    box.innerHTML = `
      <div class="notice">
        Código não encontrado. Verifique se digitou exatamente como recebeu no WhatsApp.
        <br/><br/>
        Exemplo: <b>VI-101-ABCD</b>
      </div>
    `;
    SUITE_ATUAL = null;
    return;
  }

  SUITE_ATUAL = data;

  box.classList.remove("hidden");
  box.innerHTML = `
    <div class="notice light">
      <div><b>Suíte:</b> ${data.numero} • ${data.nome}</div>
      <div style="margin-top:6px;"><b>Portão (eWeLink):</b> o login/senha podem ser vistos em “Portão (App)” com proteção.</div>
      <div style="margin-top:6px;" class="muted small">
        *Use exatamente o login e senha fornecidos (tudo minúsculo).*
      </div>
    </div>
  `;

  // Dá uma rolada suave pra pessoa ver
  box.scrollIntoView({ behavior: "smooth", block: "start" });
}

function pedirSenhaPortao() {
  const s = prompt("Digite a senha para ver o login/senha do portão:");
  if (s === null) return false;
  if (s.trim() !== SENHA_PORTAO) {
    alert("Senha incorreta.");
    return false;
  }
  return true;
}

function mostrarLoginPortao() {
  const box = document.getElementById("portao-login-box");
  if (!box) return;

  if (!SUITE_ATUAL) {
    alert("Abra primeiro a sua suíte em “Minha Suíte”.");
    return;
  }

  if (!pedirSenhaPortao()) return;

  box.classList.remove("hidden");
  box.innerHTML = `
    <div class="notice">
      <div><b>LOGIN:</b> ${SUITE_ATUAL.ewelinkLogin || "-"}</div>
      <div><b>SENHA:</b> ${SUITE_ATUAL.ewelinkSenha || "vilaitalia123"}</div>
      <div class="muted small" style="margin-top:6px;">
        Use exatamente o login e senha fornecidos (tudo minúsculo).
      </div>
    </div>
  `;

  box.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFrigobarTabela();

  const btnOpen = document.getElementById("btn-suite-open");
  const input = document.getElementById("suite-code");
  if (btnOpen) btnOpen.addEventListener("click", openSuite);
  if (input) input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") openSuite();
  });

  const btnPortao = document.getElementById("btn-portao-login");
  if (btnPortao) btnPortao.addEventListener("click", mostrarLoginPortao);
});
