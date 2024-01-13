const parent = document.getElementById('nav-items');

const sections = ["top", "home", "about", "skills", "projects"];

let html = "";

for(let i = 0; i < sections.length; i++) {
    html += `
        <li class="nav-item">
            <a class="nav-link" id=${"nav-" + sections[i]} href=#${sections[i]} target="_none">${sections[i]}</a>
        </li>
    `;
}
parent.innerHTML = html;

for(let i = 0; i < sections.length; i++) {
    const element = document.getElementById(`nav-${sections[i]}`);
    element.addEventListener("click", (e)=> {
        e.preventDefault();

        const sectionElement = document.getElementById(sections[i]);
    
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth" });
          
          const fragment = `#${sections[i]}`;
          history.pushState(null, null, fragment);
        }
      
    });
}