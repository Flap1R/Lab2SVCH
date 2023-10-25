document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const gallery = document.getElementById('gallery');

    // Функция для загрузки фотографий из API
    function loadImages(query) {
        const apiKey = 'pJT3NG3eym63bReVDUfWQkCmox7VGGYGEE07osJR6Wc';
        const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}&per_page=10`;
    
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const images = data.results;
                displayImages(images);
            })
            .catch(error => console.error('Ошибка:', error));
    }
    
    function displayImages(images) {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';
    
        images.forEach(image => {
            const figure = document.createElement('figure');
            figure.innerHTML = `
                <img src="${image.urls.small}" alt="${image.alt_description}">
                <figcaption>${image.description}</figcaption>
            `;
            gallery.appendChild(figure);
        });
    }

    // Настройка начального поискового запроса
    const initialQuery = 'world';  // Ваш начальный поисковый запрос
    searchInput.value = initialQuery;
    loadImages(initialQuery);


    // Обработчик нажатия Enter
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const query = searchInput.value.trim();
            if (query !== '') {
                loadImages(query);
            }
        }
    });

    // Обработчик клика по кнопке "Искать"
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query !== '') {
            loadImages(query);
        }
    });

    // Обработчик клика по кнопке "Очистить"
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        gallery.innerHTML = '';
    });
});
