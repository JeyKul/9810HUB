document.addEventListener('DOMContentLoaded', function () {
    // Load JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(data => buildContent(data));
});

function buildContent(data) {
    const contentContainer = document.getElementById('content');

    data.forEach(item => {
        const tr = document.createElement('td');
        const td = document.createElement('td');
        const card = document.createElement('a'); // Use an anchor element
        card.classList.add('card');
        card.href = item.link; // Set the link for the entire card

        const image = document.createElement('img');
        image.classList.add('card-image');
        image.src = item.image;
        image.alt = item.text;

        const link = document.createElement('div'); // Use a div for the link text
        link.classList.add('card-link');
        link.textContent = item.text;

        card.appendChild(image);
        card.appendChild(link);

        contentContainer.appendChild(card);
    });
}