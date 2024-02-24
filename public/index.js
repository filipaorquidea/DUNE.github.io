document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'http://localhost:5000';
    const displayedData = new Set();

    document.getElementById('fetchDataForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const dataType = document.getElementById('dataType').value;
        const dataId = document.getElementById('dataId').value;

        clearAllData();

        fetch(`${apiUrl}/${dataType}/id/${dataId}`)
            .then(response => response.json())
            .then(data => {
                // Reset containers
                document.getElementById('quoteContainer').style.display = 'none';
                document.getElementById('bookContainer').style.display = 'none';
                document.getElementById('movieContainer').style.display = 'none';
                document.getElementById('comicContainer').style.display = 'none';
                document.getElementById('serieContainer').style.display = 'none';
                document.getElementById('storyContainer').style.display = 'none';

                if (dataType === 'quotes' && data.id) {
                    // Display the quote text
                    const quoteText = document.getElementById('quoteText');
                    quoteText.textContent = data.quote;
                    document.getElementById('quoteContainer').style.display = 'block';

                } else if (dataType === 'books' && data.id) {
                    // Display book details
                    const bookTitle = document.getElementById('bookTitle');
                    const bookAuthor = document.getElementById('bookAuthor');
                    const bookYear = document.getElementById('bookYear');
                    const bookWikiUrl = document.getElementById('bookWikiUrl');

                    bookTitle.textContent = `Title: ${data.title}`;
                    bookAuthor.textContent = `Author(s): ${Array.isArray(data.author) ? data.author.join(', ') : data.author}`;
                    bookYear.textContent = `Year: ${data.year}`;
                    bookWikiUrl.innerHTML = `<a href="${data.wiki_url}" target="_blank">Wikipedia Link</a>`;
                    document.getElementById('bookContainer').style.display = 'block';

                } else if (dataType === 'movies' && data.id) {
                    // Display movie details
                    const movieTitle = document.getElementById('movieTitle');
                    const movieDirector = document.getElementById('movieDirector');
                    const movieYear = document.getElementById('movieYear');
                    const movieWikiUrl = document.getElementById('movieWikiUrl');

                    movieTitle.textContent = `Title: ${data.title}`;
                    movieDirector.textContent = `Director(s): ${Array.isArray(data.director) ? data.director.join(', ') : data.director}`;
                    movieYear.textContent = `Year: ${data.year}`;
                    movieWikiUrl.innerHTML = `<a href="${data.wiki_url}" target="_blank">Wikipedia Link</a>`;
                    document.getElementById('movieContainer').style.display = 'block';

                } else if (dataType === 'comics' && data.id) {
                    // Display comic details
                    const comicTitle = document.getElementById('comicTitle');
                    const comicAuthor = document.getElementById('comicAuthor');
                    const comicYear = document.getElementById('comicYear');
                    const comicIllustrator = document.getElementById('comicIllustrator');
                    const comicWikiUrl = document.getElementById('comicWikiUrl');

                    comicTitle.textContent = `Title: ${data.title}`;
                    comicAuthor.textContent = `Author(s): ${Array.isArray(data.author) ? data.author.join(', ') : data.author}`;
                    comicYear.textContent = `Year: ${data.year}`;
                    comicIllustrator.textContent = `Illustrator(s): ${Array.isArray(data.illustrator) ? data.illustrator.join(', ') : data.illustrator}`;
                    comicWikiUrl.innerHTML = `<a href="${data.wiki_url}" target="_blank">Wikipedia Link</a>`;
                    document.getElementById('comicContainer').style.display = 'block';

                } else if (dataType === 'series' && data.id) {
                    // Display series details
                    const serieTitle = document.getElementById('serieTitle');
                    const serieDirector = document.getElementById('serieDirector');
                    const serieYear = document.getElementById('serieYear');
                    const serieWikiUrl = document.getElementById('serieWikiUrl');

                    serieTitle.textContent = `Title: ${data.title}`;
                    serieDirector.textContent = `Director(s): ${Array.isArray(data.director) ? data.director.join(', ') : data.director}`;
                    serieYear.textContent = `Year: ${data.year}`;
                    serieWikiUrl.innerHTML = `<a href="${data.wiki_url}" target="_blank">Wikipedia Link</a>`;
                    document.getElementById('serieContainer').style.display = 'block';

                } else if (dataType === 'shortStories' && data.id) {
                    // Display story details
                    const shortstoryTitle = document.getElementById('shortstoryTitle');
                    const shortstoryAuthor = document.getElementById('shortstoryAuthor');
                    const shortstoryYear = document.getElementById('shortstoryYear');
                    const shortstoryWikiUrl = document.getElementById('shortstoryWikiUrl');

                    shortstoryTitle.textContent = `Title: ${data.title}`;
                    shortstoryAuthor.textContent = `Author(s): ${Array.isArray(data.author) ? data.author.join(', ') : data.author}`;
                    shortstoryYear.textContent = `Year: ${data.year}`;
                    shortstoryWikiUrl.innerHTML = `<a href="${data.wiki_url}" target="_blank">Wikipedia Link</a>`;
                    document.getElementById('storyContainer').style.display = 'block';

                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    // Add event listener for form submission
    document.getElementById('fetchDataType').addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent form submission and page refresh

        // Clear existing data and fetch data based on the selected type
        clearAllData();
        fetchDataType();
    });

    // Function to fetch data for the selected type
    function fetchDataType() {
        const selectedType = document.getElementById('filterType').value;


        if (!selectedType || selectedType === 'All Types') {
            // Fetch all data if no specific type is selected
            fetchAllData();
        } else {
            // Fetch all data for the selected type
            for (let i = 1; i <= 20; i++) {
                fetch(`${apiUrl}/${selectedType}/id/${i}`)
                    .then(response => response.json())
                    .then(data => {
                        displayData(data, selectedType);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        }
    }

    // Function to fetch all data for each type
    function fetchAllData() {
        const allDataTypes = ['quotes', 'books', 'movies', 'comics', 'series', 'shortStories'];

        allDataTypes.forEach(dataType => {
            for (let i = 1; i <= 20; i++) {
                fetch(`${apiUrl}/${dataType}/id/${i}`)
                    .then(response => response.json())
                    .then(data => {
                        displayData(data, dataType);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        });
    }

    // Function to display data based on type
    function displayData(data, dataType) {

        console.log(`Received data for ${dataType}:`, data);
        const container = document.getElementById('allDataContainer');
        const formattedData = Array.isArray(data) ? data[0] : data;

        // Check if the data has a unique identifier (e.g., id property)
        const dataText = `${dataType}-${formattedData.title || formattedData.quote}-${formattedData.year}`;

        
        // Check if the data with the same identifier has been displayed before
        if (displayedData.has(dataText)) {
            console.log(`Data with text ${dataText} already displayed. Skipping.`);
            return;
        }

        // Add the data identifier to the set
        displayedData.add(dataText);

        const dataInfo = document.createElement('p');

        // Set the text content based on data type
        if (dataType === 'quotes' && formattedData.quote) {
            dataInfo.textContent = `Quote: ${formattedData.quote}`;
        } else if (dataType === 'books' && formattedData.title) {
            dataInfo.textContent = `Book: ${formattedData.title}, Year: ${formattedData.year}`;
        } else if (dataType === 'movies' && formattedData.title) {
            dataInfo.textContent = `Movie: ${formattedData.title}, Year: ${formattedData.year}`;
        } else if (dataType === 'comics' && formattedData.title) {
            dataInfo.textContent = `Comic: ${formattedData.title}, Year: ${formattedData.year}`;
        } else if (dataType === 'series' && formattedData.title) {
            dataInfo.textContent = `Serie: ${formattedData.title}, Year: ${formattedData.year}`;
        } else if (dataType === 'shortStories' && formattedData.title) {
            dataInfo.textContent = `Short Story: ${formattedData.title}, Year: ${formattedData.year}`;
        } else {
            dataInfo.textContent = `Unknown Data Type: ${JSON.stringify(formattedData)}`;
        }

        // Append the paragraph element to the container
        container.appendChild(dataInfo);
    }

    // Function to clear all displayed data
    function clearAllData() {
        // Clear the content of the allDataContainer
        const container = document.getElementById('allDataContainer');
        container.innerHTML = '';

        // Clear the displayedData set
        displayedData.clear();
    }
});