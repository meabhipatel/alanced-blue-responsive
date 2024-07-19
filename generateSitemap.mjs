import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

// Define your URLs
const urls = [
    { url: '/', changefreq: 'yearly', priority: 1.0 },
    { url: '/view-all/freelancer', changefreq: 'yearly', priority: 1.0 },
    { url: '/projects', changefreq: 'yearly', priority: 1.0 },
    { url: '/why-alanced', changefreq: 'yearly', priority: 1.0 },
    { url: '/enterprises', changefreq: 'yearly', priority: 1.0 },
    { url: '/about-us', changefreq: 'yearly', priority: 1.0 },
    { url: '/contact-us', changefreq: 'yearly', priority: 1.0 },
    { url: '/safety-security', changefreq: 'yearly', priority: 1.0 },
    { url: '/FAQ', changefreq: 'yearly', priority: 1.0 },
    { url: '/terms', changefreq: 'yearly', priority: 1.0 },
    { url: '/privacy-policy', changefreq: 'yearly', priority: 1.0 },
    { url: '/cookies', changefreq: 'yearly', priority: 1.0 },
    // Add more URLs as needed
];

// Create a SitemapStream
const stream = new SitemapStream({ hostname: 'https://www.alanced.com' });

// Add URLs to the sitemap
urls.forEach(url => {
    stream.write(url);
});

// End the stream
stream.end();

// Convert the stream to a promise
streamToPromise(stream)
    .then(sitemap => {
        // Create a write stream for the sitemap.xml file
        const writeStream = createWriteStream('./public/sitemap.xml');
        
        // Write the sitemap content to the file stream
        writeStream.write(sitemap);
        
        // Close the write stream
        writeStream.end();
    })
    .catch(err => {
        console.error(err);
    });

