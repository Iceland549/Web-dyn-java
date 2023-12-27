// modale.js
import { fetchWorks } from "./api.js";

// Créez une carte de travail pour chaque image
function createWorkCard(work) {
    const article = document.createElement("article");
    article.classList.add("work-card");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.style.width = "78px";
    img.style.height = "104px";
    article.appendChild(img);

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-trash");
    trashIcon.addEventListener("click", () => {
        // Supprimez l'œuvre du DOM
        article.remove();

    });
    article.appendChild(trashIcon);

    return article;
}

// Affichez les images de la galerie en miniature dans la modale
async function displayGalleryInModal() {
    const works = await fetchWorks();
    const modalContent = document.querySelector(".modalGallery");

    works.forEach((work) => {
      const article = createWorkCard(work);
      modalContent.appendChild(article);
    });
}
displayGalleryInModal();


// Boîte de dialog modale
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#modifierLink");
const closeButton = document.querySelector(".close");

// Le bouton "Afficher la fenêtre" ouvre le dialogue
showButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.showModal();
  });

// Le bouton "Fermer" ferme le dialogue
closeButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
  });

// Sélectionnez l'élément i qui a la classe "fa-arrow-left" et stockez-le dans une variable, par exemple `backButton`.
const backButton = document.querySelector(".fa-arrow-left");

// Ajoutez un écouteur d'événements au clic sur le bouton backButton, qui va cacher la deuxième modale et afficher la première modale. Vous pouvez utiliser les méthodes `close` et `showModal` sur les éléments dialog pour cela.
backButton.addEventListener("click", (event) => {
    event.preventDefault();
    // Cachez la deuxième modale
    dialog2.close();
    // Affichez la première modale
    dialog.showModal();
});

// Sélectionnez l'élément dialog qui a l'id "secondModal"
const dialog2 = document.querySelector("#secondModal");

// Sélectionnez le bouton qui a l'id "addPhotoBtn"
const addButton = document.querySelector("#addPhotoBtn");

// Ajoutez un écouteur d'événements au clic sur le bouton addButton
addButton.addEventListener("click", (event) => {
    event.preventDefault();
    // Cachez la première modale
    dialog.close();
    // Affichez la deuxième modale
    dialog2.showModal();
});

// Sélectionnez le bouton qui a la classe "close" dans la deuxième modale
const closeButton2 = document.querySelector("#secondModal .close");

// Ajoutez un écouteur d'événements au clic sur le bouton closeButton2
closeButton2.addEventListener("click", (event) => {
    event.preventDefault();
    // Fermez la deuxième modale
    dialog2.close();
    // Affichez la première modale
    dialog.showModal();
});

