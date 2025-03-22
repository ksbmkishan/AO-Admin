export let api_urls;

if (window.location.protocol === 'http:') {
    api_urls = 'http://192.168.29.16:5018/';
} else if (window.location.protocol === 'https:') {
    api_urls = 'http://192.168.29.16:5018/';
} else {
    console.log('Unknown protocol');
};