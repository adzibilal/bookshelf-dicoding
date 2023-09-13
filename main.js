document.addEventListener('DOMContentLoaded', function () {
    let books = JSON.parse(localStorage.getItem('books')) || []

    function saveDataToLocalStorage() {
        localStorage.setItem('books', JSON.stringify(books))
    }

    //Fungsi Menampilkan Buku
    function renderBooks() {
        const incompleteBookshelfList = document.getElementById(
            'incompleteBookshelfList'
        )
        const completeBookshelfList = document.getElementById(
            'completeBookshelfList'
        )

        incompleteBookshelfList.innerHTML = ''
        completeBookshelfList.innerHTML = ''

        for (const book of books) {
            const bookItem = document.createElement('article')
            bookItem.classList.add('book_item')

            const bookTitle = document.createElement('h3')
            bookTitle.innerText = book.title

            const bookAuthor = document.createElement('p')
            bookAuthor.innerText = `Penulis: ${book.author}`

            const bookYear = document.createElement('p')
            bookYear.innerText = `Tahun: ${book.year}`

            const bookAction = document.createElement('div')
            bookAction.classList.add('action')

            const removeButton = document.createElement('button')
            removeButton.innerText = 'Hapus buku'
            removeButton.classList.add('red')
            removeButton.addEventListener('click', function () {
                const bookIndex = books.findIndex(item => item.id === book.id)
                if (bookIndex !== -1) {
                    books.splice(bookIndex, 1)
                    saveDataToLocalStorage()
                    renderBooks()
                }
            })

            bookAction.appendChild(removeButton)

            if (book.isComplete) {
                const undoButton = document.createElement('button')
                undoButton.innerText = 'Belum selesai di Baca'
                undoButton.classList.add('green')
                undoButton.addEventListener('click', function () {
                    book.isComplete = false
                    saveDataToLocalStorage()
                    renderBooks()
                })

                bookAction.appendChild(undoButton)
                completeBookshelfList.appendChild(bookItem)
            } else {
                const completeButton = document.createElement('button')
                completeButton.innerText = 'Selesai dibaca'
                completeButton.classList.add('green')
                completeButton.addEventListener('click', function () {
                    book.isComplete = true
                    saveDataToLocalStorage()
                    renderBooks()
                })

                bookAction.appendChild(completeButton)
                incompleteBookshelfList.appendChild(bookItem)
            }

            bookItem.appendChild(bookTitle)
            bookItem.appendChild(bookAuthor)
            bookItem.appendChild(bookYear)
            bookItem.appendChild(bookAction)
        }
    }

    // Fungsi Merubah Text Button Simpan Buku
    const inputBookIsComplete = document.getElementById('inputBookIsComplete')
    const bookSubmitButton = document.getElementById('bookSubmit')
    inputBookIsComplete.addEventListener('change', function () {
        if (inputBookIsComplete.checked) {
            bookSubmitButton.innerHTML = 'Masukkan Buku ke rak <strong>Selesai dibaca</strong>'
        } else {
            bookSubmitButton.innerHTML =
                'Masukkan Buku ke rak <strong>Belum selesai dibaca</strong>'
        }
    })

    const inputForm = document.getElementById('inputBook')

    //Fungsi Menyimpan Buku
    inputForm.addEventListener('submit', function (event) {
        event.preventDefault()

        const inputBookTitle = document.getElementById('inputBookTitle').value
        const inputBookAuthor = document.getElementById('inputBookAuthor').value
        const inputBookYear = document.getElementById('inputBookYear').value
        const inputBookIsComplete = document.getElementById(
            'inputBookIsComplete'
        ).checked

        // Validasi input.
        if (
            inputBookTitle === '' ||
            inputBookAuthor === '' ||
            inputBookYear === ''
        ) {
            alert('Harap lengkapi semua informasi buku.')
            return
        }

        const newBook = {
            id: +new Date(),
            title: inputBookTitle,
            author: inputBookAuthor,
            year: inputBookYear,
            isComplete: inputBookIsComplete
        }

        books.push(newBook)

        saveDataToLocalStorage()

        inputForm.reset()

        renderBooks()
    })

    // Event listener untuk form pencarian.
    const searchForm = document.getElementById('searchBook')
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault()

        const searchTerm = document.getElementById('searchBookTitle').value
        searchBooks(searchTerm)
    })

    // Fungsi pencarian buku .
    function searchBooks(searchTerm) {
        const matchingBooks = []

        for (const book of books) {
            if (book.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                matchingBooks.push(book)
            }
        }

        renderSearchResults(matchingBooks)
    }

    // Fungsi untuk menampilkan hasil pencarian.
    function renderSearchResults(matchingBooks) {
        const incompleteBookshelfList = document.getElementById(
            'incompleteBookshelfList'
        )
        const completeBookshelfList = document.getElementById(
            'completeBookshelfList'
        )
        incompleteBookshelfList.innerHTML = ''
        completeBookshelfList.innerHTML = ''

        for (const book of matchingBooks) {
            const bookItem = document.createElement('article')
            bookItem.classList.add('book_item')

            const bookTitle = document.createElement('h3')
            bookTitle.innerText = book.title

            const bookAuthor = document.createElement('p')
            bookAuthor.innerText = `Penulis: ${book.author}`

            const bookYear = document.createElement('p')
            bookYear.innerText = `Tahun: ${book.year}`

            const bookAction = document.createElement('div')
            bookAction.classList.add('action')

            const removeButton = document.createElement('button')
            removeButton.innerText = 'Hapus buku'
            removeButton.classList.add('red')
            removeButton.addEventListener('click', function () {
                const bookIndex = books.findIndex(item => item.id === book.id)
                if (bookIndex !== -1) {
                    books.splice(bookIndex, 1)
                    saveDataToLocalStorage()
                    renderBooks()
                }
            })

            bookAction.appendChild(removeButton)

            if (book.isComplete) {
                const undoButton = document.createElement('button')
                undoButton.innerText = 'Belum selesai di Baca'
                undoButton.classList.add('green')
                undoButton.addEventListener('click', function () {
                    book.isComplete = false
                    saveDataToLocalStorage()
                    renderBooks()
                })

                bookAction.appendChild(undoButton)
                completeBookshelfList.appendChild(bookItem)
            } else {
                const completeButton = document.createElement('button')
                completeButton.innerText = 'Selesai dibaca'
                completeButton.classList.add('green')
                completeButton.addEventListener('click', function () {
                    book.isComplete = true
                    saveDataToLocalStorage()
                    renderBooks()
                })

                bookAction.appendChild(completeButton)
                incompleteBookshelfList.appendChild(bookItem)
            }

            bookItem.appendChild(bookTitle)
            bookItem.appendChild(bookAuthor)
            bookItem.appendChild(bookYear)
            bookItem.appendChild(bookAction)
        }
    }

    renderBooks()
})
