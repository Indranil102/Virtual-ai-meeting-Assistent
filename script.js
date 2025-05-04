// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const newMeetingButtons = document.querySelectorAll('.new-meeting-button');
const joinButtons = document.querySelectorAll('.button-text');
const joinInput = document.querySelector('.join-input input');
const menuButton = document.querySelector('.menu-button');
const featureCards = document.querySelectorAll('.feature-card');

// Generate random meeting ID
function generateMeetingId() {
    return 'meet-' + Math.random().toString(36).substr(2, 9);
}

// Handle new meeting creation
function createNewMeeting() {
    const meetingId = generateMeetingId();
    window.location.href = `meeting.html?id=${meetingId}`;
}

// Handle joining a meeting
function joinMeeting() {
    const code = joinInput.value.trim();
    if (code) {
        window.location.href = `meeting.html?id=${code}`;
    } else {
        alert('Please enter a valid meeting code');
    }
}

// Event Listeners
newMeetingButtons.forEach(button => {
    button.addEventListener('click', createNewMeeting);
});

joinButtons.forEach(button => {
    button.addEventListener('click', joinMeeting);
});

joinInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinMeeting();
    }
});

// Add hover effects to feature cards
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Mobile menu button animation
menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('active');
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});