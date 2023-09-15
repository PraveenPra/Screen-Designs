// Add JavaScript code here

const items = [
    {
        title: 'William Phillips',
        description: 'Uploaded 4 new pictures into album',
        image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
        span: 'Landspac',
        time: 'Just Now'
    },
    {
        title: 'Shane Willis',
        description: 'Rated you page',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwHvEGamFasFcudDxAlTzNzd2ZsSRKsmf4Uw&usqp=CAU',
        span: 'EDesign',
        time: '2 minutes ago'
    },
    {
        title: 'Harriet Waters',
        description: 'Commented on your post',
        image: 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp',
        span: 'Breakfast',
        time: '1 hour ago'
    },
    {
        title: 'Harriet Waters',
        description: 'Uploaded 6 new pictures into album Trips 2018.',
        image: 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp',
        span: '',
        time: '1 hour ago'
    }
];

const items2 = [
    {
        title: 'Alex Johnson',
        description: 'Shared an interesting article',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        span: 'Articles',
        time: '3 hours ago'
    },
    {
        title: 'Emily Baker',
        description: 'Liked your photo',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        span: 'Photography',
        time: '5 hours ago'
    },
    {
        title: 'Chris Miller',
        description: 'Tagged you in a post',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        span: 'Social',
        time: '8 hours ago'
    },
    {
        title: 'Jessica Lee',
        description: 'Posted a new recipe',
        image: 'https://randomuser.me/api/portraits/women/4.jpg',
        span: 'Food',
        time: 'Yesterday'
    },
    {
        title: 'Michael Davis',
        description: 'Started following you',
        image: 'https://randomuser.me/api/portraits/men/5.jpg',
        span: 'Connections',
        time: '2 days ago'
    }
]


// -----------implementation---------------------
function renderItems(templateId, containerId, items) {
    const template = document.getElementById(templateId);
    const container = document.getElementById(containerId);

    items.forEach(itemData => {
        const instance = document.importNode(template.content, true);
        const placeholders = instance.querySelectorAll('[data-placeholder]');

        placeholders.forEach(placeholder => {
            const dataKey = placeholder.getAttribute('data-placeholder');
            if (itemData[dataKey]) {
                switch (placeholder.tagName) {
                    case 'IMG':
                        placeholder.src = itemData[dataKey];
                        break;
                    case 'A':
                        placeholder.href = itemData[dataKey];
                        break;
                    default:
                       
                            placeholder.textContent = itemData[dataKey];
                        
                        break;
                }
            }
        });

        container.appendChild(instance);
    });
}


// ------------ toggle implementation---------------

function toggleContent(toggleButtonId, contentId, showText, hideText) {
    const toggleButton = document.getElementById(toggleButtonId);
    const content = document.getElementById(contentId);
    let isShown = false;

    toggleButton.addEventListener('click', function () {
        isShown = !isShown;

        if (isShown) {
            content.style.display = 'block';
            if (hideText != '') {
                toggleButton.textContent = hideText;
                renderItems('item-template', 'item-container-more', items2)
           } 
           
        } else {
            content.style.display = 'none';
            if (showText != '') {
                toggleButton.textContent = showText;
            } 
            content.innerHTML = '';
        }
    });
}

// Use the function for your toggle
toggleContent('toggleButton', 'item-container-more', 'VIEW ALL', 'HIDE');