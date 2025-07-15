// Quiz questions and scoring system
const questions = [
    {
        question: "What time are we taking the bus?",
        options: [
            { text: "7am", organelle: "nucleus" },
            { text: "8am", organelle: "mitochondria" },
            { text: "10 shuttle", organelle: "lysosome" },
            { text: "12 shuttle", organelle: "ribosome" }
        ]
    },
    {
        question: "Your bus doesn't arrive what do you do?",
        options: [
            { text: "Wait for the next option", organelle: "nucleus" },
            { text: "Cycle", organelle: "mitochondria" },
            { text: "Walk", organelle: "lysosome" },
            { text: "Go home", organelle: "ribosome" }
        ]
    },
    {
        question: "You arrive but you forgot your badge",
        options: [
            { text: "Don't tell anyone", organelle: "nucleus" },
            { text: "Tailgate", organelle: "mitochondria" },
            { text: "Go to security", organelle: "lysosome" },
            { text: "Go home", organelle: "ribosome" }
        ]
    },
    {
        question: "What is the first thing you do when you go into the office?",
        options: [
            { text: "You check your emails > no one emails you", organelle: "nucleus" },
            { text: "You check the jobs you submitted last night > all your jobs failed", organelle: "mitochondria" },
            { text: "You chat to your colleague > they're locked in", organelle: "lysosome" },
            { text: "You read papers > you got scooped", organelle: "ribosome" }
        ]
    },
    {
        question: "You want to take a coffee, where do you go?",
        options: [
            { text: "Dina", organelle: "nucleus" },
            { text: "Murrays", organelle: "mitochondria" },
            { text: "You have your instant coffee in the cupboard", organelle: "lysosome" },
            { text: "Free coffee in the green cafe", organelle: "ribosome" }
        ]
    },
    {
        question: "Presumably, you should do a bit of work. You're meeting with your collaborators and you haven't done the analysis that you were supposed to do. What excuse do you give?",
        options: [
            { text: "My laptop sensed my stress and shut down in solidarity", organelle: "nucleus" },
            { text: "I made a bunch of figures but it was too much to put on the slides", organelle: "mitochondria" },
            { text: "I'm pivoting to a more collaborative model where you do the analysis and I offer moral support", organelle: "lysosome" },
            { text: "You're honest and you say that you haven't done it", organelle: "ribosome" }
        ]
    },
    {
        question: "Lunch time! You forgot your lunch, what do you do?",
        options: [
            { text: "You pay a million pounds for murray's lunch", organelle: "nucleus" },
            { text: "Wait for South Building free food", organelle: "mitochondria" },
            { text: "Don't wait, pretend like you're at a workshop", organelle: "lysosome" },
            { text: "Scavenge the fridge", organelle: "ribosome" }
        ]
    },
    {
        question: "What bus do you take home?",
        options: [
            { text: "I don't, I already ubered home", organelle: "nucleus" },
            { text: "1645", organelle: "mitochondria" },
            { text: "1715", organelle: "lysosome" },
            { text: "I don't, I sleep at the office", organelle: "ribosome" }
        ]
    },
    {
        question: "Do you have a ticket?",
        options: [
            { text: "Yes", organelle: "nucleus" },
            { text: "No", organelle: "mitochondria" }
        ]
    }
];

// Organelle descriptions
const organelleDescriptions = {
    nucleus: {
        name: "THE NUCLEUS",
        description: "You're the control center! Like the nucleus, you're the boss who calls the shots. You're always early (7am bus crew!) and have everything planned out. You're the one who remembers their badge and has their ticket ready. Your strategic mind keeps you organized even when your laptop shuts down in solidarity. The nucleus contains the cell's DNA - you contain the blueprint for success!"
    },
    mitochondria: {
        name: "THE MITOCHONDRIA",
        description: "You're the powerhouse! Like the mitochondria, you're full of energy and enthusiasm. You're the one cycling when the bus doesn't show up, tailgating through security, and always finding the energy for Murrays coffee. Your positive energy keeps you going even when all your jobs fail. The mitochondria produces energy for the cell - you produce energy for your team!"
    },
    lysosome: {
        name: "THE LYSOSOME",
        description: "You're the helper! Like the lysosome, you're all about cleaning up and helping others. You're the one who goes to security when you forget your badge, offers moral support to collaborators, and waits for South Building free food. Your nurturing personality makes you great at breaking down complex problems. The lysosome breaks down waste and helps the cell - you help break down problems and support your community!"
    },
    ribosome: {
        name: "THE RIBOSOME",
        description: "You're the builder! Like the ribosome, you're all about creating and constructing. You're the honest one who admits when you haven't done the analysis, the resourceful one who scavenges the fridge for lunch, and the dedicated one who sleeps at the office. You're patient, methodical, and take pride in your work. The ribosome builds proteins for the cell - you build solutions for the world!"
    }
};

let currentQuestion = 0;
let scores = {
    nucleus: 0,
    mitochondria: 0,
    lysosome: 0,
    ribosome: 0
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
    scores[organelle]++;
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
    document.getElementById('organelleDescription').textContent = result.description;
}

function restartQuiz() {
    currentQuestion = 0;
    scores = {
        nucleus: 0,
        mitochondria: 0,
        lysosome: 0,
        ribosome: 0
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