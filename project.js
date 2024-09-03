class Project {
    constructor(title, description, images, details) {
        this.title = title;
        this.description = description;
        this.images = images;
        this.details = details;
    }

    createProjectElement() {
        var a = document.createElement('a');
        a.href = 'project_page.html?id=' + codeURL(this.title);
        a.className = 'project';
        a.style.color = 'inherit'; // This will make the text color the same as the parent element
        a.style.textDecoration = 'none'; // This will remove the underline

        const imgDiv = document.createElement('div');
        imgDiv.className = 'project-image';
        const img = document.createElement('img');
        img.src = this.images[0];
        imgDiv.appendChild(img);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'project-info';

        const proj_title = document.createElement('h3');
        proj_title.className = 'project-title';
        proj_title.textContent = this.title;

        const descrpt = document.createElement('p');
        descrpt.className = 'project-description';
        descrpt.textContent = this.description;

        const proj_details = document.createElement('div');
        proj_details.className = 'project-details'
        const detailOne = document.createElement('p');
        detailOne.textContent = this.details[0]
        const detailTwo = document.createElement('p');
        detailTwo.textContent = this.details[1]
        const detailThree = document.createElement('p');
        detailThree.textContent = this.details[2]
        proj_details.appendChild(detailOne)
        proj_details.appendChild(detailTwo)
        proj_details.appendChild(detailThree)

        infoDiv.appendChild(proj_title);
        infoDiv.appendChild(document.createElement('br'))
        infoDiv.appendChild(descrpt);
        infoDiv.appendChild(document.createElement('hr'))
        infoDiv.appendChild(proj_details);

        a.appendChild(imgDiv);
        a.appendChild(infoDiv);
        
        return a;
    }

    projPage() {
        this.createTitle();
        this.createImages();
        this.createDescription('project_description', this.title);
        this.createDescription('project_challenges', this.title + ' Challenges');
        this.createDescription('project_learnt', this.title + ' Takeaways');
    }

    createTitle() {
        // Creates project title
        const container = document.getElementById('project_name');
        const heading = document.createElement('h1');
        heading.textContent = this.title;
        container.appendChild(heading);
    }

    createImages() {
        // Displays images of the project, arrows can change between images
        const container = document.getElementById('project_images');
        const slideshow = document.createElement('div');
        slideshow.className = 'slideshow'
        let img_index = 0;

        // Add Images
        var curr_img = document.createElement('img');
        curr_img.id = 'slide'
        curr_img.src = this.images[img_index];
        slideshow.appendChild(curr_img);

        // Left Arrow
        const left_arrow = document.createElement('button');
        left_arrow.appendChild(document.createTextNode('<'));
        left_arrow.className = 'arrow';
        left_arrow.id = 'leftArrow';
        left_arrow.addEventListener('click', () => {
            img_index = this.switchImg(-1, img_index);
            curr_img.src = this.images[img_index];
        });
        slideshow.appendChild(left_arrow);

        // Right Arrow
        const right_arrow = document.createElement('button');
        right_arrow.appendChild(document.createTextNode('>'));
        right_arrow.className = 'arrow';
        right_arrow.id = 'rightArrow';
        right_arrow.addEventListener('click', () => {
            img_index = this.switchImg(1, img_index);
            curr_img.src = this.images[img_index];
        });
        slideshow.appendChild(right_arrow);

        container.appendChild(slideshow);
    }

    switchImg(num, img_index) {
        img_index += num;

        if (img_index < 0) {
            img_index = this.images.length - 1;
        }
        else if (img_index >= this.images.length) {
            img_index = 0;
        }

        return img_index;
    }

    createDescription(container, keyword) {
        var request = new XMLHttpRequest(); // Create a new XMLHttpRequest
        request.open('GET', 'project_descriptions.txt', true); // Open the file

        // When the request loads, process the file
        request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            // Success! File is found and can be loaded
            var lines = request.responseText.split('\n'); // split the text into lines

            if (this.title == keyword) {
                var displayArea = document.getElementById(container);

                const git = document.createElement('a');
                git.href = 'https://github.com/DimitriosGkiokmema/' + GIT_LINKS[this.title];                
                git.textContent = 'GitHub Link';
                git.style.display = 'block';
                git.style.textAlign = "center";
                git.target = '_blank';

                const paragraph = document.createElement('p');
                paragraph.appendChild(git);
                paragraph.textContent = this.readDescription(lines, keyword);

                displayArea.appendChild(git);
                displayArea.appendChild(paragraph);
            }
            else if (keyword.includes('Challenges')) {
                var displayArea = document.getElementById(container);
                const challenges = document.createElement('h2');
                challenges.textContent = 'Challenges';
                challenges.style.textAlign = 'center';
                var list = document.createElement('ul');
                const listContents = this.readChallenges(lines, keyword);

                listContents.forEach((element) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = element;
                    list.appendChild(listItem);
                });

                displayArea.appendChild(challenges);
                displayArea.appendChild(list);
            }
            else if (keyword.includes('Takeaways')) {
                var displayArea = document.getElementById(container);
                const takeaways = document.createElement('h2');
                takeaways.textContent = 'Takeaways'
                takeaways.style.textAlign = 'center';
                var list = document.createElement('ul');
                const listContents = this.readChallenges(lines, keyword);

                listContents.forEach((element) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = element;
                    list.appendChild(listItem);
                });

                displayArea.appendChild(takeaways);
                displayArea.appendChild(list);
            }
        } else {
            // Error - file not found
            displayArea.textContent = 'File not found or there was an error loading it.';
        }
        };

        // Send the request
        request.send();
    }

    readDescription(lines, keyword) {
        var output = '';
        var found_keyword = false;

        for (var i = 0; i < lines.length; i++) { // Checks if keyword found (includes line) else moves on
            lines[i] = lines[i].trim();

            if (lines[i] == keyword) {
                found_keyword = true;
            }
            else if (found_keyword && lines[i] == '') {
                break;
            }
            else if (found_keyword) {
                output += lines[i] + '\n';
            }
        }
        
        return output;
    }

    readChallenges(lines, keyword) {
        var output = [];
        var found_keyword = false;

        for (var i = 0; i < lines.length; i++) { // Checks if keyword found (includes line) else moves on
            lines[i] = lines[i].trim();

            if (lines[i] == keyword) {
                found_keyword = true;
            }
            else if (found_keyword && lines[i] == '') {
                break;
            }
            else if (found_keyword) {
                output.push(lines[i]);
            }
        }
        
        return output;
    }
}

