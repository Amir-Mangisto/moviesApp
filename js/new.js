let movieNameInput=document.getElementById("movieNameInput");
let movieImageInput=document.getElementById("movieImageInput");
let synopsisInput=document.getElementById("synopsisInput");
let linkToMovieInput=document.getElementById("linkToMovieInput");
let ratingInput=document.getElementById("ratingInput");
let addMovieForm=document.getElementById("addMovieForm");

class Movie{
    movieName;
    image;
    synopsis;
    linkToMovie;
    rating
    constructor(movieName,image,synopsis,linkToMovie,rating){
        this.movieName=movieName;
        this.image=image;
        this.synopsis=synopsis;
        this.linkToMovie=linkToMovie;
        this.rating=rating;
    }
}

addMovieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let movie=new Movie(movieNameInput.value,movieImageInput.value,synopsisInput.value,linkToMovieInput.value,ratingInput.value);

    let options = {
        method: 'POST',
        body: JSON.stringify({movie}),
        headers:{
         'Content-Type':'application/json'
        }
    }
    
    let postUrl = 'https://moviesmern.herokuapp.com/movies/saveMovie';                                                 
    
    let sendDataToApi = async () => {
        try{
            return await fetch(postUrl,options)
             .then(res => res.json())
        }
        catch(err){
            return err;
        }
    }

    sendDataToApi()
     .then(data => console.log(data));

})