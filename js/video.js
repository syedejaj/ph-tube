const loadCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err))
}
const getTimeString = (time) => {
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600;
    const minute = parseInt(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;
    return `${hour} hour ${minute} minute ${remainingSeconds} second ago`;
}
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(err => console.log(err))
}

const loadCategoriesVideo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add('active');
            displayVideos(data.category)
        })
        .catch(err => console.log(err))
}
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";
    if (videos.length == 0) {
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        <div class="min-h-screen flex flex-col items-center justify-center gap-5">
        <img src="assets/Icon.png"/>
        <h2 class="text-center font-bold text-xl">No Content here in this category
        </h2>
        </div>
        `
    } else {
        videoContainer.classList.add('grid');
    }
    videos.forEach(videos => {
        console.log(videos);
        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
        <figure class="h-[200px] relative">
    <img class="w-full h-full object-cover"
      src="${videos.thumbnail}"
      alt="Shoes" />
      ${videos.others.posted_date?.length === 0 ?
                " " :
                `<span class="absolute right-2 text-xs bg-black text-white p-1 rounded bottom-1">${getTimeString(videos.others.posted_date)}</span>
        `
            }
      
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
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    console.log(buttons);
    for (let btn of buttons) {
        btn.classList.remove('active');
    }
}
const displayCategories = (data) => {
    const categoryContainer = document.getElementById('categories');
    data.forEach(item => {
        console.log(item);
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoriesVideo(${item.category_id})" class="btn category-btn"> ${item.category}
        </button>
        `

        categoryContainer.appendChild(buttonContainer);
    })
}

loadCatagories();
loadVideos();