const projects ={
    maze: "https://tschlief.github.io/maze/",
    blog: "https://blog-tschlief.onrender.com/",
    coinMelon: "https://coinmellon.onrender.com/", 
    fishing: "https://fishing-app-5f81538c1348.herokuapp.com/"
};

let keys = Object.keys(projects);
for(i = 0; i < keys.length; i++) {
    let key = keys[i]
    document.getElementById(keys[i]).addEventListener("click", ()=>{
        console.log(projects[keys[i]]);
        window.open(projects[key], '_blank');
    });
}