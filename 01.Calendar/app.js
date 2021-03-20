const monthNames = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sep': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12,
};


const yearSelect = document.getElementById('years');


const years = [...document.querySelectorAll('.monthCalendar')].reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
}, {});

const months = [...document.querySelectorAll('.daysCalendar')].reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
}, {});

function displaySection(section) {
    document.body.innerHTML = '';
    document.body.appendChild(section);
}

displaySection(yearSelect);

yearSelect.addEventListener('click', (e) => {
    if (e.target.classList.contains('date') || e.target.classList.contains('day')) {
        e.stopImmediatePropagation();
        const yearId = `year-${e.target.textContent.trim()}`;
        displaySection(years[yearId]);
   }
});

document.body.addEventListener('click', (e) => {
    if (e.target.tagName == 'CAPTION') {
        const sectionId = e.target.parentNode.parentNode.id;
        if (sectionId.includes('year-')) {
            displaySection(yearSelect);
        } else if (sectionId.includes('month-')) {
            const yearId = `year-${sectionId.split('-')[1]}`;
            displaySection(years[yearId]);
        }
    } else if (e.target.tagName == 'TD' || e.target.tagName == 'DIV') {
        const monthName = e.target.textContent.trim();
        if (monthNames.hasOwnProperty(monthName)) {
            let parent = e.target.parentNode;
            while (parent.tagName != 'TABLE') {
                parent = parent.parentNode;
            }
            const year = parent.querySelector('caption').textContent.trim();
            const monthId = `month-${year}-${monthNames[monthName]}`;
            displaySection(months[monthId]);
        }
    }
});