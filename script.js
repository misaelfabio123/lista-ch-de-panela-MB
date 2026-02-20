import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* 🔥 COLE SEU firebaseConfig AQUI */
const firebaseConfig = {
  apiKey: "AIzaSyAu3bvy27uMS1qose7nm5os2AyqhUjMUao",
  authDomain: "cha-de-panela-misael-e-brenda.firebaseapp.com",
  projectId: "cha-de-panela-misael-e-brenda",
  storageBucket: "cha-de-panela-misael-e-brenda.firebasestorage.app",
  messagingSenderId: "561964961228",
  appId: "1:561964961228:web:868b6158d245d5be312169"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const presentes = [
  "Aparelho de jantar",
  "Assadeiras tam. variado",
  "Conjunto de panelas antiaderentes",
  "Panela de pressão",
  "Frigideiras antiaderentes",
  "Forma de bolo/pudim",
  "Conjunto de sobremesa (item adicionado da imagem)",
  "Jogo de copos",
  "Jogo de taças",
  "Jogo de talheres",
  "Faqueiro p/ cozinha",
  "Faqueiro p/ churrasco",
  "Kit utensílios silicone",
  "Escorredor p/ louça (inox)",
  "Escorredor p/ arroz",
  "Tábua de carne",
  "Ralador / abridor",
  "Espremedor",
  "Panos de prato",
  "Cafeteira (preto)",
  "Chaleira",
  "Bule",
  "Garrafa p/ água",
  "Garrafa térmica",
  "Jarra p/ suco com tampa",
  "Espremedor de suco (preto)",
  "Sanduicheira (preto ou inox)",
  "Liquidificador (preto ou inox)",
  "Batedeira (preto)",
  "Kit mantimentos hermético (tampa bambu)",
  "Porta tempero (vidro)",
  "Moedor sal e pimenta",
  "Potes variados",
  "Galheteiro",
  "Saladeira / fruteira",
  "Copo medidor",
  "Kit peneiras",
  "Lixeira p/ cozinha",
  "Lençol com elástico cama box",
  "Jogo de cama",
  "Fronhas",
  "Travesseiros",
  "Manta",
  "Cobertor",
  "Edredom",
  "Cobre leito",
  "Colcha",
  "Espelho",
  "Almofadas",
  "Manta grande para sofá",
  "Cortina com blecaute",
  "Tábua de passar roupa",
  "Ferro de passar",
  "Varal de chão",
  "Jogo de toalha de banho",
  "Toalha de rosto",
  "Jogo de tapete p/ banheiro",
  "Tapete banheiro antiderrapante",
  "Lixeira p/ banheiro",
  "Cesto para roupa suja",
  "Kit lavabo"
];

const lista = document.getElementById("lista");
const presentesRef = collection(db, "presentes");

/* 🔥 Atualização em tempo real */
onSnapshot(presentesRef, (snapshot) => {
  const escolhidos = {};
  snapshot.forEach(doc => {
    escolhidos[doc.id] = doc.data().nome;
  });
  render(escolhidos);
});

function render(escolhidos) {
  lista.innerHTML = "";

  presentes.forEach(presente => {
    const div = document.createElement("div");
    div.className = "item";

    if (escolhidos[presente]) {
      div.classList.add("selecionado");
      div.innerHTML = `
        <h3>${presente}</h3>
        <p>✔ Escolhido por ${escolhidos[presente]}</p>
        <button onclick="desmarcar('${presente}')">Desmarcar</button>
      `;
    } else {
      div.innerHTML = `
        <h3>${presente}</h3>
        <input type="text" placeholder="Seu nome">
        <button onclick="confirmar('${presente}')">Confirmar</button>
      `;
    }

    lista.appendChild(div);
  });
}

window.confirmar = async function(presente) {
  const input = event.target.previousElementSibling;
  const nome = input.value.trim();

  if (!nome) {
    alert("Digite seu nome");
    return;
  }

  await setDoc(doc(db, "presentes", presente), { nome: nome });
};

window.desmarcar = async function(presente) {
  const nomeDigitado = prompt("Digite o nome usado para confirmar:");

  const docRef = doc(db, "presentes", presente);

  await deleteDoc(docRef);
};