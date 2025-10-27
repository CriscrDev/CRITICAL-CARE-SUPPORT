// js/script.js
// Slideshow functionality
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Funcionalidad del menú desplegable
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');

// Abrir/cerrar menú desplegable
dropdownBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownContent.classList.toggle('show');
    dropdownBtn.classList.toggle('active');
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(e) {
    if (!dropdownBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
        dropdownContent.classList.remove('show');
        dropdownBtn.classList.remove('active');
    }
});

// Cerrar menú al seleccionar una opción
dropdownContent.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        dropdownContent.classList.remove('show');
        dropdownBtn.classList.remove('active');
        
        // Smooth scroll para enlaces internos
        const targetId = e.target.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    }
});

// Cerrar menú con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        dropdownContent.classList.remove('show');
        dropdownBtn.classList.remove('active');
    }
});

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Auto slide change
setInterval(() => {
    plusSlides(1);
}, 5000);

// Mobile menu toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                document.querySelector('.nav').classList.remove('active');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Doctor Modal Functionality
const doctorCards = document.querySelectorAll('.doctor-card');
const modal = document.getElementById('doctor-modal');
const closeModal = document.querySelector('.close-modal');
const modalDoctorImg = document.getElementById('modal-doctor-img');
const modalDoctorName = document.getElementById('modal-doctor-name');
const modalDoctorSpecialty = document.getElementById('modal-doctor-specialty');
const modalDoctorDetails = document.getElementById('modal-doctor-details');

// Doctor information
const doctorsInfo = {
    1: {
        name: "Dr. Diego Alejandro Parra Hernández",
        specialty: "Urgenciólogo",
        image: "Assets/Graphics/cmmc.png",
        details: "Especialista en urgencias médicas con amplia experiencia en atención prehospitalaria. Formado en las mejores instituciones médicas del país, el Dr. Parra cuenta con certificaciones en manejo avanzado de trauma y soporte vital avanzado."
    },
    2: {
        name: "Dra. Gabriela Morales Corral",
        specialty: "Urgencióloga",
        image: "Assets/Graphics/cmmc.png",
        details: "Especialista en urgencias médicas con enfoque en atención pediátrica y geriátrica. La Dra. Morales ha participado en numerosos programas de capacitación en medicina de emergencia y cuenta con amplia experiencia en manejo de crisis."
    },
    3: {
        name: "Dra. Carmen Martínez Martínez",
        specialty: "Medicina Crítica",
        image: "Assets/Graphics/cmu.png",
        details: "Especialista en medicina crítica y cuidados intensivos. La Dra. Martínez cuenta con amplia experiencia en unidades de terapia intensiva y manejo de pacientes en estado crítico. Certificada en ventilación mecánica y monitorización hemodinámica."
    },
    4: {
        name: "Dra. Victoria Adriana Díaz Juárez",
        specialty: "Medicina Crítica",
        image: "Assets/Graphics/cmu.png",
        details: "Especialista en medicina crítica con subespecialidad en neurocrítica. La Dra. Díaz ha liderado equipos de respuesta rápida en situaciones de emergencia complejas y cuenta con certificaciones internacionales en soporte vital avanzado."
    }
};

// Open modal when clicking on doctor card
doctorCards.forEach(card => {
    card.addEventListener('click', function() {
        const doctorId = this.getAttribute('data-doctor');
        const doctor = doctorsInfo[doctorId];
        
        if (doctor) {
            modalDoctorImg.src = doctor.image;
            modalDoctorImg.alt = doctor.name;
            modalDoctorName.textContent = doctor.name;
            modalDoctorSpecialty.textContent = doctor.specialty;
            modalDoctorDetails.textContent = doctor.details;
            
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    });
});

// Close modal when clicking on X
closeModal.addEventListener('click', function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    
    // In a real application, you would send this data to a server
    // For now, we'll just show an alert
    alert(`Gracias ${name}, hemos recibido tu mensaje. Te contactaremos pronto en ${email}.`);
    
    // Reset form
    this.reset();
});

// Sticky header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Efectos de hover mejorados para tarjetas
const cards = document.querySelectorAll('.service-card, .membership-card, .nursing-item, .mission-item, .doctor-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(19, 24, 120, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
    });
});