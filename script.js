// Games data
const games = [
    {
        name: "1v1.LOL",
        url: "https://au.au.whatthefrogiee.ddnsguru.com/semag/1v1lol/index.html",
        description: "Battle Royale building game",
        category: "Action"
    },
    {
        name: "Amazing Rope Police",
        url: "https://au.au.whatthefrogiee.ddnsguru.com/semag/amazing-rope-police/index.html",
        description: "Rope swinging police action game",
        category: "Action"
    },
    {
        name: "Basketball Stars",
        url: "https://au.au.whatthefrogiee.ddnsguru.com/semag/basketball-stars/index.html",
        description: "Multiplayer basketball game",
        category: "Sports"
    },
    {
        name: "BitLife",
        url: "https://au.au.whatthefrogiee.ddnsguru.com/semag/bitlife/index.html",
        description: "Life simulation game",
        category: "Simulation"
    },
    {
        name: "Cookie Clicker",
        url: "https://au.au.whatthefrogiee.ddnsguru.com/semag/cookieclicker/index.html",
        description: "Classic idle clicker game",
        category: "Idle"
    },
    {
        name: "Drift Hunters",
        url: "https://au.au.whatthefrogiee.ddnsguru.com/semag/drifthunters/index.html",
        description: "Drifting racing game",
        category: "Racing"
    },
    {
        name: "Drive Mad",
        url: "https://au.au.whatthefrogiee.ddnsguru.com/semag/drivemad/index.html",
        description: "Crazy driving game",
        category: "Racing"
    },
    {
        name: "Five Nights at Freddy's",
        url: "https://au.au.whatthefrogiee.ddnsguru.com/semag/fnaf/index.html",
        description: "Horror survival game",
        category: "Horror"
    },
    {
        name: "FNAF 2",
        url: "https://au.au.whatthefrogiee.ddnsguru.com/semag/fnaf2/index.html",
        description: "Sequel to the horror classic",
        category: "Horror"
    },
    {
        name: "FNAF 3",
        url: "https://au.au.whatthefrogiee.ddnsguru.com/semag/fnaf3/index.html",
        description: "Third installment of FNAF",
        category: "Horror"
    },
    {
        name: "FNAF 4",
        url: "https://au.au.whatthefrogiee.ddnsguru.com/semag/fnaf4/index.html",
        description: "Fourth chapter of FNAF",
        category: "Horror"
    },
    {
        name: "Gladihoppers",
        url: "https://au.au.whatthefrogiee.ddnsguru.com/semag/gladihoppers/index.html",
        description: "Gladiator fighting game",
        category: "Action"
    },
    {
        name: "Ocarina of Time",
        url: "https://au.au.whatthefrogiee.ddnsguru.com/semag/ocarinaoftime/index.html",
        description: "Classic Zelda adventure",
        category: "Adventure"
    },
    {
        name: "Rooftop Snipers 2",
        url: "https://au.au.whatthefrogiee.ddnsguru.com/semag/rooftopsnipers2/index.html",
        description: "Sniper battle game",
        category: "Action"
    },
    {
        name: "Idle Breakout",
        url: "https://au.au.whatthefrogiee.ddnsguru.com/semag/idlebreakout/index.html",
        description: "Idle breakout game",
        category: "Idle"
    }
];

// Navigation handling
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const sectionId = button.id.replace('Btn', 'Section');
        
        // Hide all sections with animation
        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            section.style.visibility = 'hidden';
            section.style.transform = 'translateY(20px)';
            section.classList.remove('active');
        });
        
        // Show selected section with animation
        const selectedSection = document.getElementById(sectionId);
        selectedSection.classList.add('active');
        setTimeout(() => {
            selectedSection.style.opacity = '1';
            selectedSection.style.visibility = 'visible';
            selectedSection.style.transform = 'translateY(0)';
        }, 50);
    });
});

// Theme settings
const applyThemeBtn = document.getElementById('applyTheme');
const primaryColorInput = document.getElementById('primaryColor');
const secondaryColorInput = document.getElementById('secondaryColor');

applyThemeBtn.addEventListener('click', () => {
    const primaryColor = primaryColorInput.value;
    const secondaryColor = secondaryColorInput.value;
    
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    // Save theme preferences to localStorage
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('secondaryColor', secondaryColor);
    
    // Add animation to the apply button
    applyThemeBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        applyThemeBtn.style.transform = 'scale(1)';
    }, 200);
});

// Load saved theme preferences
window.addEventListener('load', () => {
    const savedPrimaryColor = localStorage.getItem('primaryColor');
    const savedSecondaryColor = localStorage.getItem('secondaryColor');
    
    if (savedPrimaryColor) {
        primaryColorInput.value = savedPrimaryColor;
        document.documentElement.style.setProperty('--primary-color', savedPrimaryColor);
    }
    
    if (savedSecondaryColor) {
        secondaryColorInput.value = savedSecondaryColor;
        document.documentElement.style.setProperty('--secondary-color', savedSecondaryColor);
    }
    
    // Load games
    loadGames();
    
    // Show games section by default
    document.getElementById('gamesBtn').click();
});

// Game loading function
function loadGames() {
    const gamesGrid = document.querySelector('.games-grid');
    gamesGrid.innerHTML = '';
    
    // Get unique categories
    const categories = [...new Set(games.map(game => game.category))];
    
    // Create category filter buttons
    const filterContainer = document.createElement('div');
    filterContainer.className = 'category-filters';
    
    // Add "All" button
    const allButton = document.createElement('button');
    allButton.className = 'category-btn active';
    allButton.textContent = 'All';
    allButton.onclick = () => filterGames('all');
    filterContainer.appendChild(allButton);
    
    // Add category buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.textContent = category;
        button.onclick = () => filterGames(category);
        filterContainer.appendChild(button);
    });
    
    gamesGrid.parentNode.insertBefore(filterContainer, gamesGrid);
    
    // Load all games initially
    filterGames('all');
}

// Filter games by category
function filterGames(category) {
    const gamesGrid = document.querySelector('.games-grid');
    const filteredGames = category === 'all' ? games : games.filter(game => game.category === category);
    
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === category.toLowerCase() || 
            (category === 'all' && btn.textContent === 'All')) {
            btn.classList.add('active');
        }
    });
    
    // Clear and repopulate games grid with animation
    gamesGrid.style.opacity = '0';
    setTimeout(() => {
        gamesGrid.innerHTML = '';
        filteredGames.forEach((game, index) => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.style.opacity = '0';
            gameCard.style.transform = 'translateY(20px)';
            gameCard.innerHTML = `
                <div class="game-card-content">
                    <h3>${game.name}</h3>
                    <p class="game-category">${game.category}</p>
                    <p class="game-description">${game.description}</p>
                    <button class="action-btn" onclick="window.open('${game.url}', '_blank')">
                        <i class="fas fa-play"></i> Play Now
                    </button>
                </div>
            `;
            gamesGrid.appendChild(gameCard);
            
            // Animate each card with a delay
            setTimeout(() => {
                gameCard.style.opacity = '1';
                gameCard.style.transform = 'translateY(0)';
            }, index * 50);
        });
        
        gamesGrid.style.opacity = '1';
    }, 300);
} 