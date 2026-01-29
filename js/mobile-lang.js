// Mobile Language Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if mobile device
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Show/hide mobile language dropdown based on screen size
    function toggleMobileLanguageDropdown() {
        const mobileDropdown = document.querySelector('.mobile-lang-dropdown');
        const desktopSelector = document.querySelector('.language-selector');
        
        if (mobileDropdown && desktopSelector) {
            if (isMobile()) {
                mobileDropdown.style.display = 'block';
                desktopSelector.style.display = 'none';
            } else {
                mobileDropdown.style.display = 'none';
                desktopSelector.style.display = 'flex';
            }
        }
    }
    
    // Initialize on load
    toggleMobileLanguageDropdown();
    
    // Update on resize
    window.addEventListener('resize', toggleMobileLanguageDropdown);
    
    // Mobile language toggle functionality
    const mobileLangToggle = document.getElementById('mobileLangToggle');
    const mobileLangMenu = document.getElementById('mobileLangMenu');
    const mobileLangOptions = document.querySelectorAll('.mobile-lang-option');
    
    if (mobileLangToggle && mobileLangMenu) {
        // Toggle menu
        mobileLangToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileLangMenu.classList.toggle('show');
            mobileLangToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileLangToggle.contains(e.target) && !mobileLangMenu.contains(e.target)) {
                mobileLangMenu.classList.remove('show');
                mobileLangToggle.classList.remove('active');
            }
        });
        
        // Handle language selection
        mobileLangOptions.forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.dataset.lang;
                const flagImg = this.querySelector('img').src;
                const langText = this.querySelector('span').textContent;
                
                // Update toggle button
                mobileLangToggle.querySelector('img').src = flagImg;
                mobileLangToggle.querySelector('span').textContent = langText;
                
                // Update active state
                mobileLangOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Close menu
                mobileLangMenu.classList.remove('show');
                mobileLangToggle.classList.remove('active');
                
                // Trigger language change (if translation system exists)
                if (window.translatePage && typeof window.translatePage === 'function') {
                    window.translatePage(lang);
                }
                
                // Update desktop buttons to match
                const desktopButtons = document.querySelectorAll('.flag-btn');
                desktopButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.lang === lang) {
                        btn.classList.add('active');
                    }
                });
                
                // Save language preference
                localStorage.setItem('preferredLanguage', lang);
                
                // Trigger language change event
                const event = new CustomEvent('languageChange', {
                    detail: { lang: lang }
                });
                document.dispatchEvent(event);
            });
        });
    }
});
