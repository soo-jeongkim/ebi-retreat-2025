// Quiz questions and scoring system
const questions = [
    {
        question: "How do you prefer to spend your free time?",
        options: [
            { text: "Reading and learning new things", organelle: "nucleus" },
            { text: "Working out and staying active", organelle: "mitochondria" },
            { text: "Organizing and cleaning", organelle: "lysosome" },
            { text: "Creating and building things", organelle: "ribosome" }
        ]
    },
    {
        question: "What's your communication style?",
        options: [
            { text: "Direct and authoritative", organelle: "nucleus" },
            { text: "Energetic and enthusiastic", organelle: "mitochondria" },
            { text: "Helpful and supportive", organelle: "lysosome" },
            { text: "Detailed and precise", organelle: "ribosome" }
        ]
    },
    {
        question: "How do you handle stress?",
        options: [
            { text: "Take charge and make decisions", organelle: "nucleus" },
            { text: "Channel it into productive energy", organelle: "mitochondria" },
            { text: "Break down problems into manageable pieces", organelle: "lysosome" },
            { text: "Focus on the task at hand", organelle: "ribosome" }
        ]
    },
    {
        question: "What's your ideal work environment?",
        options: [
            { text: "A quiet office where I can think", organelle: "nucleus" },
            { text: "A dynamic, fast-paced setting", organelle: "mitochondria" },
            { text: "A clean, organized space", organelle: "lysosome" },
            { text: "A collaborative workshop", organelle: "ribosome" }
        ]
    },
    {
        question: "How do you approach problem-solving?",
        options: [
            { text: "Analyze the big picture first", organelle: "nucleus" },
            { text: "Jump in with energy and enthusiasm", organelle: "mitochondria" },
            { text: "Break it down and clean up the mess", organelle: "lysosome" },
            { text: "Build solutions step by step", organelle: "ribosome" }
        ]
    },
    {
        question: "What's your leadership style?",
        options: [
            { text: "I'm the boss - clear direction and control", organelle: "nucleus" },
            { text: "I motivate and energize the team", organelle: "mitochondria" },
            { text: "I help others grow and develop", organelle: "lysosome" },
            { text: "I lead by example and hard work", organelle: "ribosome" }
        ]
    },
    {
        question: "How do you prefer to travel?",
        options: [
            { text: "Planned trips with clear itineraries", organelle: "nucleus" },
            { text: "Adventure and exploration", organelle: "mitochondria" },
            { text: "Relaxing getaways to recharge", organelle: "lysosome" },
            { text: "Educational trips to learn new skills", organelle: "ribosome" }
        ]
    },
    {
        question: "What's your relationship with food?",
        options: [
            { text: "I'm picky and have specific preferences", organelle: "nucleus" },
            { text: "I love high-energy foods and snacks", organelle: "mitochondria" },
            { text: "I prefer clean, healthy options", organelle: "lysosome" },
            { text: "I enjoy cooking and creating meals", organelle: "ribosome" }
        ]
    },
    {
        question: "How do you handle change?",
        options: [
            { text: "I need time to process and plan", organelle: "nucleus" },
            { text: "I adapt quickly and find it exciting", organelle: "mitochondria" },
            { text: "I help others through transitions", organelle: "lysosome" },
            { text: "I focus on building new routines", organelle: "ribosome" }
        ]
    },
    {
        question: "What's your superpower?",
        options: [
            { text: "Strategic thinking and planning", organelle: "nucleus" },
            { text: "Unlimited energy and motivation", organelle: "mitochondria" },
            { text: "Healing and helping others", organelle: "lysosome" },
            { text: "Building and creating things", organelle: "ribosome" }
        ]
    }
];

// Organelle descriptions
const organelleDescriptions = {
    nucleus: {
        name: "THE NUCLEUS",
        description: "You're the control center! Like the nucleus, you're the boss who calls the shots. You have a strong sense of direction and love being in charge. Your strategic mind and organizational skills make you a natural leader. You're protective of your ideas and prefer to think things through before acting. The nucleus contains the cell's DNA - you contain the blueprint for success!"
    },
    mitochondria: {
        name: "THE MITOCHONDRIA",
        description: "You're the powerhouse! Like the mitochondria, you're full of energy and enthusiasm. You're always on the go and love being active. Your positive energy is contagious and you motivate others around you. You're adaptable and can handle high-pressure situations with ease. The mitochondria produces energy for the cell - you produce energy for your team!"
    },
    lysosome: {
        name: "THE LYSOSOME",
        description: "You're the helper! Like the lysosome, you're all about cleaning up and helping others. You have a nurturing personality and love supporting people. You're great at breaking down complex problems into manageable pieces. Your attention to detail and care for others makes you invaluable. The lysosome breaks down waste and helps the cell - you help break down problems and support your community!"
    },
    ribosome: {
        name: "THE RIBOSOME",
        description: "You're the builder! Like the ribosome, you're all about creating and constructing. You love working with your hands and building things from scratch. You're patient, methodical, and take pride in your craftsmanship. You prefer to work in teams and enjoy collaborative projects. The ribosome builds proteins for the cell - you build solutions for the world!"
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