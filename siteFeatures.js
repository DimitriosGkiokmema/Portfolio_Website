function createFooter() {
    const container = document.getElementById('siteFooter');
    container.className = 'siteButtons';

    // home
    const home = document.createElement('a');
    home.href = 'index.html';
    home.textContent = 'home';
    home.className = 'siteButton';

    // project page
    const project_page = document.createElement('a');
    project_page.href = 'project_search.html';
    project_page.textContent = 'search';
    project_page.className = 'siteButton';

    // achievements page
    const achievements = document.createElement('a');
    achievements.href = 'achievements.html';
    achievements.textContent = 'achievements';
    achievements.className = 'siteButton';

    // bio page
    const bio = document.createElement('a');
    bio.href = 'bio.html';
    bio.textContent = 'bio';
    bio.className = 'siteButton';    

    const siteURL = window.location.href;
    if (!siteURL.includes('index.html')) {
        container.appendChild(home);
    }
    if (!siteURL.includes('project_search.html')) {
        container.appendChild(project_page);
    }
    if (!siteURL.includes('achievements.html')) {
        container.appendChild(achievements);
    }
    if (!siteURL.includes('bio.html')) {
        container.appendChild(bio);
    }
}

function getText(file) {
    return fetch(file)
        .then(response => response.text())
        .then(text => {
            return text.split('\n').join(' ');
    });
}

function createSkills() {
    fetch('skills.csv')
    .then(response => response.text())
    .then(text => {
        const rows = text.split('\n');
        const file = rows.map(row => row.split(','));
        var displayArea = document.getElementById('skillsSection');

        file.forEach((line) => {
            var list = document.createElement('ul');
            list.classList = 'skillList';

            line.forEach((skill) => {
                if (skill != '') {
                    var listItem = document.createElement('li');
                    listItem.textContent = skill;
                    list.appendChild(listItem);
                }
            });

            displayArea.appendChild(list);
        });
    })
}

if (document.getElementById('siteFooter') != null) {
    createFooter();
}
if (document.getElementById('skillsSection') != null) {
    createSkills();
}
