        // Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement;

        // Check for saved user preference or use preferred color scheme
        const currentTheme = localStorage.getItem('theme') || 
                            (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        
        // Apply the current theme
        if (currentTheme === 'light') {
            htmlElement.setAttribute('data-theme', 'light');
            themeToggle.checked = true;
        }

        // Toggle theme on button click
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Parallax effect for project cards
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const parallaxItems = document.querySelectorAll('.project-card');
            
            parallaxItems.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const itemPosition = rect.top + scrollPosition;
                const speed = 0.1 * (index % 2 === 0 ? 1 : -1); // Alternate direction
                const offset = (scrollPosition - itemPosition) * speed;
                
                item.style.transform = `translateY(${offset}px)`;
            });
        });

        // Animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Animate icons on hover
        document.querySelectorAll('.tech-badge').forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                badge.querySelector('i')?.classList.add('animate-spin-slow');
            });
            badge.addEventListener('mouseleave', () => {
                badge.querySelector('i')?.classList.remove('animate-spin-slow');
            });
        });