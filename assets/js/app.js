$('.btn-search').on('click', function() {
    $.ajax({

        url : 'https://www.omdbapi.com/?apikey=79ac4b70&s=' + $('.input-keyword').val(),
        success : (response) => {
           
            const moviesData = response.Search;
            let cards = '';
            moviesData.forEach(movieData => {
                cards += showMovieCard(movieData)
            });
    
            $('.movie-container').html(cards);
    
    
            $('.movie-detail-btn').on('click', function() {
               $.ajax({
                    url : 'https://www.omdbapi.com/?apikey=79ac4b70&i=' + $(this).data('imdbid'),
                    success : (moviesData) => {
                    
                        const movieModal = showMovieModal(moviesData);
    
                        $('.modal-body').html(movieModal);
                    },
                    error : (error) => {
                        console.log(error.responseText)
                    }
               });
            });
        },
    
    
        error : (error) => {
            console.log(error.responseText)
        }
    
       
    });
});


function showMovieCard(movieData) {
     return `

           <div class="col-md-4 col-sm-6 g-3">
                <div class="card shadow">
                    <img src=${movieData.Poster} class="card-img-top poster-img">
                        <div class="card-body">
                            <h5 class="card-title">${movieData.Year}</h5>
                            <p class="card-text">
                                ${movieData.Type}
                            </p>
                            <a 
                                href="#" 
                                class="btn btn-primary movie-detail-btn shadow-sm" 
                                data-bs-toggle="modal" 
                                data-bs-target="#showModal"
                                data-imdbid = ${movieData.imdbID}
                            >
                            See Details
                            </a>
                        </div>
                </div>
             </div>`;
}

function showMovieModal(movieData) {

    return `
               <div class="container-fluid">
                    <div class="row align-item-starts gy-4">
                        <div class="col-md-3">
                            <img src=${movieData.Poster} class="img-fluid p-0 poster-img-modal">
                        </div>
                        <div class="col-md movie-detail">
                            <ul class="list-group">
                                <li class="list-group-item">${movieData.Title} ${movieData.Year}</li>
                                <li class="list-group-item"><strong>Director : </strong>${movieData.Director}</li>
                                <li class="list-group-item"><strong>Actors : </strong>${movieData.Actors}</li>
                                <li class="list-group-item"><strong>Writer : </strong>${movieData.Writer}</li>
                                <li class="list-group-item"><strong>Plot : </strong>${movieData.Plot}</li>
                            </ul>
                        </div>
                    </div>
                 </div>`;
}