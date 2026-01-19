// Cookie Consent and Google Tag Manager Integration
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already made a choice
    const consent = getCookie('cookie_consent');
    const banner = document.getElementById('cookie-consent-banner');
    
    // If no consent has been given, show the banner
    if (consent === '') {
        banner.style.display = 'block';
    } else if (consent === 'accepted') {
        // If consent was given previously, load GTM
        loadGoogleTagManager();
    }
    
    // Set up the accept button
    const acceptButton = document.getElementById('accept-cookies');
    if (acceptButton) {
        acceptButton.addEventListener('click', function() {
            // Set cookie to remember the choice (expires in 1 year)
            setCookie('cookie_consent', 'accepted', 365);
            banner.style.display = 'none';
            // Load GTM after accepting
            loadGoogleTagManager();
        });
    }
    
    // Function to get cookie value
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return '';
    }
    
    // Function to set cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
    }
    
    // Function to load Google Tag Manager
    function loadGoogleTagManager() {
        // Only load if consent was given
        if (getCookie('cookie_consent') === 'accepted') {
            // Create and append the GTM script
            const gtmScript = document.createElement('script');
            gtmScript.innerHTML = `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','G-CNT6X7GCN7');
            `;
            
            // Create and append the noscript iframe
            const noscript = document.createElement('noscript');
            const iframe = document.createElement('iframe');
            iframe.src = 'https://www.googletagmanager.com/ns.html?id=G-CNT6X7GCN7';
            iframe.height = '0';
            iframe.width = '0';
            iframe.style.display = 'none';
            iframe.style.visibility = 'hidden';
            noscript.appendChild(iframe);
            
            // Add both to the document
            document.head.appendChild(gtmScript);
            document.body.insertBefore(noscript, document.body.firstChild);
            
            // Initialize the data layer
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Configure GTM with your container ID
            gtag('config', 'G-CNT6X7GCN7', {
                'anonymize_ip': true,
                'page_title': document.title,
                'page_path': window.location.pathname + window.location.search
            });
            
            // Track the initial page view
            gtag('event', 'page_view');
        }
    }
});
