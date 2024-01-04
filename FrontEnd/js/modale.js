// modale.js
import { fetchWorks, deleteWork, fetchCategories, addPhoto } from "./api.js";
import { displayGallery } from "./home.js";

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
  trashIcon.classList.add("fa", "fa-solid", "fa-trash-can");
  trashIcon.addEventListener("click", async () => {
    // Supprimez l'œuvre du DOM
    try {
      const deleteWorkId = await deleteWork(work.id);
      const workToDelete = document.querySelector(`#work-${deleteWorkId}`);
      console.log(workToDelete);
      workToDelete.remove();
      article.remove();
    } catch (error) {
      alert(error);
    }
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
  dialog.style.display = "flex";
});

// Le bouton "Fermer" ferme le dialogue
closeOne.addEventListener("click", (event) => {
  event.preventDefault();
  dialog.close();
  dialog.style.display = "none";
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
  dialog2.style.display = "none";
  dialog.showModal();
});

// Ajoutez un écouteur d'événements au clic sur le bouton addButton
addButton.addEventListener("click", (event) => {
  event.preventDefault();
  dialog.close();
  dialog2.style.display = "flex";
  dialog2.showModal();
});

// Ajoutez un écouteur d'événements au clic sur le bouton closeTwo
closeTwo.addEventListener("click", (event) => {
  event.preventDefault();
  dialog2.close();
  dialog2.style.display = "none";
  dialog.showModal();
});


let currentImageFile = null;
// Ajout photo et changement btn Valider
document.addEventListener("DOMContentLoaded", (event) => {
  // Ajouter une photo dans modale 2
  document.querySelector("#photoUpload").addEventListener("click", function () {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg";
    input.onchange = function (event) {
      const file = event.target.files[0];
      if (file.size <= 4000000) {
        const reader = new FileReader();
        reader.onload = function (e) {
          currentImageFile = file;
          document.querySelector(".photo-container").innerHTML = `<img src="${e.target.result}" alt="Photo">`;
          document.querySelector("#photoUpload").style.display = "none";
          checkFields();
        };
        reader.readAsDataURL(file);
      } else {
        alert("Le fichier est trop grand !");
      }
    };
    input.click();
  });

  // Vérifier si tous les champs sont remplis
  function checkFields() {
    const titre = document.querySelector(".title-secondModal_input").value;
    const categorie = document.querySelector(".category-secondModal_select").value;
    const validerLink = document.querySelector("#photoValidate");
    if (titre && categorie && document.querySelector(".photo-container").hasChildNodes()) {
        validerLink.style.backgroundColor = "#1D6154";
        validerLink.style.cursor = "pointer";
    } else {
        validerLink.style.backgroundColor = "";
        validerLink.style.cursor = "";
    }
  }

  // Ajouter des écouteurs d'événements aux champs 'Titre' et 'Catégorie'
  document
    .querySelector(".title-secondModal_input")
    .addEventListener("input", checkFields);
  document
    .querySelector(".category-secondModal_select")
    .addEventListener("input", checkFields);
});


// Fonction pour faire une liste déroulante de catégorie
async function displayCategories() {
  const selectCat = await fetchCategories();
  const select = document.querySelector(".category-secondModal_select");

  selectCat.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id; // Utiliser l'id de la catégorie comme valeur
    option.text = category.name; // Utiliser le nom de la catégorie comme texte
    select.appendChild(option);
  });
  console.log("Affichage des catégories terminé !");
}

// Appeler la fonction lors du chargement de la page
document.addEventListener("DOMContentLoaded", (event) => {
  displayCategories();
});
// Créer une nouvelle option
const option = document.createElement("option");
option.value = "4";
option.text = "Bar & restaurant";

// Obtenir le sélecteur
const select = document.querySelector(".category-secondModal_select");

// Ajouter la nouvelle option au sélecteur
select.appendChild(option);




// Fonction ajout nouvelle photo
document.querySelector("#photoValidate").addEventListener("click", async function (event) {
    event.preventDefault();
    const titre = document.querySelector(".title-secondModal_input").value;
    const categoryId = document.querySelector(".category-secondModal_select").value;

    console.log("Titre:", titre);
    console.log("Catégorie:", categoryId);
    console.log("Image URL:", currentImageFile);

    const photoData = new FormData();
    photoData.append('title', titre);
    photoData.append('category', categoryId);
    photoData.append('image', currentImageFile);


    try {
        console.log("Données à envoyer:", photoData);

        const newWork = await addPhoto(photoData); // Appel à la fonction addPhoto avec FormData
        console.log("Nouveau travail ajouté:", newWork);

        const gallery = document.querySelector(".gallery");
        gallery.innerHTML = '';
        await displayGallery();
        const updatedWorks = await fetchWorks();
        console.log("Travaux mis à jour:", updatedWorks);

    } catch (error) {
        console.error("Erreur lors de l'ajout de la photo :", error);
    }
});