function get_all_projects() {
    let pong_pics = ['Images/pong_main.png', 'Images/pong_in_game.png', 'Images/pong_victory.png']
    let pong_descrpt = "Followed online tutorials to recreate Pong, an old and simple arcade game. To make it more interesting, I added the option to play against AI."
    let pong_details = ['Game', 'lua', 'August 2024']
    let projects = [new Project('Pong', pong_descrpt, pong_pics, pong_details)]

    let olympic_pics = ['Images/olympics_main_menu.png', 'Images/olympics_historical.png', 'Images/olympics_participation.png', 'Images/olympics_rank.png', 'Images/olympics_plot.png']
    let olympic_dscrpt = "Analyzed various datasets concerning the Olympics and presented the results in an interactive app-like program. The datasets we used included data on past Olympic scores and country codes. Using these two datasets, I and my teamates were able to create an app-like program and displayed our results through graphs. Users were able to choose between diferent calculations, inputed host and away countries as well as year range, and the results were presented to the users through bar and line graphs"
    let olympic_details = ['App', 'Python', 'April 2024']
    projects.push(new Project('Interactive Display of Olympic Data', olympic_dscrpt, olympic_pics, olympic_details))

    let tile_pics = ['Images/tile_website.png', 'Images/website_gallery.png']
    let tile_descrpt = "A professional website for an independent contractor to expand his business. His main want for a website was to display his work, so I made a photo gallery in the website that showcases all his best work."
    let tile_details = ['Website', 'HTML, CSS, JS, Python', 'June 2024']
    projects.push(new Project('Business Website', tile_descrpt, tile_pics, tile_details))

    let text_pics = ['Images/text_game.png', 'Images/text_game_menu.png', 'Images/text_game_win.png']
    let text_descrpt = "Developed a UofT text game. Functions as a dungeon crawl, in which the user must explore locations and collect lost items to win the game"
    let text_details = ['Game', 'Python', 'February 2024']
    projects.push(new Project('Dungeon Crawl Game', text_descrpt, text_pics, text_details))

    return projects
}

