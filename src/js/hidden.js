// Cria o botão "Fechar todas as abas"
const closeAllButton = document.createElement("button");
closeAllButton.id = "btn-close-all";

const icon = document.createElement("i");
icon.classList.add("bx", "bxs-arrow-from-right"); // Classe do ícone de fechar
closeAllButton.appendChild(icon);

closeAllButton.addEventListener("click", () => {
  // Remove todos os botões de abas
  const allButtons = document.querySelectorAll(".tab-button");
  allButtons.forEach((button) => button.remove());

  // Esconde todas as abas
  const allDivs = [
    divPrefeituras,
    divCamaras,
    divHome,
    divPrevidencias,
    divContabil,
    divPatrimonio,
    divSaude,
    divPainel,
    divFerramentas,
    divTcm,
    divTest,
    divJson,
    divTcmFiscaliza,
    divVoip,
  ];
  allDivs.forEach((div) => div.classList.add("hidden"));

  // Reseta o estado do alerta
  alertShown = false;

  // Exibe a aba inicial
  showTab("home");
});

// Adiciona o botão "Fechar todas" ao corpo da página
document.body.appendChild(closeAllButton);

// Função para alternar o menu (abrir e fechar)
const toggle = document.getElementById("menu");
const menu = document.getElementById("tabs");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
  toggle.classList.toggle("active");
});

// Fechar o menu ao clicar no botão de fechar
const closeToggle = document.getElementById("menu-close");

closeToggle.addEventListener("click", () => {
  menu.classList.remove("active");
  toggle.classList.remove("active");
});

// Variáveis para as tabs
const tabPrefeituras = document.getElementById("tab-prefeituras");
const tabCamaras = document.getElementById("tab-camaras");
const tabOutros = document.getElementById("tab-outros");
const tabContabil = document.getElementById("tab-contabil");
const tabPatrimonio = document.getElementById("tab-patrimonio");
const tabSaude = document.getElementById("tab-saude");
const tabPainel = document.getElementById("tab-painel");
const tabFerramentas = document.getElementById("tab-ferramentas");
const tabTcm = document.getElementById("tab-tcm");
const tabTest = document.getElementById("tab-test");
const tabJson = document.getElementById("tab-json");
const tabTcmFiscaliza = document.getElementById("tab-tcmfiscaliza");
const tabVoip = document.getElementById("tab-voip");

const abaContainer = document.getElementById("aba-container");

// Variáveis para as divs
const divHome = document.getElementById("home");
const divPrefeituras = document.getElementById("h-prefeituras");
const divCamaras = document.getElementById("h-camaras");
const divPrevidencias = document.getElementById("h-previdencias");
const divContabil = document.getElementById("h-contabil");
const divPatrimonio = document.getElementById("h-patrimonio");
const divSaude = document.getElementById("h-saude");
const divPainel = document.getElementById("h-painel");
const divFerramentas = document.getElementById("h-ferramentas");
const divTcm = document.getElementById("h-tcm");
const divTest = document.getElementById("h-test");
const divJson = document.getElementById("h-json");
const divTcmFiscaliza = document.getElementById("h-tcmfiscaliza");
const divVoip = document.getElementById("h-voip");

// Define o limite máximo de abas abertas
const MAX_TABS = 7;
let alertShown = false; // Controle para exibir o alert apenas uma vez

