let api="http://moviesmern.herokuapp.com/movies/all";
let container=document.getElementById("container")
let loadingGif=document.getElementById("loadingGif")

function showLoadingGif() {
    loadingGif.style.display ="block";
}
function hideLoadingGif() {
    loadingGif.style.display ="none";
}

async function getMovies() {
    try {
        showLoadingGif()
        return await fetch(api)
        .then(response => response.json())
        .then(response => response.data)
    } catch (error) {
        return error
    }
    finally{
        hideLoadingGif()
    }
}

getMovies() 
.then((info)=>{
    for (let movie of info) {
        container.innerHTML += `
        <div class="moviesInfo">
        <img src="${movie.image}"/> 
        <p>Name: ${movie.movieName}</p> 
        <p>Rating: ${movie.rating}</p>
        <button type="button" onclick="deleteMovieById('${movie._id}')">DELETE</button>
        <button type="button">LEARN MORE</button>
        </div>
        `
    }
    console.log(info);
})
.catch((rej)=>{console.log(rej);})


const sortBtn=document.getElementById("sortBtn");

async function deleteMovieById(id) {
    let options ={
        method:'DELETE'
    }
    try {
        showLoadingGif()
        return await fetch(`http://moviesmern.herokuapp.com/movies/movie/${id}`,options)
        .then(response => response.json())
    } catch (error) {
        return error
    }
    finally{
        hideLoadingGif()
    }
}

function sortByRating(info) {
    for (let movie of info.sort((a,b)=> b.rating - a.rating)) {
        container.innerHTML += `
        <div class="moviesInfo">
        <img src="${movie.image}"/> 
        <p>Name: ${movie.movieName}</p> 
        <p>Rating: ${movie.rating}</p>
        <button type="button" >DELETE</button>
        <button>LEARN MORE</button>
        </div>
        `
    }
}
function sortByDate(info) {
    for (let movie of info.sort((a,b)=> {return b.date - a.date})) {
        container.innerHTML += `
        <div class="moviesInfo">
        <img src="${movie.image}"/> 
        <p>Name: ${movie.movieName}</p> 
        <p>Rating: ${movie.rating}</p>
        <button type="button" >DELETE</button>
        <button>LEARN MORE</button>
        </div>
        `
    }
}
function sortByName(info) {
    for (let movie of info.sort((a,b)=> {return a.movieName - b.movieName})) {
        container.innerHTML += `
        <div class="moviesInfo">
        <img src="${movie.image}"/> 
        <p>Name: ${movie.movieName}</p> 
        <p>Rating: ${movie.rating}</p>
        <button type="button" >DELETE</button>
        <button type="button" onclick="">LEARN MORE</button>
        </div>
        `
    }
}

sortBtn.onclick= ()=>{
    switch (selectSort.value) {
        case "Rating":
            container.innerHTML = "";
            getMovies()
            .then(res=>{sortByRating(res)})
            break;
            case "date":
            container.innerHTML = "";
            getMovies()
            .then(res=>{sortByDate(res)})
            break;
            case "Name":
            container.innerHTML = "";
            getMovies()
            .then(res=>{sortByName(res)})
            break;
    
        default:
            break;
    }
}

async function searchMovieByInputName(movieName) {
    try {
        showLoadingGif()
        return await fetch(`http://moviesmern.herokuapp.com/movies/movie/searchByName/${movieName}`)
        .then(response => response.json())
        .then(response => response.data)
    } catch (error) {
        return error
    }
    finally{
        hideLoadingGif()
    }
}

let nameInput=document.getElementById("nameInput")

nameInput.oninput=()=>{
    searchMovieByInputName(nameInput.value)
    .then(response => getMovies(response))
}
