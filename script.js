// Quiz questions and scoring system
const questions = [
    {
        question: "What time are we taking the bus?",
        options: [
            { text: "7am", organelle: "nucleus" },
            { text: "8am", organelle: "mitochondria" },
            { text: "10 shuttle", organelle: "er" },
            { text: "12 shuttle", organelle: "golgi" }
        ]
    },
    {
        question: "Your bus doesn't arrive what do you do?",
        options: [
            { text: "Wait for the next bus", organelle: "nucleus" },
            { text: "Cycle", organelle: "mitochondria" },
            { text: "Walk", organelle: "lysosome" },
            { text: "Go home", organelle: "vacuole" }
        ]
    },
    {
        question: "You arrive but you forgot your badge",
        options: [
            { text: "Don't tell anyone", organelle: "nucleus" },
            { text: "Tailgate", organelle: "mitochondria" },
            { text: "Go to security", organelle: "lysosome" },
            { text: "Go home", organelle: "vacuole" }
        ]
    },
    {
        question: "What is the first thing you do when you go into the office?",
        options: [
            { text: "You check your emails", errorMessage: "no one emails you. you go for coffee.", organelle: "nucleus" },
            { text: "You check the jobs you submitted last night", errorMessage: "all your jobs failed. you go for coffee.", organelle: "mitochondria" },
            { text: "You chat to your colleague", errorMessage: "they're locked in. you go for coffee.", organelle: "er" },
            { text: "You read papers", errorMessage: "you got scooped. you go for coffee.", organelle: "ribosome" }
        ]
    },
    {
        question: "You want to take a coffee, where do you go?",
        options: [
            { text: "Dina", organelle: "nucleus" },
            { text: "Murrays", organelle: "mitochondria" },
            { text: "You have your instant coffee in the cupboard", organelle: "golgi" },
            { text: "Free coffee in the green cafe", organelle: "vacuole" }
        ]
    },
    {
        question: "Presumably, you should do a bit of work. You're meeting with your collaborators and you haven't done the analysis that you were supposed to do. What excuse do you give?",
        options: [
            { text: "My laptop sensed my stress and shut down in solidarity", organelle: "nucleus" },
            { text: "I made a bunch of figures but it was too much to put on the slides", organelle: "mitochondria" },
            { text: "I'm pivoting to a more collaborative model where you do the analysis and I offer moral support", organelle: "er" },
            { text: "You're honest and you say that you haven't done it", organelle: "ribosome" }
        ]
    },
    {
        question: "Lunch time! You forgot your lunch, what do you do?",
        options: [
            { text: "You pay a million pounds for murray's lunch", organelle: "nucleus" },
            { text: "Wait for South Building free food", organelle: "mitochondria" },
            { text: "Don't wait, pretend like you're at a workshop", organelle: "lysosome" },
            { text: "Scavenge the fridge", organelle: "golgi" }
        ]
    },
    {
        question: "What bus do you take home?",
        options: [
            { text: "I don't, I already ubered home", organelle: "nucleus" },
            { text: "1645", organelle: "mitochondria" },
            { text: "1715", organelle: "er" },
            { text: "I don't, I sleep at the office", organelle: "ribosome" }
        ]
    },
    {
        question: "Do you have a ticket?",
        options: [
            { text: "Yes", organelle: "nucleus" },
            { text: "No", organelle: "vacuole" }
        ]
    }
];

// Organelle descriptions
const organelleDescriptions = {
    nucleus: {
        name: "🧠 NUCLEUS",
        tagline: "The planner and decision-maker.",
        personality: "Smart, organized, loves being in charge",
        catchphrase: "Let me take it from here.",
        vibesWith: "Ribosome, ER",
        avoids: "Lysosome"
    },
    mitochondria: {
        name: "🔋 MITOCHONDRIA",
        tagline: "The energizer of the group.",
        personality: "Driven, intense, never stops moving",
        catchphrase: "Let's GO!",
        vibesWith: "Nucleus, ER",
        avoids: "Vacuole (too chill)"
    },
    er: {
        name: "🧵 ENDOPLASMIC RETICULUM (ER)",
        tagline: "The multitasking connector.",
        personality: "Flexible, efficient, low-key brilliant",
        catchphrase: "I'll handle it.",
        vibesWith: "Ribosome, Golgi",
        avoids: "Mitochondria (too much energy)"
    },
    golgi: {
        name: "📦 GOLGI APPARATUS",
        tagline: "The finisher and perfectionist.",
        personality: "Stylish, precise, detail-obsessed",
        catchphrase: "It's not done until it's perfect.",
        vibesWith: "ER, Vacuole",
        avoids: "Ribosome (too messy)"
    },
    lysosome: {
        name: "🛡️ LYSOSOME",
        tagline: "The clean-up crew with attitude.",
        personality: "Fierce, honest, no time for nonsense",
        catchphrase: "You're either useful… or you're gone.",
        vibesWith: "Vacuole, Mitochondria",
        avoids: "Nucleus (too bossy)"
    },
    ribosome: {
        name: "🔧 RIBOSOME",
        tagline: "The quiet builder.",
        personality: "Humble, hardworking, always tinkering",
        catchphrase: "I made this.",
        vibesWith: "ER, Nucleus",
        avoids: "Golgi (too picky)"
    },
    vacuole: {
        name: "🧳 VACUOLE",
        tagline: "The laid-back hoarder.",
        personality: "Calm, collected, emotionally deep",
        catchphrase: "I've got space for that.",
        vibesWith: "Golgi, Lysosome",
        avoids: "Mitochondria (too intense)"
    }
};

