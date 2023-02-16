const newPlantForm = document.querySelector('#new-plant-card');
const newPlantBtn = document.querySelector('#new-plant-btn');
var plantID;
var plantName;
var plantClassification;

// Collapses the 'Add New Plant' button and displays the form to create a new plant
const showNewPlantFormHandler = async => {
    newPlantForm.setAttribute('style', 'display: flex');
    newPlantBtn.setAttribute('style', 'display: none');
};

// Handler for creating a new plant
const newPlantHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#plant-name').value.trim();
    const classification = document.querySelector('#plant-classification').value.trim();
    // Storing the form data in an object so the image file can be used in the request body
    const formData = new FormData(document.querySelector('#new-plant-form'));

    if (name && classification) {
        const response = await fetch('/api/plants', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create new plant - please provide a valid image file');
        };
    };
};

// Handler for deleting plants
const plantDeleteHandler = async (event) => {
    if (event.target.hasAttribute('data-delete')) {
        const id = event.target.getAttribute('data-delete');

        const response = await fetch(`/api/plants/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete plant')
        };
    };
};

// Handler for updating a plant
const plantUpdateHandler = async (event) => {
    if (event.target.hasAttribute('data-update')) {

        // Assigning values to global variables
        plantID = event.target.getAttribute('data-update');
        plantName = event.target.getAttribute('data-name');
        plantClassification = event.target.getAttribute('data-classification');

        // Hiding all other plants to focus on updating the current plant
        const allPlantCards = document.querySelectorAll('.plant-card');
        allPlantCards.forEach(card => {
            card.style.display = 'none';
        });

        // Hiding button for creating a new plant, as well as the plant form (if open)
        newPlantBtn.setAttribute('style', 'display: none');
        newPlantForm.setAttribute('style', 'display: none');

        // Displaying form to update the selected plant
        document.querySelector('#update-plant-card').setAttribute('style', 'display: flex');

        // Prefilling form fields for the plant to be updated
        document.querySelector('#updated-name').value = plantName;
        document.querySelector('#updated-classification').value = plantClassification;
    };
};

// Handler for submitting an updated plant
const plantUpdateSubmit = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#updated-name').value.trim();
    const classification = document.querySelector('#updated-classification').value.trim();
    // Storing the form data in an object so the image file can be used in the request body
    const formData = new FormData(document.querySelector('#update-plant-form'));

    if (name && classification) {
        const response = await fetch(`/api/plants/${plantID}`, {
            method: 'PUT',
            body: formData
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to update plant - please provide a valid image file');
        };
    };
};

newPlantBtn
    .addEventListener('click', showNewPlantFormHandler);

document
    .querySelector('#new-plant-form')
    .addEventListener('submit', newPlantHandler);

document
    .addEventListener('click', plantDeleteHandler);

document
    .addEventListener('click', plantUpdateHandler);

document
    .querySelector('#update-plant-form')
    .addEventListener('submit', plantUpdateSubmit);