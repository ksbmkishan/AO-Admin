export let api_urls;

if (window.location.protocol === 'http:') {
    api_urls = 'https://astrooneapi.ksdelhi.net/';
} else if (window.location.protocol === 'https:') {
    api_urls = 'https://astrooneapi.ksdelhi.net/';
} else {
    console.log('Unknown protocol');
};