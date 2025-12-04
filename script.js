// Dialogues pour chaque section
const dialogues = {
    about: "* Salut. Moi c'est Sans. Un développeur qui aime bien toucher à tout... surtout au code. J'ai commencé en 2019 et depuis, je crée des trucs sympas.",
    projects: "* Alors, tu veux voir mes projets ? J'ai bossé sur pas mal de trucs intéressants. Stealy, Spying, des plugins Vencord... Jette un œil.",
    skills: "* Mes compétences ? J'ai appris plein de langages et d'outils au fil du temps. JavaScript, TypeScript, React... et j'apprends toujours.",
    contact: "* Tu veux me contacter ? Pas de problème. Discord, Instagram, GitHub... Choisis ton canal préféré.",
    stats: "* Curieux de voir mes stats GitHub ? Voilà ce que j'ai accompli jusqu'à maintenant. Pas mal, non ?"
};

let currentDialogue = "";
let dialogueIndex = 0;
let isTyping = false;

// Démarrer le jeu
function startGame() {
    const introScreen = document.getElementById('intro-screen');
    const mainScreen = document.getElementById('main-screen');
    
    introScreen.classList.remove('active');
    mainScreen.classList.add('active');
    
    // Afficher le premier dialogue
    typeDialogue(dialogues.about);
}

// Effet de machine à écrire pour les dialogues
function typeDialogue(text) {
    if (isTyping) return;
    
    isTyping = true;
    currentDialogue = text;
    dialogueIndex = 0;
    
    const dialogueElement = document.getElementById('dialogue-text');
    dialogueElement.textContent = "";
    
    const typingInterval = setInterval(() => {
        if (dialogueIndex < currentDialogue.length) {
            dialogueElement.textContent += currentDialogue[dialogueIndex];
            dialogueIndex++;
        } else {
            clearInterval(typingInterval);
            isTyping = false;
        }
    }, 30);
}

// Afficher une section
function showSection(sectionName) {
    // Masquer toutes les sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Afficher la section sélectionnée
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Mettre à jour les boutons de navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        const heart = btn.querySelector('.heart, .heart-hidden');
        if (heart) {
            heart.className = 'heart-hidden';
        }
    });
    
    // Activer le bouton sélectionné
    const activeButton = document.querySelector(`[data-section="${sectionName}"]`);
    if (!activeButton) {
        const buttons = document.querySelectorAll('.nav-btn');
        buttons.forEach(btn => {
            if (btn.textContent.includes(sectionName.toUpperCase())) {
                btn.classList.add('active');
                const heart = btn.querySelector('.heart-hidden');
                if (heart) {
                    heart.className = 'heart';
                }
            }
        });
    } else {
        activeButton.classList.add('active');
        const heart = activeButton.querySelector('.heart-hidden');
        if (heart) {
            heart.className = 'heart';
        }
    }
    
    // Changer le dialogue
    if (dialogues[sectionName]) {
        typeDialogue(dialogues[sectionName]);
    }
    
    // Jouer un son (optionnel)
    playMenuSound();
}

// Jouer le son du menu
function playMenuSound() {
    const sound = document.getElementById('menu-sound');
    if (sound) {
        sound.volume = 0.3;
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Audio play failed:', e));
    }
}

// Ajouter des effets sonores aux boutons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.menu-btn, .nav-btn, .btn-link, .contact-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            playMenuSound();
        });
    });
    
    // Initialiser le premier bouton comme actif
    const firstNavBtn = document.querySelector('.nav-btn[data-section="about"]');
    if (firstNavBtn) {
        const heart = firstNavBtn.querySelector('.heart-hidden');
        if (heart) {
            heart.className = 'heart';
        }
        firstNavBtn.classList.add('active');
    }
});

// Easter egg : Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    const dialogueElement = document.getElementById('dialogue-text');
    dialogueElement.textContent = "* Heh heh heh... Tu as trouvé le code secret. Tu vas avoir un mauvais temps... 💀";
    document.body.style.animation = 'shake 0.5s infinite';
    
    setTimeout(() => {
        document.body.style.animation = '';
        typeDialogue(dialogues.about);
    }, 3000);
}

// Animation de tremblement
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translate(0, 0); }
        10%, 30%, 50%, 70%, 90% { transform: translate(-5px, 0); }
        20%, 40%, 60%, 80% { transform: translate(5px, 0); }
    }
`;
document.head.appendChild(style);


// Animation de la barre HP
function animateHP() {
    const hpBar = document.getElementById('hp-bar');
    const hpCurrent = document.querySelector('.hp-current');
    
    if (!hpBar || !hpCurrent) return;
    
    let currentHP = 0;
    const maxHP = 92;
    const duration = 2000; // 2 secondes
    const steps = 60;
    const increment = maxHP / steps;
    const stepDuration = duration / steps;
    
    const interval = setInterval(() => {
        currentHP += increment;
        if (currentHP >= maxHP) {
            currentHP = maxHP;
            clearInterval(interval);
        }
        
        const percentage = (currentHP / maxHP) * 100;
        hpBar.style.width = percentage + '%';
        hpCurrent.textContent = Math.floor(currentHP);
    }, stepDuration);
}

// Lancer l'animation HP au démarrage
const originalStartGame = startGame;
startGame = function() {
    originalStartGame();
    setTimeout(() => {
        animateHP();
    }, 500);
};
