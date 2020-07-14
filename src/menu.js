const Menu = {
    setMenuButtons(game) {
        const easyButton = document.getElementById('easy-button');
        const aboutButton = document.getElementById('how-to-play-button');
        const closeAboutButton = document.getElementById('close-how-to-play');

        const openAbout = (e) => {
            const aboutScreen = document.getElementsByClassName('how-to-play-container')[0];
            if (aboutScreen.className.indexOf('how-to-play-open') !== -1) {
                aboutScreen.className = 'how-to-play-container group';
                game.unpause();
            } else {
                aboutScreen.className += ' how-to-play-open';
                game.pause();
            }
        };

        aboutButton.addEventListener('click', openAbout);
        closeAboutButton.addEventListener('click', openAbout);
    }
};

export default Menu;