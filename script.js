// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website Permintaan Maaf Dimas Telah Aktif! 💖');
    
    // Typewriter Effect untuk Pesan Utama
    typeWriterEffect();
    
    // Inisialisasi semua event listeners
    initEventListeners();
    
    // Auto floating hearts
    createFloatingHearts();
    
    // Broken heart repair animation
    setTimeout(() => {
        document.querySelector('.broken-heart').style.opacity = '0';
        document.querySelector('.repaired-heart').style.opacity = '1';
    }, 3000);
});

// Typing Effect
function typeWriterEffect() {
    const messages = document.querySelectorAll('.typing-text p');
    messages.forEach((msg, index) => {
        msg.style.animationDelay = `${(index * 0.5) + 0.5}s`;
    });
}

// Create Floating Hearts
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const emojis = ['💖', '🥺', '😭', '💘', '💌', '💔', '❤️‍🩹'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.position = 'absolute';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.animation = `float ${Math.random() * 20 + 10}s infinite linear ${Math.random() * 5}s`;
        container.appendChild(heart);
    }
}

// Function buat kirim notifikasi WhatsApp
async function sendWhatsAppAuto() {
    try {
        // Tampilkan loading
        showLoading();
        
        // Panggil API route kita di Vercel
        const response = await fetch('/api/whatsapp/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'forgiveness',
                timestamp: new Date().toISOString()
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Kalo sukses
            console.log("✅ WhatsApp terkirim otomatis!");
            showSuccessNotification();
        } else {
            // Fallback ke WhatsApp Web biasa
            console.log("⚠️ Pakai fallback WhatsApp Web");
            openWhatsAppWeb();
        }
        
    } catch (error) {
        console.error("❌ Error:", error);
        // Fallback ke WhatsApp Web
        openWhatsAppWeb();
    }
}

// Function WhatsApp Web fallback
function openWhatsAppWeb() {
    const phone = "0895611127740";
    const message = "Pacar cantiknya dimas telah memaafkan 😍💖";
    const encodedMsg = encodeURIComponent(message);
    const whatsappURL = `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMsg}`;
    
    // Buka di tab baru
    window.open(whatsappURL, '_blank');
    
    // Kasih instruksi
    alert("Buka WhatsApp Web dan pencet SEND ya sayangg! 💌");
}


// Update event listener
forgiveBtn.addEventListener('click', async function() {
    // 1. Update button
    this.innerHTML = '<i class="fas fa-heart-circle-check"></i> TERIMA KASIH SAYANGG!! 😍';
    this.classList.remove('animate__pulse', 'animate__infinite');
    
    // 2. Tampilkan response message
    responseMessage.style.display = 'block';
    responseMessage.classList.add('animate__animated', 'animate__bounceIn');
    
    // 3. KIRIM WHATSAPP OTOMATIS
    await sendWhatsAppAuto();
    
    // 4. Efek lainnya
    createHeartExplosion();
    document.title = "😍 Sayangg Udah Maafin Dimas!";
});
// Inisialisasi Event Listeners
function initEventListeners() {
    const forgiveBtn = document.getElementById('forgiveBtn');
    const responseMessage = document.getElementById('responseMessage');
    
    // Show Message dari Botol
    const showMessageBtn = document.getElementById('showMessage');
    const messages = document.querySelectorAll('.message');
    let messageIndex = 0;
    
    showMessageBtn.addEventListener('click', function() {
        if (messageIndex < messages.length) {
            // Hide all messages first
            messages.forEach(msg => msg.style.display = 'none');
            
            // Show current message
            messages[messageIndex].style.display = 'block';
            messages[messageIndex].classList.add('animate__animated', 'animate__fadeIn');
            
            // Update button text
            const messageTexts = [
                "💌 Baca Pesan Lainnya",
                "📨 Masih Ada Pesan Lagi",
                "💖 Baca Yang Terakhir",
                "🎉 Selesai! Dimas Sayang Kamu!"
            ];
            
            if (messageIndex < messageTexts.length) {
                this.innerHTML = `<i class="fas fa-heart"></i> ${messageTexts[messageIndex]}`;
            }
            
            messageIndex++;
            
            // Reset index
            if (messageIndex >= messages.length) {
                messageIndex = 0;
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-heart"></i> Baca Ulang Pesan Dari Dimas';
                }, 1000);
            }
        }
    });
    
    // Add Heart Button
    const addHeartBtn = document.getElementById('addHeart');
    addHeartBtn.addEventListener('click', function() {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = `${Math.random() * window.innerWidth}px`;
        heart.style.top = `${window.innerHeight}px`;
        heart.style.fontSize = `${Math.random() * 30 + 20}px`;
        heart.style.zIndex = '9999';
        document.body.appendChild(heart);
        
        // Animate heart
        anime({
            targets: heart,
            top: -100,
            opacity: [1, 0],
            duration: 2000,
            easing: 'easeOutExpo',
            complete: function() {
                heart.remove();
            }
        });
    });
    
    // Hover effect untuk cards
    const cards = document.querySelectorAll('.apology-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('animate__pulse');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('animate__pulse');
        });
    });
    
    // Auto scroll animation
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect untuk beberapa elemen
        document.querySelector('.message-box').style.transform = `translateY(${rate * 0.1}px)`;
        
        // Animate elements on scroll
        animateOnScroll();
    });
}

// Heart Explosion Effect
function createHeartExplosion() {
    const container = document.querySelector('.hearts-animation');
    const heartCount = 50;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('span');
        heart.innerHTML = '💖';
        heart.style.position = 'absolute';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        heart.style.opacity = '0';
        
        container.appendChild(heart);
        
        // Anime.js explosion
        anime({
            targets: heart,
            translateX: () => anime.random(-300, 300),
            translateY: () => anime.random(-300, 300),
            rotate: () => anime.random(-360, 360),
            opacity: [
                { value: 1, duration: 200 },
                { value: 0, duration: 800 }
            ],
            duration: 1200,
            easing: 'easeOutExpo',
            complete: function() {
                heart.remove();
            }
        });
    }
}

// Animate on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate__animated');
            
            // Add different animations based on element type
            if (element.classList.contains('card')) {
                element.classList.add('animate__fadeInUp');
            }
        }
    });
}

// Sound Effect (Optional)
function playSuccessSound() {
    // Buat sound effect sederhana
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 523.25; // C5
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
}

// Tambahkan class animate-on-scroll ke elemen yang diinginkan
document.querySelectorAll('.apology-card').forEach(card => {
    card.classList.add('animate-on-scroll');
});

// Inisialisasi anime.js untuk efek tambahan
setTimeout(() => {
    // Pulse animation untuk tombol utama
    anime({
        targets: '#forgiveBtn',
        scale: [1, 1.05, 1],
        duration: 1500,
        loop: true,
        easing: 'easeInOutSine'
    });
}, 1000);