// Função para adicionar botão de aba
function addTabButton(tabName) {
  // Verifica se o botão já existe
  let button = document.getElementById(`btn-${tabName}`);
  if (!button) {
    // Verifica o número de abas abertas
    const currentTabs = document.querySelectorAll(".tab-button").length;
    if (currentTabs >= MAX_TABS) {
      // Mostra o alert apenas uma vez
      if (!alertShown) {
        alert(
          "Você atingiu o limite máximo de abas abertas! O conteúdo será mostrado mais não ficará aberto, feche uma guia e abra novamente."
        );
        alertShown = true; // Define que o alert já foi mostrado
      }
      return;
    }

    // Cria o botão principal
    button = document.createElement("div");
    button.id = `btn-${tabName}`;
    button.className = "tab-button"; // Classe para estilização
    button.textContent =
      tabName.charAt(0).toUpperCase() + tabName.slice(1).toLowerCase();

    // Cria o botão de fechar
    const closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.textContent = "×";
    closeButton.title = "Fechar";

    // Evento para fechar aba
    closeButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      button.remove();
      const relatedDiv = document.getElementById(`h-${tabName.toLowerCase()}`);
      if (relatedDiv) relatedDiv.classList.add("hidden");

      // Reseta o alertShown caso o número de abas fique abaixo do limite
      const remainingTabs = document.querySelectorAll(".tab-button").length;
      if (remainingTabs < MAX_TABS) {
        alertShown = false;
      }

      // Verifica se ainda há abas abertas
      if (remainingTabs === 0) {
        showTab("home");
        toggleCloseAllButtonVisibility(); // Atualiza a visibilidade do botão "Fechar Todas"
      }
    });

    // Adiciona o botão de fechar ao botão principal
    button.appendChild(closeButton);

    // Alterna para a aba correspondente ao clicar no botão
    button.addEventListener("click", () => {
      showTab(`h-${tabName.toLowerCase()}`);
    });

    // Adiciona o botão ao contêiner
    abaContainer.appendChild(button);
  }

  // Define o botão como ativo
  setActiveButton(button);
  toggleCloseAllButtonVisibility(); // Atualiza a visibilidade do botão "Fechar Todas"
}

// Alterna a exibição das abas
function showTab(tab) {
  // Esconde todas as divs
  const allDivs = [
    divPrefeituras,
    divCamaras,
    divPrevidencias,
    divContabil,
    divPatrimonio,
    divSaude,
    divPainel,
    divFerramentas,
    divTcm,
    divTest,
    divJson,
    divTcmFiscaliza,
    divVoip,
    divHome,
  ];

  allDivs.forEach((div) => div.classList.add("hidden"));
  // Mostra a aba correspondente
  if (tab === "home") {
    divHome.classList.remove("hidden");
  } else {
    // Exibe a aba correspondente ao tab
    const divToShow = document.getElementById(tab);
    if (divToShow) {
      divToShow.classList.remove("hidden");
      addTabButton(tab.replace("h-", "").toLowerCase());
    }
  }
}

// Marca o botão como ativo
function setActiveButton(button) {
  const buttons = document.querySelectorAll(".tab-button");
  buttons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
}

const tabSelect = document.getElementById("tab-select");
const tabAcess = document.getElementById("tab-acess-speed");
const tabDiv = document.getElementById("acess-selects");

tabAcess.addEventListener("click", () => {
  tabDiv.classList.add("active");
  tabSelect.style.display = "block"; // Mostra o select
  tabSelect.focus(); // Foca no elemento para permitir detectar a perda de foco
});

// Esconde o select ao clicar fora dele ou ao perder o foco
tabSelect.addEventListener("blur", () => {
  tabSelect.style.display = "none";
  tabDiv.classList.remove("active");
  tabSelect.value = tabSelect.options[0].value;
  // Esconde o select
});

tabSelect.addEventListener("change", (event) => {
  const selectedTab = event.target.value; // Obtém o valor da aba selecionada
  showTab(selectedTab); // Chama a função para exibir a aba correspondente
});
// Event listeners para os botões de navegação
tabPrefeituras.addEventListener("click", () => showTab("h-prefeituras"));
tabCamaras.addEventListener("click", () => showTab("h-camaras"));
tabOutros.addEventListener("click", () => showTab("h-previdencias"));
tabContabil.addEventListener("click", () => showTab("h-contabil"));
tabPatrimonio.addEventListener("click", () => showTab("h-patrimonio"));
tabSaude.addEventListener("click", () => showTab("h-saude"));
tabPainel.addEventListener("click", () => showTab("h-painel"));
tabFerramentas.addEventListener("click", () => showTab("h-ferramentas"));
tabTcm.addEventListener("click", () => showTab("h-tcm"));
tabTest.addEventListener("click", () => showTab("h-test"));
tabJson.addEventListener("click", () => showTab("h-json"));
tabTcmFiscaliza.addEventListener("click", () => showTab("h-tcmfiscaliza"));
tabVoip.addEventListener("click", () => showTab("h-voip"));

showTab("home");
