let api = "http://moviesmern.herokuapp.com/movies/all";
const moviesTable = document.getElementById("moviesTable");
async function getAllMovies() {
  try {
    return await fetch(api).then((response) => response.json());
  } catch (error) {
    return error;
  }
}
getAllMovies().then((res) => {
  for (let movie of res.data) {
    moviesTable.innerHTML += `
            
            <td>${movie._id}</td>
             <td>${movie.movieName}</td>
             <td><img class="tableImg" src="${movie.image}"></td>
             <td>${movie.synopsis}</td>
             <td>${movie.linkToMovie}</td>
             <td>${movie.rating}</td> 
             
         `;
  }
});
