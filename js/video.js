const loadCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err))
}
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(err => console.log(err))
}
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videos.forEach(videos => {
        console.log(videos);
        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
        <figure class="h-[200px] relative">
    <img class="w-full h-full object-cover"
      src="${videos.thumbnail}"
      alt="Shoes" />
      <span class="absolute right-2 bg-black text-white p-1 rounded bottom-1">${videos.others.posted_date}</span>
  </figure>
  <div class="px-0 py-2 flex gap-2">
     <div>
     <img class="w-10 h-10 rounded-full object-cover" src="${videos.authors[0].profile_picture}" />
     </div>
     <div>
     <h2 class="font-bold">${videos.title}</h2>
     <div class="flex items-center gap-2">
     <p>${videos.authors[0].profile_name} </p>
     ${videos.authors[0].verified === true ? "<img src='https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png' class='w-5'/>" : " "
            }
     </div>
     </div>
     <div>

     </div>
  </div>
        `
        videoContainer.appendChild(card);
    });
}

const displayCategories = (data) => {
    const categoryContainer = document.getElementById('categories');
    data.forEach(item => {
        console.log(item);
        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category;

        categoryContainer.appendChild(button);
    })
}

loadCatagories();
loadVideos();