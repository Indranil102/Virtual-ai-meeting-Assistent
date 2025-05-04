// Initialize Lucide icons
lucide.createIcons();

class MeetingRoom {
    constructor() {
        this.stream = null;
        this.isAudioEnabled = true;
        this.isVideoEnabled = true;
        this.isScreenSharing = false;
        this.isChatOpen = false;
        this.meetingStartTime = Date.now();

        this.initializeUI();
        this.setupEventListeners();
        this.startMeetingTimer();
        this.setupLocalVideo();
    }

    initializeUI() {
        this.localVideo = document.getElementById('localVideo');
        this.micButton = document.getElementById('microphone');
        this.cameraButton = document.getElementById('camera');
        this.screenButton = document.getElementById('screen');
        this.chatButton = document.getElementById('chat');
        this.endCallButton = document.getElementById('end-call');
        this.sidePanel = document.querySelector('.side-panel');
        this.closeChatButton = document.getElementById('close-chat');
        this.meetingTimeDisplay = document.querySelector('.meeting-time');
        this.videoGrid = document.querySelector('.video-grid');
    }

    setupEventListeners() {
        this.micButton.addEventListener('click', () => this.toggleAudio());
        this.cameraButton.addEventListener('click', () => this.toggleVideo());
        this.screenButton.addEventListener('click', () => this.toggleScreenShare());
        this.chatButton.addEventListener('click', () => this.toggleChat());
        this.closeChatButton.addEventListener('click', () => this.toggleChat());
        this.endCallButton.addEventListener('click', () => this.endCall());
    }

    async setupLocalVideo() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            });
            this.localVideo.srcObject = this.stream;
        } catch (error) {
            console.error('Error accessing media devices:', error);
            alert('Unable to access camera and microphone');
        }
    }

    toggleAudio() {
        if (this.stream) {
            const audioTrack = this.stream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            this.isAudioEnabled = audioTrack.enabled;
            this.micButton.classList.toggle('active', this.isAudioEnabled);
            this.micButton.classList.toggle('disabled', !this.isAudioEnabled);
            this.micButton.querySelector('i').setAttribute('data-lucide', this.isAudioEnabled ? 'mic' : 'mic-off');
            lucide.createIcons();
        }
    }

    toggleVideo() {
        if (this.stream) {
            const videoTrack = this.stream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
            this.isVideoEnabled = videoTrack.enabled;
            this.cameraButton.classList.toggle('active', this.isVideoEnabled);
            this.cameraButton.classList.toggle('disabled', !this.isVideoEnabled);
            this.cameraButton.querySelector('i').setAttribute('data-lucide', this.isVideoEnabled ? 'video' : 'video-off');
            lucide.createIcons();
        }
    }

    async toggleScreenShare() {
        try {
            if (!this.isScreenSharing) {
                const screenStream = await navigator.mediaDevices.getDisplayMedia({
                    video: true
                });
                const videoTrack = screenStream.getVideoTracks()[0];
                videoTrack.addEventListener('ended', () => {
                    this.stopScreenSharing();
                });
                this.localVideo.srcObject = screenStream;
                this.isScreenSharing = true;
                this.screenButton.classList.add('active');
            } else {
                this.stopScreenSharing();
            }
        } catch (error) {
            console.error('Error sharing screen:', error);
        }
    }

    stopScreenSharing() {
        if (this.isScreenSharing) {
            this.localVideo.srcObject = this.stream;
            this.isScreenSharing = false;
            this.screenButton.classList.remove('active');
        }
    }

    toggleChat() {
        this.isChatOpen = !this.isChatOpen;
        this.sidePanel.classList.toggle('open', this.isChatOpen);
        this.chatButton.classList.toggle('active', this.isChatOpen);
        this.videoGrid.classList.toggle('chat-open', this.isChatOpen);
    }

    startMeetingTimer() {
        setInterval(() => {
            const elapsed = Date.now() - this.meetingStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            this.meetingTimeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    endCall() {
        if (confirm('Are you sure you want to leave the meeting?')) {
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
            }
            window.location.href = 'index.html';
        }
    }
}

// Initialize meeting room when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const meetingRoom = new MeetingRoom();
});