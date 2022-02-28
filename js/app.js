// hit api
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

const displayPhones = (phones) => {
  const resultContainer = document.getElementById("result-container");
  phones.forEach((phone) => {
    console.log(phone);
    const div = document.createElement("div");
    div.innerHTML = `
        <div onclick="loadDetails()" class="card h-100">
            <img src="${phone.image}" class="card-img-top p-2" alt="image">
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
