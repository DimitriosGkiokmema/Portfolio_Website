    var container = document.getElementById("projects");
    loadData();

    class Project {
        constructor(title, description, img, link) {
            this.title = title;
            this.description = description;
            this.img = img;
            this. link = link;

            this.createCard();
        }

        createCard() {
            var work = document.createElement("div");
            work.className = "work";
            var image = document.createElement("img");
            image.src = this.img;
            var layer = document.createElement("div");
            layer.className = "layer";
            var name = document.createElement("h3");
            name.textContent = this.title;
            var content = document.createElement("p");
            content.textContent = this.description;
            var extLink = document.createElement("a")

            if (this.link == "CSC316") {
                extLink.href = "https://gitfront.io/r/dimi/vmp8rGamzort/CSC316-Assignments/";
            } else {
                extLink.href = "https://github.com/DimitriosGkiokmema/" + this.link;
            }

            var icon = document.createElement("i");
            icon.className = "fa-solid fa-up-right-from-square"

            extLink.appendChild(icon);
            layer.appendChild(name);
            layer.appendChild(content);
            layer.appendChild(extLink);
            work.appendChild(image);
            work.appendChild(layer);
            container.appendChild(work);
        }
    }

    function loadData() {
        // Creating elements
        d3.csv("data/projects.csv", row => {
            new Project(row.title, row.description, row.img, row.link)
        })
    }