let currentQuestion = 0;
let scores = {
    nucleus: 0,
    mitochondria: 0,
    er: 0,
    golgi: 0,
    lysosome: 0,
    ribosome: 0,
    vacuole: 0
};

function startQuiz() {
    document.getElementById('titleScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.onclick = () => selectOption(option.organelle);
        optionsContainer.appendChild(button);
    });
    
    updateProgress();
}

function selectOption(organelle) {
    const currentQuestionData = questions[currentQuestion];
    const selectedOption = currentQuestionData.options.find(option => option.organelle === organelle);
    
    // Check if this is a "Go home" option on questions 2 or 3
    if ((currentQuestion === 1 || currentQuestion === 2) && selectedOption.text === "Go home") {
        showMotivationScreen();
    }
    // Check if this is question 4 (index 3) with error messages
    else if (currentQuestion === 3 && selectedOption.errorMessage) {
        showErrorScreen(selectedOption.errorMessage);
    }
    else {
        // Normal flow
        scores[organelle]++;
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }
}

function showErrorScreen(errorMessage) {
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('errorScreen').style.display = 'block';
    document.getElementById('errorText').textContent = errorMessage;
}

function showMotivationScreen() {
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('motivationScreen').style.display = 'block';
}

function continueToNextQuestion() {
    // Hide both motivation and error screens
    document.getElementById('motivationScreen').style.display = 'none';
    document.getElementById('errorScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'block';
    
    // Move to next question without scoring the option
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function updateProgress() {
    const progress = (currentQuestion / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function showResults() {
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'block';
    
    // Find the organelle with the highest score
    let maxScore = 0;
    let resultOrganelle = 'nucleus';
    
    for (const [organelle, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            resultOrganelle = organelle;
        }
    }
    
    const result = organelleDescriptions[resultOrganelle];
    document.getElementById('organelleResult').textContent = result.name;
    document.getElementById('organelleTagline').textContent = result.tagline;
    document.getElementById('organellePersonality').textContent = result.personality;
    document.getElementById('organelleCatchphrase').textContent = result.catchphrase;
    document.getElementById('organelleVibes').textContent = `Vibes with: ${result.vibesWith}`;
    document.getElementById('organelleAvoids').textContent = `Avoids: ${result.avoids}`;
    
    // Set the organelle image
    const imageMap = {
        'nucleus': 'images/nucleus.jp2',
        'mitochondria': 'images/mitochondria.jp2',
        'er': 'images/endoplasmic.jp2',
        'golgi': 'images/golgi.jp2',
        'lysosome': 'images/lysosome.jp2',
        'ribosome': 'images/ribosome.jp2',
        'vacuole': 'images/vacuole.jp2'
    };
    
    const organelleImage = document.getElementById('organelleImage');
    organelleImage.src = imageMap[resultOrganelle] || '';
}

function restartQuiz() {
    currentQuestion = 0;
    scores = {
        nucleus: 0,
        mitochondria: 0,
        er: 0,
        golgi: 0,
        lysosome: 0,
        ribosome: 0,
        vacuole: 0
    };
    
    document.getElementById('resultScreen').style.display = 'none';
    document.getElementById('titleScreen').style.display = 'block';
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('quizScreen').style.display !== 'none') {
        const options = document.querySelectorAll('.option-btn');
        const currentSelected = document.querySelector('.option-btn.selected');
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            if (!currentSelected) {
                options[0].classList.add('selected');
            } else {
                currentSelected.classList.remove('selected');
                const nextIndex = (Array.from(options).indexOf(currentSelected) + 1) % options.length;
                options[nextIndex].classList.add('selected');
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            if (!currentSelected) {
                options[options.length - 1].classList.add('selected');
            } else {
                currentSelected.classList.remove('selected');
                const prevIndex = (Array.from(options).indexOf(currentSelected) - 1 + options.length) % options.length;
                options[prevIndex].classList.add('selected');
            }
        } else if (e.key === 'Enter' && currentSelected) {
            e.preventDefault();
            const organelle = questions[currentQuestion].options[Array.from(options).indexOf(currentSelected)].organelle;
            selectOption(organelle);
        }
    }
});

// Add hover effects for option buttons
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('option-btn')) {
            document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
        }
    });
}); 