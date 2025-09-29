export let api_urls;

if (window.location.protocol === 'http:') {
    api_urls = 'https://api.astroone.in/';
} else if (window.location.protocol === 'https:') {
    api_urls = 'https://api.astroone.in/';
} else {
    console.log('Unknown protocol');
};