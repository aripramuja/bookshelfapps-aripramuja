document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});
document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});

document.addEventListener("DOMContentLoaded", function () {
  const submitSearch = document.getElementById("searchBook");
  submitSearch.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBooks();
  });
});