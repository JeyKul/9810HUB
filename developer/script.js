document.addEventListener('DOMContentLoaded', function () {
    const bubblesContainer = document.getElementById('bubbles-container');

    // Function to create a bubble
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.width = '50px';
        bubble.style.height = '50px';
        bubble.style.top = Math.random() * 100 + 'vh';
        bubble.style.animationDuration = Math.random() * 6 + 5 + 's';
        bubblesContainer.appendChild(bubble);

        // Add colorize class to change color dynamically
        setTimeout(() => {
            bubble.classList.add('colorize');
        }, 500);

        // Remove the bubble after animation completes
        bubble.addEventListener('animationend', function () {
            bubble.remove();
        });
    }

    // Create bubbles at regular intervals
    setInterval(createBubble, 300);
});
