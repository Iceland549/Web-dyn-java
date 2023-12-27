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


// Boîte de dialog modale 1
const dialog = document.querySelector("#firstModal");
const showButton = document.querySelector("#modifierLink");
const closeOne = document.querySelector(".closeOne");

// Le bouton "Afficher la fenêtre" ouvre le dialogue
showButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.showModal();
    dialog.style.display = 'flex';
  });

// Le bouton "Fermer" ferme le dialogue
closeOne.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
    dialog.style.display = 'none';

});

// Flèche retour et modale 2
const backButton = document.querySelector(".fa-arrow-left");
const dialog2 = document.querySelector("#secondModal");
const addButton = document.querySelector("#addPhotoBtn");
const closeTwo = document.querySelector(".closeTwo");

// Ajoutez un écouteur d'événements au clic sur le bouton backButton
backButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialog2.close();
    dialog2.style.display = 'none';
    dialog.showModal();
});


// Ajoutez un écouteur d'événements au clic sur le bouton addButton
addButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
    dialog2.style.display = 'flex';
    dialog2.showModal();
});

// Ajoutez un écouteur d'événements au clic sur le bouton closeTwo
closeTwo.addEventListener("click", (event) => {
    event.preventDefault();
    dialog2.close();
    dialog2.style.display = 'none';
    dialog.showModal();
});

// Ajouter une photo dans modale 2
document.querySelector('.photo-upload').addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file.size <= 4000000) { 
            const reader = new FileReader();
            reader.onload = function(e) {
                document.querySelector('.photo-container').innerHTML = `<img src="${e.target.result}" alt="Photo">`;
                document.querySelector('.photo-upload').style.display = 'none';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Le fichier est trop grand !');
        }
    };
    input.click();
});

// Créer un élément select pour les catégories
const select = document.querySelector('.category-secondModal_select');

// Ajouter les options de catégorie
['Objets', 'Appartements', 'Hôtels et restaurants', 'Bar et restaurants'].forEach(function(categorie) {
    const option = document.createElement('option');
    option.value = categorie;
    option.text = categorie;
    select.appendChild(option);
});