function codeURL(title) {
    /* Given a string, this function replaces all whitespace with _
    Hello There -> Hello_There
    Also works vice versa!
    */
   var newTitle = ''
   for (let i = 0; i < title.length; i++) {
        if (title[i] == ' ') {
            newTitle += '_';
        }
        else if (title[i] == '_') {
            newTitle += ' ';
        }
        else {
            newTitle += title[i];
        }
   }
   return newTitle
}

function getTextBetweenKeywords(content, keyword) {
    const lines = content.split('\n');
    let result = '';
    let found = false;
  
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === keyword) {
        found = true;
        continue;
      }
      if (found && lines[i].trim() !== '' && lines[i].trim().charAt(0) !== '\n' && lines[i].trim().charAt(0).match(/[a-zA-Z]/)) {
        return result.trim();
      }
      if (found) {
        result += lines[i] + '\n';
      }
    }
  
    return result.trim(); // return trimmed result to remove any leading/trailing spaces or new lines
  }

function typeAnimation(){
    function typePhrase() {
        if(i >= phrases.length) {
            i = 0;
        }

        var phrase = phrases[i];
        var j = 0;
        var interval = setInterval(function() {
            div.textContent += phrase[j];
            j++;
            if(j == phrase.length) {
                clearInterval(interval);
                i++;
                setTimeout(deletePhrase, 2000); // Wait for 2 seconds before deleting
            }
        }, 150); // Speed of typing each character
    }

    function deletePhrase() {
        var phrase = div.textContent;
        var k = 0;
        var interval = setInterval(function() {
            phrase = phrase.slice(0, -1);
            div.textContent = phrase;
            k++;
            if(k == phrase.length) {
                clearInterval(interval);
                setTimeout(typePhrase, 2000); // Wait for 2 seconds before typing next phrase
            }
        }, 150); // Speed of deleting each character
    }

    var phrases = ['Undergrad', 'gamer', 'student']; // Add more phrases if you want
    var i = 0;
    var div = document.getElementById('typewriter');
    

    typePhrase(); // Start the typing
}

const GIT_LINKS = {}; // Create an empty dictionary
GIT_LINKS['Interactive Display of Olympic Data'] = 'Project_Two_Olympics';
GIT_LINKS['Business Website'] = 'Extra-Miles-Website';
GIT_LINKS['Dungeon Crawl Game'] = 'Project-One';
GIT_LINKS['Pong'] = 'Pong';

// Project page
if(document.getElementById('projects-container') != null){
    // Get the container where you want to add the projects
    const container = document.getElementById('projects-container');

    // Create an array of projects
    const projects = get_all_projects();

    // Loop through the array of projects
    projects.forEach(project => {
        // Create a section for each project
        const projectElement = project.createProjectElement();
        
        // Add the project section to the container
        container.appendChild(projectElement);
    });
}
else if(document.getElementById('typewriter') != null) {
    //typeAnimation();
}
else if(document.getElementById('project-page') != null) {
    // Get the container where you want to add the projects
    const container = document.getElementById('project-page');

    // Create an array of projects
    const projects = get_all_projects();

    // Gets name of button clicked in url
    const urlParams = new URLSearchParams(window.location.search);
    var project = codeURL(urlParams.get('id')); // This will give you the button title

    // Loop through the array of projects
    projects.forEach(p => {
        if (p.title == project) {
            project = p;
        }
    });

    project.projPage();
}
