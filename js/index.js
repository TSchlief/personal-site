const projects ={
    solar: "https://travisschlief-solar.surge.sh",
    maze: "https://tschlief.github.io/maze/",
    blog: "https://blog-tschlief.onrender.com/"
};

let keys = Object.keys(projects);
for(i = 0; i < keys.length; i++) {
    let key = keys[i]
    document.getElementById(keys[i]).addEventListener("click", ()=>{
        console.log(projects[keys[i]]);
        window.location.href = projects[key];
    });
}