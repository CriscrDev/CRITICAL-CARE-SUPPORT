// js/script.js - Versión Corregida

// Slideshow functionality mejorada
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    // Remover clase active de todas las slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("active");
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Mostrar slide actual con animación
    slides[slideIndex - 1].style.display = "block";
    setTimeout(() => {
        slides[slideIndex - 1].classList.add("active");
    }, 50);
    
    dots[slideIndex - 1].className += " active";
}

// Auto slide change con transición mejorada
setInterval(() => {
    plusSlides(1);
}, 6000);

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

// Animación de elementos al hacer scroll
function checkVisibility() {
    const elements = document.querySelectorAll('.service-card, .nursing-item, .mission-item, .doctor-card, .membership-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Ejecutar al cargar y al hacer scroll
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Header con efecto al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
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

// Doctor Modal Functionality - Actualizada para imágenes completas
const doctorCards = document.querySelectorAll('.doctor-card');
const modal = document.getElementById('doctor-modal');
const closeModal = document.querySelector('.close-modal');
const modalDoctorImg = document.getElementById('modal-doctor-img');
const modalDoctorName = document.getElementById('modal-doctor-name');
const modalDoctorSpecialty = document.getElementById('modal-doctor-specialty');
const modalDoctorDetails = document.getElementById('modal-doctor-details');

// Doctor information - Actualizada para imágenes completas
const doctorsInfo = {
    1: {
        name: "Dr. Diego Alejandro Parra Hernández",
        specialty: "Urgenciólogo",
        image: "Assets/Graphics/Dr. Diego Parra.jpeg",
        details: "Especialista en urgencias médicas con amplia experiencia en atención prehospitalaria. Formado en las mejores instituciones médicas del país, el Dr. Parra cuenta con certificaciones en manejo avanzado de trauma y soporte vital avanzado. Certificado por el Consejo Mexicano de Medicina de Urgencias y con certificaciones internacionales en el manejo de paciente críticos.",
        showLogos: true,
        showMedicinaCLogo: true,
        fullImage: true
    },
    2: {
        name: "Dra. Gabriela Morales Corral",
        specialty: "Urgencióloga",
        image: "Assets/Graphics/Dr.Gabriela.jpeg",
        details: "Especialista en urgencias médicas con amplia experiencia en atención prehospitalaria. La Dra. Morales ha participado en numerosos programas de capacitación en medicina de emergencia y cuenta con amplia experiencia en manejo de crisis. Certificada por el Consejo Mexicano de Medicina de Urgencias y con certificaciones internacionales en el manejo de paciente críticos.",
        showLogos: true,
        showMedicinaCLogo: true,
        fullImage: true
    },
    3: {
        name: "Dra. Carmen Martínez Martínez",
        specialty: "Medicina Crítica",
        image: "Assets/Graphics/Dr.Carmen.jpeg",
        details: "Especialista en medicina crítica y cuidados intensivos. La Dra. Martínez cuenta con amplia experiencia en unidades de terapia intensiva y manejo de pacientes en estado crítico. Certificada en ventilación mecánica y monitorización hemodinámica. Certificada por el Consejo Mexicano de Medicina de Urgencias y con certificaciones internacionales en el manejo de paciente críticos.",
        showLogos: true,
        showConsejoLogo: true,
        fullImage: true
    },
    4: {
        name: "Dra. Victoria Adriana Díaz Juárez",
        specialty: "Medicina Crítica",
        image: "Assets/Graphics/Dr.Victoria.jpeg",
        details: "Especialista en medicina crítica con subespecialidad en neurocrítica. La Dra. Díaz ha liderado equipos de respuesta rápida en situaciones de emergencia complejas y cuenta con certificaciones internacionales en soporte vital avanzado. Certificada por el Consejo Mexicano de Medicina de Urgencias y con certificaciones internacionales en el manejo de paciente críticos.",
        showLogos: true,
        showConsejoLogo: true,
        fullImage: true 
    },
    5: {
        name: "Enf. Sergio E. Martinez",
        specialty: "Tecnico En Emergencias Medicas - Avanzado",
        image: "Assets/Graphics/TEM. Winnie.png",
        details: "Técnico en Urgencias Médicas especializado en atención prehospitalaria. Cuenta con certificaciones internacionales PHTLS, PALS, AMLS, ACLS y BLS para el manejo avanzado de trauma y soporte vital. Certificado por el Consejo Mexicano de Medicina de Urgencias y con certificaciones internacionales en el manejo de paciente críticos.",
        showLogos: true,
        showTEMLogo: true,
        fullImage: true 
    }
};

// Open modal when clicking on doctor card - Función actualizada para imágenes completas
doctorCards.forEach(card => {
    card.addEventListener('click', function() {
        const doctorId = this.getAttribute('data-doctor');
        const doctor = doctorsInfo[doctorId];
        const modalHeader = document.getElementById('modal-header');
        const modalBody = document.querySelector('.modal-body');
        
        if (doctor) {
            // Limpiar el header del modal
            modalHeader.innerHTML = '';
            modalHeader.className = 'modal-header';
            
            // Resetear clases del modal body
            modalBody.className = 'modal-body';
            
            // Agregar logos si showLogos es true
            if (doctor.showLogos) {
                const logosContainer = document.createElement('div');
                logosContainer.className = 'logos-container';
                
                // Logo de Critical Care Support
                const ccsLogo = document.createElement('img');
                ccsLogo.src = 'Assets/Graphics/ICON.png';
                ccsLogo.alt = 'Critical Care Support Logo';
                ccsLogo.className = 'modal-logo';
                logosContainer.appendChild(ccsLogo);
                
                // Logo del Consejo Mexicano de Medicina Crítica
                if (doctor.showMedicinaCLogo) {
                    const medcrictica = document.createElement('img');
                    medcrictica.src = 'Assets/Graphics/cmu.png';
                    medcrictica.alt = 'Consejo Mexicano de Medicina Crítica A.C.';
                    medcrictica.className = 'medicina-Critica';
                    logosContainer.appendChild(medcrictica);
                }
                
                // Logo del Consejo de Urgencias
                if (doctor.showConsejoLogo) {
                    const consejoLogo = document.createElement('img');
                    consejoLogo.src = 'Assets/Graphics/cmmc.png';
                    consejoLogo.alt = 'Consejo Mexicano de Medicina Crítica A.C.';
                    consejoLogo.className = 'consejo-logo';
                    logosContainer.appendChild(consejoLogo);
                }

                // Logo TEM - AMBOS LOGOS
                if (doctor.showTEMLogo) {
                    // Primer logo - TEM AVANZADO
                    const TEMLogo = document.createElement('img');
                    TEMLogo.src = 'Assets/Graphics/TEM.png';
                    TEMLogo.alt = 'TEM - A';
                    TEMLogo.className = 'TEM';
                    logosContainer.appendChild(TEMLogo);
                    
                  
                }
                
                modalHeader.appendChild(logosContainer);
                
                // Título del modal
                const title = document.createElement('h2');
                title.textContent = 'Información del Profesional';
                title.className = 'modal-title';
                modalHeader.appendChild(title);
                
                modalHeader.classList.add('with-logos');
                
                // Si solo hay un logo, agregar clase para centrado individual
                if (!doctor.showConsejoLogo && !doctor.showMedicinaCLogo && !doctor.showTEMLogo) {
                    modalHeader.classList.add('single-logo');
                }
            }
            
            // Configurar la información del doctor
            modalDoctorImg.src = doctor.image;
            modalDoctorImg.alt = doctor.name;
            modalDoctorName.textContent = doctor.name;
            modalDoctorSpecialty.textContent = doctor.specialty;
            modalDoctorDetails.textContent = doctor.details;
            
            // Aplicar estilo de imagen completa o compacta
            if (doctor.fullImage) {
                modalBody.classList.remove('compact');
            } else {
                modalBody.classList.add('compact');
            }
            
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