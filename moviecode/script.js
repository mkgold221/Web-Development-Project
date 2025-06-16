
document.addEventListener('DOMContentLoaded', function() {
    // API Configuration
    const API_KEY = '6b5df2d9501a58c786769239c6d7e272'; // → Only use temporarily for testing!'; // Replace with your actual TMDB API key
    const BASE_URL = 'https://api.themoviedb.org/3';
    const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
    const BACKDROP_PATH = 'https://image.tmdb.org/t/p/original';
    
    // DOM Elements
    const navLinks = document.querySelectorAll('.nav-links a');
    const contentSections = document.querySelectorAll('.content-section');
    const themeToggle = document.getElementById('theme-toggle');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const heroSearchInput = document.getElementById('hero-search-input');
    const heroSearchBtn = document.getElementById('hero-search-btn');
    const loadMoreBtns = document.querySelectorAll('.load-more');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.nav-links');
    const modal = document.getElementById('movie-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');
    
    // State
    let currentPage = {
        popular: 1,
        search: 1
    };
    let currentSearchTerm = '';
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Initialize
    checkTheme();
    fetchMovies('trending', `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    fetchMovies('popular', `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`);
    fetchMovies('upcoming', `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
    renderFavorites();
    
    // Event Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            showSection(section);
            
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
        });
    });
    
    themeToggle.addEventListener('click', toggleTheme);
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    
    heroSearchBtn.addEventListener('click', performHeroSearch);
    heroSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performHeroSearch();
    });
    
    loadMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            currentPage[type]++;
            
            if (type === 'popular') {
                fetchMovies('popular', `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${currentPage.popular}`);
            } else if (type === 'search') {
                fetchMovies('search', `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${currentSearchTerm}&page=${currentPage.search}`);
            }
        });
    });
    
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Carousel buttons
    document.querySelectorAll('.carousel-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const direction = btn.classList.contains('prev') ? -1 : 1;
            const carousel = btn.getAttribute('data-carousel');
            const container = document.querySelector(`.${carousel}-movies`);
            const scrollAmount = container.clientWidth * 0.8;
            
            container.scrollBy({
                left: scrollAmount * direction,
                behavior: 'smooth'
            });
        });
    });
    
    // Functions
    function showSection(section) {
        // Hide all sections
        contentSections.forEach(sec => {
            sec.classList.remove('active');
        });
        
        // Show selected section
        document.getElementById(section).classList.add('active');
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === section) {
                link.classList.add('active');
            }
        });
        
        // Special case for search results
        if (section === 'search-results') {
            document.getElementById('search-results').classList.add('active');
        }
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    function checkTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            currentSearchTerm = searchTerm;
            currentPage.search = 1;
            fetchMovies('search', `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
            showSection('search-results');
            searchInput.value = '';
        }
    }
    
    function performHeroSearch() {
        const searchTerm = heroSearchInput.value.trim();
        if (searchTerm) {
            currentSearchTerm = searchTerm;
            currentPage.search = 1;
            fetchMovies('search', `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
            showSection('search-results');
            heroSearchInput.value = '';
        }
    }
    
    async function fetchMovies(type, url) {
        try {
            // Show loading state
            const container = document.querySelector(`.${type}-movies`);
            if (currentPage[type] === 1) {
                container.innerHTML = '<div class="loading">Loading...</div>';
            }
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                displayMovies(type, data.results);
            } else {
                container.innerHTML = '<div class="empty-state">No movies found</div>';
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            document.querySelector(`.${type}-movies`).innerHTML = '<div class="empty-state">Error loading movies. Please try again.</div>';
        }
    }
    
    function displayMovies(type, movies) {
        const container = document.querySelector(`.${type}-movies`);
        
        // Only clear container if it's the first page
        if (currentPage[type] === 1) {
            container.innerHTML = '';
        }
        
        movies.forEach(movie => {
            if (!movie.poster_path) return; // Skip movies without posters
            
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.setAttribute('data-id', movie.id);
            
            const isFavorited = favorites.includes(movie.id.toString());
            
            movieCard.innerHTML = `
                <img src="${IMG_PATH}${movie.poster_path}" alt="${movie.title}" class="movie-poster">
                <div class="movie-info">
                    <h4 class="movie-title">${movie.title}</h4>
                    <div class="movie-details">
                        <span>${movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</span>
                        <span><i class="fas fa-star"></i> ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                    </div>
                </div>
                <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" data-id="${movie.id}">
                    <i class="fas fa-bookmark"></i>
                </button>
            `;
            
            container.appendChild(movieCard);
        });
        
        // Add event listeners to new movie cards and favorite buttons
        document.querySelectorAll('.movie-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't open movie details if clicking on favorite button
                if (!e.target.closest('.favorite-btn')) {
                    const movieId = card.getAttribute('data-id');
                    showMovieDetails(movieId);
                }
            });
        });
        
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(btn);
            });
        });
    }
    
    async function showMovieDetails(movieId) {
        try {
            // Fetch movie details
            const movieResponse = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
            const movie = await movieResponse.json();
            
            // Fetch movie credits
            const creditsResponse = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
            const credits = await creditsResponse.json();
            
            // Fetch movie videos (for trailer)
            const videosResponse = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
            const videos = await videosResponse.json();
            
            // Prepare modal content
            let modalHTML = `
                <div class="movie-header">
                    <img src="${movie.poster_path ? IMG_PATH + movie.poster_path : 'https://via.placeholder.com/300x450?text=No+Poster'}" alt="${movie.title}" class="movie-poster-large">
                    <div class="movie-meta">
                        <h2 class="movie-title-large">${movie.title}</h2>
                        ${movie.tagline ? `<p class="movie-tagline">${movie.tagline}</p>` : ''}
                        
                        <div class="movie-details-large">
                            ${movie.release_date ? `<div class="movie-detail"><i class="fas fa-calendar-alt"></i> ${movie.release_date}</div>` : ''}
                            ${movie.runtime ? `<div class="movie-detail"><i class="fas fa-clock"></i> ${movie.runtime} min</div>` : ''}
                            <div class="movie-detail"><i class="fas fa-star"></i> ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10</div>
                            ${movie.status ? `<div class="movie-detail"><i class="fas fa-info-circle"></i> ${movie.status}</div>` : ''}
                        </div>
                        
                        ${movie.genres && movie.genres.length > 0 ? `
                            <div class="movie-genres">
                                ${movie.genres.map(genre => `<span class="genre">${genre.name}</span>`).join('')}
                            </div>
                        ` : ''}
                        
                        <h4>Overview</h4>
                        <p class="movie-overview">${movie.overview || 'No overview available.'}</p>
                        
                        <button class="favorite-btn-lg ${favorites.includes(movieId.toString()) ? 'favorited' : ''}" data-id="${movieId}">
                            <i class="fas fa-bookmark"></i> ${favorites.includes(movieId.toString()) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        </button>
                    </div>
                </div>
            `;
            
            // Add cast section if available
            if (credits.cast && credits.cast.length > 0) {
                const topCast = credits.cast.slice(0, 10);
                modalHTML += `
                    <div class="movie-cast">
                        <h3 class="cast-title">Top Cast</h3>
                        <div class="cast-container">
                            ${topCast.map(person => `
                                <div class="cast-member">
                                    <img src="${person.profile_path ? IMG_PATH + person.profile_path : 'https://via.placeholder.com/120x180?text=No+Image'}" alt="${person.name}" class="cast-photo">
                                    <p class="cast-name">${person.name}</p>
                                    <p class="cast-character">${person.character}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
            
            // Add trailer section if available
            const trailer = videos.results.find(video => video.type === 'Trailer');
            if (trailer) {
                modalHTML += `
                    <div class="trailer-container">
                        <h3 class="trailer-title">Trailer</h3>
                        <iframe width="100%" height="450" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                `;
            } else {
                modalHTML += `
                    <div class="trailer-container">
                        <h3 class="trailer-title">Trailer</h3>
                        <div class="trailer-placeholder">
                            <p>No trailer available</p>
                        </div>
                    </div>
                `;
            }
            
            // Set modal content and show
            modalBody.innerHTML = modalHTML;
            modal.style.display = 'block';
            
            // Add event listener to modal favorite button
            const modalFavoriteBtn = document.querySelector('.favorite-btn-lg');
            if (modalFavoriteBtn) {
                modalFavoriteBtn.addEventListener('click', () => {
                    toggleFavorite(modalFavoriteBtn);
                    // Update the button text
                    const movieId = modalFavoriteBtn.getAttribute('data-id');
                    const isFavorited = favorites.includes(movieId.toString());
                    modalFavoriteBtn.innerHTML = `<i class="fas fa-bookmark"></i> ${isFavorited ? 'Remove from Watchlist' : 'Add to Watchlist'}`;
                    modalFavoriteBtn.classList.toggle('favorited', isFavorited);
                });
            }
            
            // Scroll to top of modal
            modal.scrollTo(0, 0);
        } catch (error) {
            console.error('Error fetching movie details:', error);
            modalBody.innerHTML = '<div class="empty-state">Error loading movie details. Please try again.</div>';
            modal.style.display = 'block';
        }
    }
    
    function toggleFavorite(button) {
        const movieId = button.getAttribute('data-id');
        const index = favorites.indexOf(movieId.toString());
        
        if (index === -1) {
            // Add to favorites
            favorites.push(movieId.toString());
            button.classList.add('favorited');
        } else {
            // Remove from favorites
            favorites.splice(index, 1);
            button.classList.remove('favorited');
        }
        
        // Update localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        // Update favorites section if visible
        if (document.getElementById('favorites').classList.contains('active')) {
            renderFavorites();
        }
    }
    
    async function renderFavorites() {
        const container = document.querySelector('.favorites-movies');
        
        if (favorites.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bookmark"></i>
                    <p>Your watchlist is empty. Start adding movies!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = '<div class="loading">Loading your watchlist...</div>';
        
        try {
            // Fetch details for all favorite movies
            const moviePromises = favorites.map(movieId => 
                fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`).then(res => res.json())
            );
            
            const movies = await Promise.all(moviePromises);
            
            // Filter out movies that might not exist anymore
            const validMovies = movies.filter(movie => movie.id);
            
            if (validMovies.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-bookmark"></i>
                        <p>Your watchlist is empty. Start adding movies!</p>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = '';
            
            validMovies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.className = 'movie-card';
                movieCard.setAttribute('data-id', movie.id);
                
                movieCard.innerHTML = `
                    <img src="${movie.poster_path ? IMG_PATH + movie.poster_path : 'https://via.placeholder.com/500x750?text=No+Poster'}" alt="${movie.title}" class="movie-poster">
                    <div class="movie-info">
                        <h4 class="movie-title">${movie.title}</h4>
                        <div class="movie-details">
                            <span>${movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</span>
                            <span><i class="fas fa-star"></i> ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                        </div>
                    </div>
                    <button class="favorite-btn favorited" data-id="${movie.id}">
                        <i class="fas fa-bookmark"></i>
                    </button>
                `;
                
                container.appendChild(movieCard);
            });
            
            // Add event listeners to favorite cards
            document.querySelectorAll('.favorites-movies .movie-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.favorite-btn')) {
                        const movieId = card.getAttribute('data-id');
                        showMovieDetails(movieId);
                    }
                });
            });
            
            document.querySelectorAll('.favorites-movies .favorite-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleFavorite(btn);
                });
            });
        } catch (error) {
            console.error('Error loading favorites:', error);
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Error loading your watchlist. Please try again.</p>
                </div>
            `;
        }
    }
});