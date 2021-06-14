const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addBook() {
  const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);

  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const IsComplete = document.getElementById("inputBookIsComplete").checked;

  const book = makeBook(bookTitle, bookAuthor, bookYear, IsComplete);
  const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, IsComplete);

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  if (IsComplete) {
    completedBOOKList.append(book);
  } else {
    uncompletedBOOKList.append(book);
  }
  updateDataToStorage();
}

function makeBook(Title, Author, Year, isCompleted) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = Title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerHTML = `Penulis: <span id="bookAuthor">` + Author + `</span>`;

  const bookYear = document.createElement("p");
  bookYear.innerHTML = `Tahun: <span id="bookYear">` + Year + `</span>`;

  const textArticle = document.createElement("article");
  textArticle.classList.add("book_item");
  textArticle.append(bookTitle, bookAuthor, bookYear);

  const actionContainer = document.createElement("div");
  actionContainer.classList.add("action");

  if (isCompleted) {
    actionContainer.append(createUnFinishedButton(), createDeleteButton());
    textArticle.append(actionContainer);
  } else {
    actionContainer.append(createFinishedButton(), createDeleteButton());
    textArticle.append(actionContainer);
  }
  return textArticle;
}

function createButton(buttonTypeClass, eventListener, text) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerText = text;
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function createFinishedButton() {
  return createButton(
    "green",
    function (event) {
      addBookToCompleted(event.target.parentElement.parentElement);
    },
    "Selesai Dibaca"
  );
}
function createDeleteButton() {
  return createButton(
    "red",
    function (event) {
      removeTaskFromCompleted(event.target.parentElement.parentElement);
    },
    "Hapus Buku"
  );
}

function removeTaskFromCompleted(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  bookElement.remove();
  updateDataToStorage();
}

function createUnFinishedButton() {
  return createButton(
    "green",
    function (event) {
      undoBookfromCompleted(event.target.parentElement.parentElement);
    },
    "Belum Selesai Dibaca"
  );
}

function undoBookfromCompleted(bookElement) {
  const bookTitle = bookElement.querySelector("h3").innerText;
  const bookAuthor = bookElement.querySelector("span#bookAuthor").innerText;
  const bookYear = bookElement.querySelector("span#bookYear").innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

  const unlistCompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBook[BOOK_ITEMID] = book.id;

  unlistCompleted.appendChild(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function addBookToCompleted(bookElement) {
  const bookCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

  const bookTitle = bookElement.querySelector("h3").innerText;
  const bookAuthor = bookElement.querySelector("span#bookAuthor").innerText;
  const bookYear = bookElement.querySelector("span#bookYear").innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;

  bookCompleted.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function searchBooks() {
  const textSearch = document.getElementById("searchBookTitle").value;

  const listBookCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  const listBookUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

  let findBook = books.filter((book) => {
    return book.title.toLowerCase().includes(textSearch.toLowerCase());
  });

  const totalBookCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID).childElementCount;
  const totalBookUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID).childElementCount;

  console.log(findBook);

  for (let i = 0; i < totalBookUncompleted; i++) {
    listBookUncompleted.removeChild(listBookUncompleted.lastElementChild);
  }

  for (let j = 0; j < totalBookCompleted; j++) {
    listBookCompleted.removeChild(listBookCompleted.lastElementChild);
  }

  if (findBook == false) {
    alert("buku tidak tersedia di rak");
  } else {
    alert("buku tersedia di rak");
  }

  for (book of findBook) {
    const newBook = makeBook(book.title, book.author, book.year, book.isCompleted);
    newBook[BOOK_ITEMID] = book.id;
    if (book.isCompleted) {
      listBookCompleted.append(newBook);
      console.log("completed : ", newBook);
    }
    if (book.isCompleted == false) {
      listBookUncompleted.append(newBook);
      console.log("uncompleted : ", newBook);
    }
  }
}
