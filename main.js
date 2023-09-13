document.addEventListener('DOMContentLoaded', function () {
    // Data buku disimpan dalam array books.
    let books = []

    // Fungsi untuk merender ulang rak buku.
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
                // Tampilkan modal konfirmasi penghapusan.
                openDeleteBookModal(book.id)
            })

            bookAction.appendChild(removeButton)

            if (book.isComplete) {
                const undoButton = document.createElement('button')
                undoButton.innerHTML = '<strong>Belum selesai di Baca</strong>'
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
                completeButton.innerHTML = '<strong>Selesai dibaca</strong>'
                completeButton.classList.add('green')
                completeButton.addEventListener('click', function () {
                    book.isComplete = true
                    saveDataToLocalStorage()
                    renderBooks()
                })

                bookAction.appendChild(completeButton)
                incompleteBookshelfList.appendChild(bookItem)
            }

            const editButton = document.createElement('button')
            editButton.innerText = 'Edit buku'
            editButton.classList.add('blue')
            editButton.addEventListener('click', function () {
                openEditBookModal(book.id)
            })

            bookAction.appendChild(editButton)

            bookItem.appendChild(bookTitle)
            bookItem.appendChild(bookAuthor)
            bookItem.appendChild(bookYear)
            bookItem.appendChild(bookAction)
        }
    }

    // Fungsi untuk membuka modal konfirmasi penghapusan.
    function openDeleteBookModal(id) {
        const modal = document.getElementById('deleteBookModal')
        const confirmDeleteButton = document.getElementById('confirmDelete')
        const cancelDeleteButton = document.getElementById('cancelDelete')

        // Tambahkan event listener untuk tombol "Hapus" di modal.
        confirmDeleteButton.addEventListener('click', function () {
            // Cari buku yang sesuai dengan id.
            const bookIndex = books.findIndex(item => item.id === id)

            // Hapus buku dari array books.
            if (bookIndex !== -1) {
                books.splice(bookIndex, 1)
                saveDataToLocalStorage()
                renderBooks()
            }

            // Tutup modal setelah penghapusan.
            modal.style.display = 'none'
        })

        // Tambahkan event listener untuk tombol "Batal" di modal.
        cancelDeleteButton.addEventListener('click', function () {
            // Tutup modal tanpa melakukan penghapusan.
            modal.style.display = 'none'
        })

        // Tampilkan modal.
        modal.style.display = 'block'
    }

    // Event listener untuk formulir input buku.
    const inputForm = document.getElementById('inputBook')
    inputForm.addEventListener('submit', function (event) {
        event.preventDefault()

        // Ambil nilai input pengguna.
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

        // Buat objek buku baru.
        const newBook = {
            id: +new Date(),
            title: inputBookTitle,
            author: inputBookAuthor,
            year: inputBookYear,
            isComplete: inputBookIsComplete
        }

        // Tambahkan buku ke array books.
        books.push(newBook)

        // Simpan data buku ke dalam localStorage.
        saveDataToLocalStorage()

        // Bersihkan input form.
        inputForm.reset()

        // Tampilkan ulang rak buku.
        renderBooks()
    })

    // Event listener untuk formulir pencarian.
    const searchForm = document.getElementById('searchBook')
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault()

        const searchTerm = document.getElementById('searchBookTitle').value
        searchBooks(searchTerm)
    })

    // Fungsi untuk melakukan pencarian buku berdasarkan judul.
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
                openDeleteBookModal(book.id)
            })

            bookAction.appendChild(removeButton)

            if (book.isComplete) {
                const undoButton = document.createElement('button')
                undoButton.innerHTML = '<strong>Belum selesai di Baca</strong>'
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
                completeButton.innerHTML = '<strong>Selesai dibaca</strong>'
                completeButton.classList.add('green')
                completeButton.addEventListener('click', function () {
                    book.isComplete = true
                    saveDataToLocalStorage()
                    renderBooks()
                })

                bookAction.appendChild(completeButton)
                incompleteBookshelfList.appendChild(bookItem)
            }

            const editButton = document.createElement('button')
            editButton.innerText = 'Edit buku'
            editButton.classList.add('blue')
            editButton.addEventListener('click', function () {
                openEditBookModal(book.id)
            })

            bookAction.appendChild(editButton)

            bookItem.appendChild(bookTitle)
            bookItem.appendChild(bookAuthor)
            bookItem.appendChild(bookYear)
            bookItem.appendChild(bookAction)
        }
    }

    // Fungsi untuk menyimpan data buku ke dalam localStorage.
    function saveDataToLocalStorage() {
        localStorage.setItem('books', JSON.stringify(books))
    }

    // Fungsi untuk mengambil data buku dari localStorage.
    function loadDataFromLocalStorage() {
        const storedBooks = localStorage.getItem('books')
        if (storedBooks) {
            books = JSON.parse(storedBooks)
            renderBooks()
        }
    }

    // Panggil fungsi untuk mengambil data buku dari localStorage saat halaman dimuat.
    loadDataFromLocalStorage()

    // Tambahkan event listener untuk menutup modal saat pengguna mengklik di luar modal.
    window.addEventListener('click', function (event) {
        const modal = document.getElementById('deleteBookModal')
        if (event.target === modal) {
            modal.style.display = 'none'
        }
    })

    function openEditBookModal(id) {
        const modal = document.getElementById('editBookModal')
        const saveEditButton = document.getElementById('saveEdit')
        const cancelEditButton = document.getElementById('cancelEdit')

        // Temukan buku yang sesuai dengan id.
        const bookIndex = books.findIndex(item => item.id === id)
        const book = books[bookIndex]

        // Isi formulir pengeditan dengan informasi buku saat ini.
        const editBookTitle = document.getElementById('editBookTitle')
        const editBookAuthor = document.getElementById('editBookAuthor')
        const editBookYear = document.getElementById('editBookYear')
        const editBookIsComplete = document.getElementById('editBookIsComplete')

        editBookTitle.value = book.title
        editBookAuthor.value = book.author
        editBookYear.value = book.year
        editBookIsComplete.checked = book.isComplete

        // Tambahkan event listener untuk tombol "Simpan" di modal pengeditan.
        saveEditButton.addEventListener('click', function () {
            // Simpan perubahan ke dalam objek buku.
            book.title = editBookTitle.value
            book.author = editBookAuthor.value
            book.year = editBookYear.value
            book.isComplete = editBookIsComplete.checked

            // Simpan perubahan ke dalam localStorage.
            saveDataToLocalStorage()

            // Tutup modal pengeditan.
            modal.style.display = 'none'

            // Tampilkan ulang rak buku.
            renderBooks()
        })

        // Tambahkan event listener untuk tombol "Batal" di modal pengeditan.
        cancelEditButton.addEventListener('click', function () {
            // Tutup modal tanpa melakukan perubahan.
            modal.style.display = 'none'
        })

        // Tampilkan modal pengeditan.
        modal.style.display = 'block'
    }

    // Tampilkan buku-buku yang sudah ada saat halaman dimuat.
    renderBooks()
})
