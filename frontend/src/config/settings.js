
// "dev" = development mode
// "prod" = production mode
const mode = "dev";

let url = "";
if (mode == "prod") {
   url = "https://dtu-master-thesis-tir.herokuapp.com/"
} else {
   url = "http://localhost:3030/"
}

export default url;
