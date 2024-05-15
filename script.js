const accessKey = 'NBn4gwSneCcSWdi8Le-zPe-tM4vIOUGId322JTT-Rtc';
const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const imagesContainer = document.querySelector(".images-container");
const loadMoreBtn = document.querySelector(".loadMoreBtn");

// function to fetch images using Unsplash API
const fetchImages = async (query, pageNo) => {
  try {
    if (pageNo === 1) {
      imagesContainer.innerHTML = '';
    }

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      data.results.forEach(photo => {
        const imageElement = document.createElement("div");
        imageElement.classList.add("imageDiv");
        imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

        //creating overlay
        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");

        //Creating overlay text
        const overlayText = document.createElement("h3");
        overlayText.innerText = photo.alt_description;
        overlayElement.appendChild(overlayText);

        imageElement.appendChild(overlayElement);
        imagesContainer.appendChild(imageElement);
      });
    } else {
      imagesContainer.innerHTML = '<h2>No Image Found.</h2>';
      if (loadMoreBtn.style.display === "block")
        loadMoreBtn.style.display = "none";
    }
  } catch (error) {
    imagesContainer.innerHTML = `<h2>Please try again later</h2>`;
  }
}

// adding event listener to search form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = searchInput.value.trim();
  if (inputText !== "") {
    let page = 1;
    fetchImages(inputText, page);
  } else {
    imagesContainer.innerHTML = `<h2>Please enter a search query</h2>`;
    if (loadMoreBtn.computedStyleMap().get("display") === "block") {
      loadMoreBtn.style.display = "none";
    }
  }
});

//adding event listener to load more button to fetch more images
loadMoreBtn.addEventListener('click', () => {
  fetchImages(searchInput.value.trim(), ++page);
});