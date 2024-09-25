const apiKey = '46100739-5e26b7e734ac9ed8a89434dfb'; 
const imageGallery = document.getElementById('imageGallery');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const caption = document.getElementById('caption');
const closeModal = document.querySelector('.close');

// Function to fetch images from Pixabay API
async function fetchImages(query = 'nature') {
  const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo`);
  const data = await response.json();
  displayImages(data.hits);
}

// Function to display images in the gallery
function displayImages(images) {
  imageGallery.innerHTML = '';
  images.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('image-card');

    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    imgElement.addEventListener('click', () => openModal(image.largeImageURL, image.user));

    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');

    // Download icon
    const downloadLink = document.createElement('a');
    downloadLink.innerHTML = '⬇';
    downloadLink.href = image.largeImageURL;
    downloadLink.setAttribute('download', 'pixabay_image.jpg');

    // Visit original site icon
    const linkToPixabay = document.createElement('a');
    linkToPixabay.innerHTML = '🔗';
    linkToPixabay.href = image.pageURL;
    linkToPixabay.target = '_blank';

    // Add icons to the container
    iconContainer.appendChild(downloadLink);
    iconContainer.appendChild(linkToPixabay);

    // Append elements
    card.appendChild(imgElement);
    card.appendChild(iconContainer);
    imageGallery.appendChild(card);
  });
}

// Function to open modal with larger image
function openModal(imgSrc, imgAuthor) {
  modalImage.src = imgSrc;
  caption.textContent = `Image by: ${imgAuthor}`;
  imageModal.style.display = 'flex';
}

// Close modal
closeModal.addEventListener('click', () => {
  imageModal.style.display = 'none';
});

// Add search functionality
searchBtn.addEventListener('click', () => {
  const searchTerm = searchInput.value;
  fetchImages(searchTerm);
});

// next prev button logic 


// Initial load of default images
fetchImages();
