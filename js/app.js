// hit api
const loadData = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear searchField
    searchField.value = "";
    url = `
        https://openapi.programming-hero.com/api/phones?search=${searchText}
    `
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data));
    // console.log(searchText, url);
}