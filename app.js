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

const initialColors = [
    '#CCDAD1', 
    '#9CAEA9', 
    '#788585'
];

const colorBoxes = document.querySelectorAll('.color-box');
const paletteContainer = document.querySelector('.palette-container');

function deactivateAllBoxes() {
    colorBoxes.forEach(box => {
        box.classList.remove('active');
    });
}

colorBoxes.forEach((box, index) => {
    box.style.setProperty('--color', initialColors[index]); 
    box.style.backgroundColor = initialColors[index];

    const hexInput = box.querySelector('.hex-input');
    const colorPicker = box.querySelector('.color-picker');
    const hexDisplay = box.querySelector('.hex-code');

    box.addEventListener('click', (event) => {
        if (event.target !== hexInput && event.target !== colorPicker) {            
            deactivateAllBoxes();
            box.classList.add('active');
            hexInput.focus();
        }
    });

    colorPicker.addEventListener('input', (e) => {
        const newColor = e.target.value.toUpperCase();
        
        box.style.backgroundColor = newColor;
        hexDisplay.textContent = newColor;
        hexInput.value = newColor.substring(1); 
    });

    hexInput.addEventListener('input', (e) => {
        let value = e.target.value.toUpperCase().replace(/[^0-9A-F]/g, ''); 
        
        value = value.substring(0, 6); 
        e.target.value = value;
        
        if (value.length === 6) {
            const fullHex = `#${value}`;
            
            box.style.backgroundColor = fullHex;
            hexDisplay.textContent = fullHex;
            colorPicker.value = fullHex; 
        }
    });

    hexInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            box.classList.remove('active');
            e.target.blur(); 
        }
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.palette-container')) {
        deactivateAllBoxes();
    }
}, true);

    const heroContainer = document.getElementById('heroImageContainer');
    const imageGroups = {
        '.tall-left': [ 
            'images/messy/product-1.jpg','images/style-tiles/fashion.jpg','images/messy/life-style-1.jpg'
        ],
        '.square-mid-left': [ 
            'images/messy/product-2.jpg','images/messy/fashion-1.jpg','images/messy/life-style-2.jpg'
        ],
        '.square-mid-right': [ 
            'images/messy/product-3.png','images/messy/fashion-2.jpg','images/messy/life-style-3.jpg'
        ],
        '.wide-bottom': [
            'images/style-tiles/product.jpg','images/messy/fashion-3.jpg','images/style-tiles/surfer.jpg'
        ],
        '.main-hero-image': [ 
            'images/style-tiles/product.jpg','images/style-tiles/fashion.jpg','images/style-tiles/surfer.jpg'
        ],
        '.icon-option-fb': [ 
            'images/icon-option/fb-1.png','images/icon-option/fb-2.png','images/icon-option/fb-3.png'
        ]
    };

    function setupImagePicker(selector, images) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(el => {
            el.addEventListener('click', function(e) {
                const oldPicker = document.getElementById('dynamic-image-picker');
                if (oldPicker) oldPicker.remove();

                const picker = document.createElement('div');
                picker.id = 'dynamic-image-picker';
                picker.className = 'dynamic-image-picker';

                images.forEach(src => {
                    const imgOption = document.createElement('img');
                    imgOption.src = src;
                    imgOption.className = 'picker-option';

                    imgOption.addEventListener('click', (event) => {
                        event.stopPropagation();
                        el.innerHTML = `<img src="${src}" class="inserted-image">`;
                        picker.remove();
                    });
                    picker.appendChild(imgOption);
                });

                document.body.appendChild(picker);
                const rect = el.getBoundingClientRect();
                picker.style.top = `${rect.top + window.scrollY + 10}px`;
                picker.style.left = `${rect.left + window.scrollX + 10}px`;
            });
        });
    }

    for (const [selector, images] of Object.entries(imageGroups)) {
        setupImagePicker(selector, images);
    }

    document.addEventListener('mousedown', (e) => {
        const picker = document.getElementById('dynamic-image-picker');
        if (picker && !picker.contains(e.target)) picker.remove();
    });

    const root = document.getElementById('fontPick');
  const trigger = root.querySelector('.fontpick__trigger');
  const menu = root.querySelector('.fontpick__menu');

  const setOpen = (open) => {
    root.classList.toggle('open', open);
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  const toggle = () => setOpen(!root.classList.contains('open'));

  trigger.addEventListener('click', toggle);
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    if (e.key === 'Escape') setOpen(false);
  });

  menu.addEventListener('click', (e) => {
    const item = e.target.closest('[role="option"]');
    if (!item) return;
    const font = item.dataset.font;

    trigger.textContent = item.textContent;
    trigger.style.fontFamily = font;
    setOpen(false);
  });

  document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) setOpen(false);
  });