// bypass.js - Experimental Filter Interrupter

(function() {
    console.log("Bypass script initialized...");

    // 1. Block Popups and Alerts
    // Many filters use window.alert or popups to notify users of a block.
    window.alert = function() { return true; };
    window.confirm = function() { return true; };
    window.prompt = function() { return null; };

    // 2. Prevent Redirects (The "Freeze" Method)
    // This attempts to stop the page from unloading if a filter tries to push it to a block page.
    window.onbeforeunload = function() {
        return "Are you sure you want to leave? (Filter attempt detected)";
    };

    // 3. Securly/GoGuardian Redirect Interception
    // Filters often change window.location. This creates a trap to stop that.
    const originalLocation = window.location.href;
    
    Object.defineProperty(window, 'location', {
        set: function(value) {
            if (value.includes('securly') || value.includes('goguardian') || value.includes('blocked')) {
                console.warn("Blocked a filter redirect to: " + value);
                return originalLocation; // Force it to stay on your site
            }
            window.location.href = value;
        }
    });

    // 4. iFrame "Cloaking" 
    // Instead of navigating directly, we load the site in a full-screen iframe
    // so the extension only sees 'ineedamod.github.io' in the address bar.
    window.cloakSite = function(url) {
        document.body.innerHTML = '';
        const ifr = document.createElement('iframe');
        ifr.src = url;
        ifr.style.width = '100vw';
        ifr.style.height = '100vh';
        ifr.style.border = 'none';
        document.body.appendChild(ifr);
    };

})();
