document.addEventListener('DOMContentLoaded', () => {

    let navigationHistory = [];

    function navigateTo(targetFrameId, addToHistory = true) {
        
        const currentScreen = document.querySelector('.active-screen');
        const targetScreen = document.getElementById(targetFrameId);

        if (currentScreen && targetScreen && currentScreen !== targetScreen) {
            
            if (addToHistory) {
                navigationHistory.push(currentScreen.id);
            }

            currentScreen.classList.remove('active-screen');
            currentScreen.classList.add('hidden-screen');

            targetScreen.classList.remove('hidden-screen');
            targetScreen.classList.add('active-screen');

            window.scrollTo(0, 0);
        }
    }

    document.querySelectorAll('[data-target]').forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.currentTarget.getAttribute('data-target');
            navigateTo(targetId);
        });
    });document.addEventListener('click', (event) => {
        
        const targetBtn = event.target.closest('[data-target]');
        if (targetBtn) {
            const targetId = targetBtn.getAttribute('data-target');
            navigateTo(targetId);
            return;
        }

        if (event.target.classList.contains('back-button')) {
            if (navigationHistory.length > 0) {
                const previousId = navigationHistory.pop();
                navigateTo(previousId, false);
            }
            return;
        }

        if (event.target.classList.contains('home-button')) {
            navigateTo('screen1');
            navigationHistory = [];
            return;
        }

        if (event.target.classList.contains('export-button')) {
            window.print();
            return;
        }
    });


});
