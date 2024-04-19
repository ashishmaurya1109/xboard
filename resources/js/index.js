async function getTopicsFromLinks() {
  let linksArray = [];

  for (const ele of magazines) {
    try {
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${ele}`
      );
      const data = await response.json();
      const title = await data.feed.title;
      linksArray.push(title);
    } catch (e) {
      console.log(e);
    }
  }

  //THE REASON WHY FOR_OF LOOP HAS BEEN USED HERE IS BECAUSE FOR_OF LOOP IS EXECUTED SEQUENTIALLY.
  //WHILE THE FOR_EACH LOOP IS EXECUTED ALL AT ONCE. SO ASYNC AND AWAIT WILL NOT WORK ON IT.

  return linksArray;
}

function addTopics(linksArray) {
  const accordion = document.querySelector("#accordionExample");
  linksArray.forEach((ele, i) => {
    const accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");
    accordionItem.innerHTML = `
        <h2 class="accordion-header" id="heading-${i + 1}">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse-${i + 1}"
          aria-controls="collapse-${i + 1}"
        >
          ${ele}
        </button>
      </h2>
      <div
        id="collapse-${i + 1}"
        class="accordion-collapse collapse show"
        aria-labelledby="heading-${i + 1}"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <strong>This is the first item's accordion body.</strong> It is
          shown by default, until the collapse plugin adds the appropriate
          classes that we use to style each element. These classes control
          the overall appearance, as well as the showing and hiding via CSS
          transitions. You can modify any of this with custom CSS or
          overriding our default variables. It's also worth noting that just
          about any HTML can go within the <code>.accordion-body</code>,
          though the transition does limit overflow.
        </div>
      </div>
        `;

    const btn = accordionItem.children[0].children[0];

    if (i === 0) {
      btn.setAttribute("aria-expanded", "true");
    } else {
      btn.setAttribute("aria-expanded", "false");
      btn.classList.add("collapsed");
      accordionItem.children[1].classList.remove("show");
    }

    accordion.append(accordionItem);
  });
}

function addCarousel() {
  const accordionBody = document.getElementsByClassName("accordion-body");
   let index=0;
  for (const i of accordionBody) {
    i.innerHTML = "";
    i.innerHTML = `
        <div id="carouselExampleControls-${index+1}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls-${index+1}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls-${index+1}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
        `;

        index++;
  }
}

async function addCard(items) {
  const carouselInner = document.getElementsByClassName("carousel-inner");

  for (let i=0;i<carouselInner.length;i++){
   
    // try{

        items[i].forEach((ele,index) => {
           
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if(index===0) carouselItem.classList.add('active');
            console.log(ele.enclosure.link)
            const d = new Date(ele.pubDate);
            let date = d.toLocaleDateString("en-IN");
            carouselItem.innerHTML = `
            <a href=${ele.link} target="_blank" id="linkCard">
            <div class="card">
                 <img src=${ele.enclosure.link} class="card-img-top" alt="...">
                 <div class="card-body">
                    <h5 class="card-title">${ele.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${ele.author} &nbsp; • &nbsp; ${date}</h6>
                    <p class="card-text">${ele.description}
                    </p>
                 </div>
            </div>
            </a>
            `;

            carouselInner[i].append(carouselItem);

        })


    // } catch(e){
    //     console.log(e);
    // }
    

  }

}

async function getItems(){
    let itemsArray = [];
    for(const i of magazines){

    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${i}`)
        const data = await response.json();
        itemsArray.push(data.items);
    }

    console.log(itemsArray);
    return itemsArray;
}
async function start() {
  let linksArray = await getTopicsFromLinks();
  addTopics(linksArray);
  addCarousel();
  let itemsArray = await getItems();
  addCard(itemsArray);
}

start();


