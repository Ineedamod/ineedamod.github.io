// browser.js
function launch() {
    let input = document.getElementById('urlInput').value.trim();
    if (!input) return;

    let targetUrl = "";
    // If it's a URL, use it; otherwise, search DuckDuckGo
    if (input.includes('.') && !input.includes(' ')) {
        targetUrl = input.startsWith('http') ? input : 'https://' + input;
    } else {
        targetUrl = 'https://duckduckgo.com' + encodeURIComponent(input);
    }
    
    const frame = document.getElementById('view');
    frame.setAttribute('src', targetUrl);
}

document.getElementById('urlInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') launch();
});
