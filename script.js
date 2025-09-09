document.addEventListener('DOMContentLoaded', function () {
            // Mobile menu toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Smooth scrolling for nav links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    mobileMenu.classList.add('hidden'); // Hide mobile menu on click
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Active nav link highlighting on scroll
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.4
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href').substring(1) === entry.target.id) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                observer.observe(section);
            });

        
        // Typewriter effect for the heading
            const typewriterTextElement = document.getElementById('typewriter-output');
            const textToType = "I AM VIDHI"; // Changed to uppercase
            let i = 0;
            let isDeleting = false;
            let currentText = '';
            const typingSpeed = 2000 / textToType.length; // 2 seconds to type
            const deletingSpeed = 100; // Faster deletion
            const delayAfterTyping = 2000; // 2 seconds pause after typing
            const delayAfterDeleting = 100; // 1 second pause after deleting

            function typeWriterEffect() {
                if (isDeleting) {
                    // Deleting text
                    currentText = textToType.substring(0, currentText.length - 1);
                } else {
                    // Typing text
                    currentText = textToType.substring(0, currentText.length + 1);
                }
                typewriterTextElement.innerHTML = currentText;
                typewriterTextElement.style.borderRight = '.15em solid #AF5279'; // Ensure cursor is visible during typing/deleting

                let speed = typingSpeed;
                if (isDeleting) {
                    speed = deletingSpeed;
                } else if (currentText === textToType) {
                    speed = delayAfterTyping; // Pause after typing full text
                    isDeleting = true;
                } else if (currentText === '') {
                    speed = delayAfterDeleting; // Pause after deleting full text
                    isDeleting = false;
                }

                setTimeout(typeWriterEffect, speed);
            }
            typeWriterEffect(); // Start the effect
        });