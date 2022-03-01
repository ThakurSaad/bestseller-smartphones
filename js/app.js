// hit main api // load data
const loadData = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // clear searchField
  searchField.value = "";

  url = `
        https://openapi.programming-hero.com/api/phones?search=${searchText}
    `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data)); // get data array
};

// display search results
const displayPhones = (phones) => {
  const resultContainer = document.getElementById("result-container");
  const error = document.getElementById("error");
  resultContainer.innerHTML = "";

  // where the details will be shown
  const searchDetails = document.getElementById("search-details");
  // clear previous single details // when details is visible and you search for phone
  searchDetails.innerHTML = "";

  if (phones.length === 0) {
    // display error
    error.innerHTML = `
      <p class="fs-3 fw-bold text-danger text-center">Sorry!No Device Found 😪</p>
    `;
  } else {
    // clear error before showing result
    error.innerHTML = "";

    // control search results
    const mobiles = (phones, start, end) => {
      const mobiles = phones.slice(start, end);
      mobiles.forEach((phone) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top h-75 w-50 p-2 mx-auto" alt="image">
            <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <h3>${phone.phone_name}</h3>
                <button onclick="loadSinglePhoneDetails('${phone.slug}')" class="btn btn-dark">Details</button>
            </div>
        </div>
      `;
        resultContainer.appendChild(div);
      });
    };

    // control search result
    mobiles(phones, 0, 20);

    /* const showMore = document.getElementById("show-more");
    showMore.innerHTML = `
      <button onclick="mobiles('${phones}')" class="btn btn-secondary">Show more</button>
    `; */
  }
};

// hit single phone details API // load data
const loadSinglePhoneDetails = (slug) => {
  url = `
        https://openapi.programming-hero.com/api/phone/${slug}
    `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySinglePhoneDetails(data.data)); // get data array
};

// display single phone details
const displaySinglePhoneDetails = (singlePhone) => {
  // where the details will be shown
  const searchDetails = document.getElementById("search-details");
  // clear previous single details
  searchDetails.innerHTML = "";

  // release date // conditional
  const releaseDate = singlePhone.releaseDate;
  let setReleaseDate = "";
  if (releaseDate !== "") {
    setReleaseDate = releaseDate;
  } else {
    setReleaseDate = "Sorry! No Date Found 😓";
  }

  // details showing card
  const div = document.createElement("div");
  div.innerHTML = `
      <div class="phoneDetails card h-100 mb-2 mx-auto">
          <img src="${singlePhone.image}" class="card-img-top" alt="image">
          <div class="card-body">
              <h5 class="card-title">${singlePhone.brand}</h5>
              <h3>${singlePhone.name}</h3>
              <hr>
              <div>
                <h6>Release Date</h6>
                <div class="small-text text-muted">
                  <span>${setReleaseDate}</span>
                </div>
              </div>
              <hr>
              <div>
                <h6>Main Features</h6>
                <div id="main-features" class="small-text text-muted"></div>
              </div>
              <hr>
              <div>
                <h6>Sensors</h6>
                <div id="sensors" class="small-text text-muted"></div>
                <hr>
                <h6>Other Information</h6>
                <div id="others" class="small-text text-muted"></div>
              </div>
          </div>
      </div>
    `;
  searchDetails.appendChild(div);

  // calling funtions for details
  // mainfeatures
  const phoneFeatures = singlePhone.mainFeatures;
  displayMainFeatures(phoneFeatures);

  // sensors
  const sensors = phoneFeatures.sensors;
  displaySensors(sensors);

  // others
  const others = singlePhone.others;
  displayOthers(others);
};

// display main mainFeatures information
const displayMainFeatures = (singlePhoneMainFeatures) => {
  const mainFeatures = document.getElementById("main-features");
  for (const prop in singlePhoneMainFeatures) {
    if (prop === "sensors") {
      continue;
    } else {
      const span = document.createElement("span");
      const information = `${prop} : ${singlePhoneMainFeatures[prop]} | `;
      span.innerText = information;
      mainFeatures.appendChild(span);
    }
  }
};

// display sensors information
const displaySensors = (singlePhoneSensors) => {
  const sensors = document.getElementById("sensors");
  // loop through elements to append
  for (const sensor of singlePhoneSensors) {
    const span = document.createElement("span");
    const information = `${sensor} | `;
    span.innerText = information;
    sensors.appendChild(span);
  }
};

// display others information
const displayOthers = (singlePhoneOthers) => {
  const others = document.getElementById("others");
  if (singlePhoneOthers === undefined) {
    others.innerText = "No Other Information";
  }
  // loop through properties and values to append
  else {
    for (const prop in singlePhoneOthers) {
      const span = document.createElement("span");
      const information = `${prop} : ${singlePhoneOthers[prop]} | `;
      span.innerText = information;
      others.appendChild(span);
    }
  }
};
