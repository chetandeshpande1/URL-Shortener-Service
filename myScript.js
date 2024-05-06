class URLShortener {
        
    constructor() {
    this.urlMap = new Map(); // Map to store long URLs and their corresponding short codes
    this.baseUrl = 'https://short.url/'; // Base URL for generating shortened URLs
    this.shortCodeLength = 6; 
}

    // Function to generate a random short code
    generateShortCode() {
        
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let shortCode = '';
    
        for (let i = 0; i < this.shortCodeLength; i++) {
            shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    
        return shortCode;
    }

    // Function to encode (shorten) a long URL
    encodeURL(longURL) {
        if (!this.isValidURL(longURL)) {
            
            alert("Invalid long URL")
            return null;
        }

        let shortCode;

        do {
            shortCode = this.generateShortCode();
        }
        while (this.urlMap.has(shortCode));

        const shortURL = this.baseUrl + shortCode;
        this.urlMap.set(shortCode, longURL);
        return shortURL;
    }

    // Function to decode (redirect) a shortened URL to original long URL
    decodeURL(shortURL) {

        const shortCode = shortURL.substring(this.baseUrl.length);

        if (this.urlMap.has(shortCode)) {
            const longURL = this.urlMap.get(shortCode);
            window.open(longURL, '_blank');
        }
        else {
            alert('Shortened URL not found');
        }
    }

    // Function to validate a URL
    isValidURL(url) {
        // Regular expression for URLs
        const urlRegex = /^(https?):\/\/(www\.[^\s/$.?#]+\.[^\s]*|[^\s/$.?#]+\.[^\s]*)$/;
        const invalidCharRegex = /[<>]/; // Regular expression to match invalid characters

        // Checking for missing protocol, wrong URLs, unsupported protocols, and invalid characters
        if (!urlRegex.test(url) || invalidCharRegex.test(url)) {
            return false;
        }

        // Check for exactly 3 'w' characters after the protocol
        const wCount = (url.match(/w/g) || []).length;
        
        if (url.startsWith('https://') && wCount !== 3) {
            return false;
        }

        // Check for valid domain format
        const domainRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z0-9-]{1,63}(?<!-)){1,}$/;
        if (!domainRegex.test(new URL(url).hostname)) {
            return false;
        }

        return true;
    }
}

const urlShortener = new URLShortener();

function shortenURL() {
    const longURL = document.getElementById('longURL').value;
    const shortURL = urlShortener.encodeURL(longURL);
    if (shortURL) {
        // document.getElementById('shortenedURL').textContent = shortURL;
        document.getElementById('shortenedURL').innerHTML = '<h5>' + shortURL + '</h5>';
    }
    else {
        // document.getElementById('shortenedURL').textContent = 'Invalid URL';
        document.getElementById('shortenedURL').innerHTML = '<h5>' + 'Invalid URL' + '</h5>';
    }
}

function redirectURL() {
    const shortURL = document.getElementById('shortURL').value;
    urlShortener.decodeURL(shortURL);
}