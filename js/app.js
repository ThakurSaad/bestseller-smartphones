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
  phones.forEach((phone) => {
    // console.log(phone);
    const div = document.createElement("div");
    div.innerHTML = `
        <div onclick="loadSinglePhoneDetails('${phone.slug}')" class="card h-100">
            <img src="${phone.image}" class="card-img-top h-75 w-50 p-2 mx-auto" alt="image">
            <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <h3>${phone.phone_name}</h3>
                <button class="btn btn-dark">Details</button>
            </div>
        </div>
      `;
    resultContainer.appendChild(div);
  });
};

// hit single phone details API // load data
const loadSinglePhoneDetails = (slug) => {
  //   console.log(slug);
  url = `
        https://openapi.programming-hero.com/api/phone/${slug}
    `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySinglePhoneDetails(data.data)); // get data array
};

// display single phone details
const displaySinglePhoneDetails = (singlePhone) => {
  console.log(singlePhone);
};
