// Import da API goqr.me para gerar o QRCode
import { api } from "./api.js";

// Cria a URL do QRCode na API
const fetchQRcode = async () => {
  try {
    const res = await fetch(`${api}/?data=${getValue()}&size=1000x1000`);
    if (!res.ok) throw new Error("Erro na solicitação à API");
    return res.url;
  } catch (error) {
    console.error("Erro ao obter os dados da API:", error);
    throw error;
  }
};

// Captura valor a ser inserido no QRCode
const getValue = () => {
  const secret = document.querySelector("[data-input='secret']");
  return secret.value;
};

// Gera o QRCode na tela
const generateQR = (qrCodeUrl) => {
  // Remove o QRCode anterior, se existir
  const existingQRCode = document.querySelector("#qrcode");
  if (existingQRCode) {
    existingQRCode.remove();
  }

  // Cria e exibe o novo QRCode
  const img = document.createElement("img");
  img.id = "qrcode";
  img.alt = "QRCode";
  img.src = qrCodeUrl;

  const container = document.querySelector("#cont-view");
  container.appendChild(img);
};

// Botão de gerar QRCode
document
  .querySelector("[data-btn='generate']")
  .addEventListener("click", async () => {
    const value = getValue();

    // Verifica se o valor está vazio ou tem menos de 3 caracteres
    if (!value || value.length < 3) {
      alert("O valor inserido é inválido.");
      return;
    }

    removeSpinner();

    try {
      const qrCodeUrl = await fetchQRcode();
      generateQR(qrCodeUrl);
    } catch (error) {
      console.error("Erro ao obter os dados da API:", error);
    }
  });

// Botão de limpar
document.querySelector("[data-btn='clear']").addEventListener("click", () => {
  const secretInput = document.querySelector("[data-input='secret']");
  if (secretInput) {
    secretInput.value = "";
  }

  removeSpinner();
});

const createSpinner = () => {
  const cont_spinner = document.createElement("div");
  const spinner = document.createElement("div");
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  const div3 = document.createElement("div");
  const div4 = document.createElement("div");
  const div5 = document.createElement("div");
  const div6 = document.createElement("div");

  spinner.classList.add("spinner");
  cont_spinner.classList.add("cont-spinner");
  spinner.append(div1, div2, div3, div4, div5, div6);
  cont_spinner.append(spinner);

  document.querySelector("#cont-view").appendChild(cont_spinner);
};

const removeSpinner = () => {
  const spinner = document.querySelector(".cont-spinner");
  const qrcode = document.querySelector("#qrcode");

  if (qrcode) {
    createSpinner();
    qrcode.remove();
  } else if (spinner) {
    spinner.remove();
  }
};
