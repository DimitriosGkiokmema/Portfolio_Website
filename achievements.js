function populatePage() {
    fetch('achievements.csv')
    .then(response => response.text())
    .then(text => {
        const rows = text.split('\n');
        const file = rows.map(row => row.split(','));

        var pageSection = file[0][0]
        var jobTitle = file[0][1]
        var displayArea = document.getElementById(pageSection);

        file.forEach((line) => {
            var list = document.createElement('ul');
            var listItem = document.createElement('li');

            // Checks if at new page section / job title
            if (line[0] != '' && line[1] != '') {
                // Update variables
                console.log('new Subsection: ' + line[0])
                pageSection = line[0];
                jobTitle = line[1];
                displayArea = document.getElementById(pageSection);

                // Add position name to page
                const position = document.createElement('h2');
                position.textContent = line[1];
                displayArea.appendChild(position);
            }
            else if (line[1] != '') {
                console.log('new title: ' + line[1]);
                
                // Add position name to page
                const position = document.createElement('h2');
                position.textContent = line[1];
                displayArea.appendChild(position);

                jobTitle = line[1];
            }
            
            // Add bullet point to list
            if (line[2]) {
                listItem.textContent = line[2];
                list.appendChild(listItem);
                displayArea.appendChild(list);
            }
        });
    })
}

populatePage();