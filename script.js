document.getElementById('book-title').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchBook();
    }
});

function searchBook() {
    var title = document.getElementById('book-title').value;
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
        .then(response =>
response.json())
.then(data => {
displayBookDetails(data.items);
})
.catch(error => {
console.error('Error:', error);
});
}

function displayBookDetails(books) {
    var details = document.getElementById('book-details');
    details.innerHTML = ''; // Clear previous results

    books.forEach(book => {
        var div = document.createElement('div');
        div.innerHTML = `<h2>${book.volumeInfo.title}</h2>` +
                        `<p>${book.volumeInfo.authors ? book.volumeInfo
.authors.join(', ') : 'Author not available'}</p>+ <p>${book.volumeInfo.publishedDate || 'Date not available'}</p>+ <img src="${book.volumeInfo.imageLinks?.thumbnail || 'default-thumbnail.jpg'}" alt="Book cover">+ <p>${book.volumeInfo.description || 'No description available'}</p>`;
details.appendChild(div);
});}

// DOMが完全に読み込まれたらイベントリスナーを追加
document.addEventListener('DOMContentLoaded', function() {
    // エンターキーが押されたら検索を実行するイベントリスナーを追加
    const searchInput = document.getElementById('bookTitle');
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            findSimilarBooks();
        }
    });
});

function findSimilarBooks() {
    const title = document.getElementById('bookTitle').value.trim();
    if (title) {
        const formattedTitle = encodeURIComponent(title);
        const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${formattedTitle}&maxResults=5`;

        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                displayResults(data.items);
            })
            .catch(error => {
                console.error('Error:', error);
                displayResults([]); // 結果がない場合は空の配列を渡す
            });
    } else {
        displayResults([]); // 結果がない場合は空の配列を渡す
    }
}

function displayResults(books) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (books && books.length > 0) {
        books.forEach(book => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.textContent = book.volumeInfo.title || 'No title available';
            resultsContainer.appendChild(item);
        });
    } else {
        const noResultsMsg = document.createElement('div');
        noResultsMsg.textContent = 'No results found.';
        noResultsMsg.className = 'search-result-item';
        resultsContainer.appendChild(noResultsMsg);
    }
}
