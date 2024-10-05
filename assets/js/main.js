// Load categories button from the API and display them on the page
// Categories URL
const categoriesUrl =
  'https://openapi.programming-hero.com/api/phero-tube/categories';

// Load categories from the API
const loadCategories = async () => {
  try {
    const response = await fetch(categoriesUrl);
    const data = await response.json();
    displayCategories(data.categories);
  } catch (error) {
    console.error(error);
  }
};

loadCategories();

// Display categories btn on the page
const displayCategories = (categories) => {
  const categoriesBtnContainer = document.getElementById(
    'categories-btn-container'
  );

  categories.map((categoryObj) => {
    const { category_id, category } = categoryObj;

    const categoryBtn = document.createElement('button');
    categoryBtn.classList = 'da-btn bg-base-300 px-4 py-2 rounded category-btn';
    categoryBtn.addEventListener('click', (event) => {
      addRemoveActiveClass(event.target);
      loadCategoryVideos(category_id);
    });
    categoryBtn.innerText = category;
    categoriesBtnContainer.appendChild(categoryBtn);
  });
};

// Load category based videos from the API and display them on the page
const loadCategoryVideos = async (categoryID) => {
  const videosUrl = `https://openapi.programming-hero.com/api/phero-tube/category/${categoryID}`;
  try {
    const response = await fetch(videosUrl);
    const data = await response.json();
    displayVideosCard(data.category);
  } catch (error) {
    console.error(error);
  }
};

// Load videos details from the API and display them on the page
const loadVideoDetails = async (videoID) => {
  const videoDetailsUrl = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;
  try {
    const response = await fetch(videoDetailsUrl);
    const data = await response.json();
    videoDetailsModal(data.video);
  } catch (error) {
    console.error(error);
  }
};

// video details modal
const videoDetailsModal = (video) => {
  const { thumbnail, title, authors, description } = video;
  const detailsModal = document.getElementById('video-details-modal');
  detailsModal.innerHTML = `
  <div class="da-modal-box w-1/2 bg-gray-300">
    <img src=${thumbnail} alt="${title}" class="w-full h-[20rem] object-cover rounded-sm"/>
    <h3 class="text-lg font-bold mt-2">${title}</h3>
    <h4 class="mt-1 text-base font-semibold">By ${authors[0].profile_name}</h4>
    <p class="py-4 text-clr-gray">${description}</p>
    <div class="text-right"><button id="modal-close-btn" class="px-4 py-1 bg-gray-400 hover:bg-red-400 hover:text-black text-white rounded">Close</button></div>
  </div>
  `;
  showModal('video-details-modal', 'modal-close-btn');
};

// Modal Function
function showModal(modalId, closeId) {
  const modalOpen = document.getElementById(modalId);
  const modalClose = document.getElementById(closeId);
  modalOpen.classList.add('da-modal-open');
  modalClose.addEventListener('click', function () {
    modalOpen.classList.remove('da-modal-open');
  });
}

// Load All videos from the API and display them on the page

// All Videos URL
const videosUrl = 'https://openapi.programming-hero.com/api/phero-tube/videos';

// Load videos from the API
const loadAllVideos = async (searchText = '', sortByviews = false) => {
  const searchSring = searchText === '' ? '' : `?title=${searchText}`;
  try {
    const response = await fetch(videosUrl + searchSring);
    const data = await response.json();
    sortByviews
      ? sortByviewsVideos(data.videos)
      : displayVideosCard(data.videos);
  } catch (error) {
    console.error(error);
  }
};

loadAllVideos();

// All videos button
const allVideosBtn = document.getElementById('all-videos-btn');
allVideosBtn.addEventListener('click', (event) => {
  addRemoveActiveClass(event.target);
  loadAllVideos();
});

// Search videos
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', (event) => {
  loadAllVideos(event.target.value);
});

// seconds to hours, minutes, seconds string format
const secondsToHMSring = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}hrs ${m}min ago`;
};

// Active class for category button
const addRemoveActiveClass = (categoryBtn) => {
  const categoryBtns = document.querySelectorAll('.category-btn');
  categoryBtns.forEach((btn) =>
    btn.classList.remove('bg-red-500', 'text-white')
  );
  categoryBtn.classList.add('bg-red-500', 'text-white');
};

// Display videos card on the page

const displayVideosCard = (videos) => {
  const videosContainer = document.getElementById('video-cards-container');
  videosContainer.classList =
    'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5';
  videosContainer.innerHTML = '';

  // if no content found display message
  if (videos.length === 0) {
    videosContainer.classList = 'flex justify-center items-center min-h-[50vh]';
    videosContainer.innerHTML = `
    <div class="flex flex-col items-center gap-5">
      <img src="./assets/icons/icon.png" class="w-[8.75rem]"/>
      <p class="text-center text-2xl text-clr-gray">Opps!! No Content Found</p>
    </div>`;
    return;
  }

  videos.map((video) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList = 'da-card max-w-[19.5rem] bg-base-100';
    const { video_id, thumbnail, title, authors, others } = video;
    const author = authors[0];
    const { profile_picture, profile_name, verified } = author;
    const { views, posted_date } = others;

    // card content
    cardDiv.innerHTML = ` <figure class="h-[12.5rem] relative">
       <img src=${thumbnail} class="w-full h-full object-cover" />
       ${
         posted_date &&
         `<span
          class="absolute right-3 bottom-3 bg-clr-gray text-[0.625rem] text-white p-1 rounded" >
          ${secondsToHMSring(posted_date)}</span>`
       }
       
      </figure>
      <div class="px-0 py-5 flex gap-3 items-start">
        <img
          src=${profile_picture}
          alt=${profile_name}
          class="w-10 h-10 rounded-full object-cover" />
        <div class="space-y-2">
          <h2 class="text-base font-bold">
            ${title}
          </h2>
          <div class="flex gap-2 items-center">
            <p class="text-sm text-clr-gray/700 font-normal">
              ${profile_name}
            </p>
            ${
              verified === true
                ? `<img
              src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"
              alt="Verified blue Badge"
              class="w-5" />`
                : ''
            }
            
            </div>
            <p class="inline text-sm text-clr-gray/700 font-normal">${views} views</p>
            <button onclick="loadVideoDetails('${video_id}')" class="ml-3 px-4 py-1 bg-gray-400 hover:bg-red-400 hover:text-black text-white rounded">Details</button>
          </div>
        </div>`;

    videosContainer.appendChild(cardDiv);
  });
};

// Sort videos by views
const sortVideosByViewsBtn = document.getElementById('sort-views-btn');
sortVideosByViewsBtn.addEventListener('click', (event) => {
  addRemoveActiveClass(event.target);
  loadAllVideos(undefined, true);
});

// Sort videos by views function
function sortByviewsVideos(videos) {
  function convertViewsToNumber(views) {
    if (views.endsWith('K')) {
      return parseFloat(views) * 1000;
    } else if (views.endsWith('M')) {
      return parseFloat(views) * 1000000;
    } else {
      return parseFloat(views);
    }
  }
  videos.sort(function (a, b) {
    return (
      convertViewsToNumber(b.others.views) -
      convertViewsToNumber(a.others.views)
    );
  });
  displayVideosCard(videos);
}
