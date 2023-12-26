/*
import { addPhoto, deletePhoto } from './api.js';

// Récupération des éléments de la modale
const galleryModal = document.getElementById('galleryModal');
const imageGallery = document.getElementById('imageGallery');
const addPhotoBtn = document.getElementById('addPhotoBtn');
const closeBtn = document.querySelector('.close');

// Fonction pour ouvrir la modale
function openModal() {
    galleryModal.style.display = 'block';
}

// Fonction pour fermer la modale
function closeModal() {
    galleryModal.style.display = 'none';
}

// Événement pour ouvrir la modale lors du clic sur le lien 'modifier'
document.getElementById('editLink').addEventListener('click', openModal);

// Événement pour fermer la modale lors du clic sur la croix
closeBtn.addEventListener('click', closeModal);

// Événement pour fermer la modale lors du clic en dehors de la fenêtre modale
window.addEventListener('click', (event) => {
    if (event.target === galleryModal) {
        closeModal();
    }
});

// Événement pour ajouter une photo (ouvrir la seconde modale)
addPhotoBtn.addEventListener('click', async () => {
    // Appel de la fonction pour ajouter une photo
    const photo = {}; // Remplacez ceci par les données de la photo à ajouter
    try {
        const addedPhoto = await addPhoto(photo);
        // Vous pouvez maintenant ajouter la photo ajoutée à votre galerie
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la photo:', error);
    }
});

// Fonction pour afficher les images dans la galerie
async function displayImages() {
    try {
        const images = await getImages(); // Assurez-vous que getImages est une fonction qui récupère les images depuis le backend
        imageGallery.innerHTML = ''; // Pour vider la galerie avant d'afficher les nouvelles images
        images.forEach((image) => {
            const imageElement = document.createElement('div');
            imageElement.classList.add('image');
            imageElement.innerHTML = `<img src="${image.src}" alt="${image.alt}">
                                      <span class="delete-icon"><i class="fas fa-trash"></i></span>`;
            // Événement pour supprimer une image
            imageElement.querySelector('.delete-icon').addEventListener('click', async () => {
                try {
                    // Suppression de l'image en appelant la fonction deletePhoto de l'API
                    await deletePhoto(image.id); // Assurez-vous que deletePhoto prend l'ID de l'image comme paramètre
            
                    // Ensuite, recharger la galerie après la suppression de l'image
                    displayImages(); // Une fonction qui charge les images dans la galerie depuis le backend
                } catch (error) {
                    console.error('Erreur lors de la suppression de l\'image:', error);
                }
            });
            imageGallery.appendChild(imageElement);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des images:', error);
    }
}

// Appel de la fonction pour charger les images au chargement de la page
window.addEventListener('DOMContentLoaded', displayImages);
*/
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
