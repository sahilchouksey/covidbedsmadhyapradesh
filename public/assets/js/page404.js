document.addEventListener('DOMContentLoaded', () => {
    // ELEMENTS
    const goBackButton = document.querySelector('.goBackButton');
    const tryAgainButton = document.querySelector('.try-againt-btn');

    // EVENTS
    goBackButton.addEventListener('click', () => {
        window.history.back();
    })

    tryAgainButton.addEventListener('click', () => {
        window.location.reload();
    })

});
