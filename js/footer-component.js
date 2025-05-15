/**
 * Dynamic Footer Component Script
 *
 * Author: Austin Steil
 * Version: 1.0.0
 * Last Updated: 2025-05-14
 *
 * This script automatically generates a consistent footer across all pages of the website.
 * It creates the copyright notice, privacy links, and cookie management options.
 *
 * Features:
 * - Consistent footer across all pages
 * - Dynamic copyright year that updates automatically
 * - "Do Not Sell or Share My Personal Information" link for CCPA compliance
 * - "Manage Cookies" link to reopen the cookie consent banner
 * - Customizable footer content and links
 * - Single source of truth for footer content
 *
 * === HOW TO USE THIS SCRIPT ===
 *
 * 1. Include this script in your HTML:
 *    <script src="js/footer-component.js" defer></script>
 *
 *    For pages in subdirectories, adjust the path accordingly:
 *    <script src="../js/footer-component.js" defer></script>
 *
 * 2. Add an empty element with the ID "site-footer" where you want the footer to appear:
 *    <div id="site-footer"></div>
 *
 * 3. To customize the footer content or links, edit the CONFIGURATION section below.
 *    You only need to change this file once, and it will update across all pages.
 *
 * 4. The script will automatically:
 *    - Create the footer structure in the DOM
 *    - Add the current year to the copyright notice
 *    - Add links for privacy policy, cookie management, and CCPA compliance
 *
 * === HTML STRUCTURE GENERATED ===
 *
 * This script generates the following HTML structure:
 *
 * <footer>
 *   <div class="container">
 *     <div class="footer-content">
 *       <div class="footer-row">
 *         <div class="copyright">© 2025 Austin Steil. All rights reserved.</div>
 *         <div class="footer-links">
 *           <a href="/privacy">Privacy Policy</a>
 *           <a href="#" onclick="reopenCookieBanner()">Manage Cookies</a>
 *           <a href="#" onclick="reopenCookieBanner()">Do Not Sell or Share My Personal Information</a>
 *         </div>
 *       </div>
 *     </div>
 *   </div>
 * </footer>
 */

// ===== CONFIGURATION =====
// Change these values to customize your footer

// Copyright information
const COPYRIGHT_NAME = "Austin Steil";
const COPYRIGHT_TEXT = "All rights reserved.";

// Footer links
const FOOTER_LINKS = [
    {
        text: "Privacy Policy",
        url: "/privacy",
        class: "privacy-link"
    },
    {
        text: "Manage Cookies",
        url: "#",
        class: "manage-cookies-link"
    },
    {
        text: "Do Not Sell or Share My Personal Information",
        url: "/privacy#ccpa-rights",
        class: "ccpa-link"
    }
];
// =========================

document.addEventListener('DOMContentLoaded', function() {
    // Create and insert the footer
    createFooter();

    // Add footer styles
    addFooterStyles();
});

/**
 * Creates the footer structure and inserts it into the DOM
 */
function createFooter() {
    // Find the footer container element
    const footerContainer = document.getElementById('site-footer');

    // If the container doesn't exist, exit the function
    if (!footerContainer) {
        console.warn('Footer container with ID "site-footer" not found.');
        return;
    }

    // Create the footer element
    const footer = document.createElement('footer');

    // Create the container div
    const container = document.createElement('div');
    container.className = 'container';

    // Create the footer content div
    const footerContent = document.createElement('div');
    footerContent.className = 'footer-content';

    // Create the footer row div
    const footerRow = document.createElement('div');
    footerRow.className = 'footer-row';

    // Create the copyright div
    const copyright = document.createElement('div');
    copyright.className = 'copyright';

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Set the copyright text
    copyright.innerHTML = `&copy; ${currentYear} ${COPYRIGHT_NAME}. ${COPYRIGHT_TEXT}`;

    // Create the footer links div
    const footerLinks = document.createElement('div');
    footerLinks.className = 'footer-links';

    // Add each footer link
    FOOTER_LINKS.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.textContent = link.text;
        linkElement.className = link.class || '';

        if (link.class === 'manage-cookies-link') {
            // Special handling for the Manage Cookies link
            linkElement.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent the default action

                // Call our local reopenCookieBanner function
                reopenCookieBanner();

                // Return false to ensure no navigation occurs
                return false;
            });
        }

        footerLinks.appendChild(linkElement);
    });

    // Assemble the footer
    footerRow.appendChild(copyright);
    footerRow.appendChild(footerLinks);
    footerContent.appendChild(footerRow);
    container.appendChild(footerContent);
    footer.appendChild(container);

    // Insert the footer into the container
    footerContainer.appendChild(footer);
}

/**
 * Adds the necessary CSS styles for the footer
 */
function addFooterStyles() {
    // Create a style element
    const style = document.createElement('style');

    // Define the CSS
    const css = `
        footer {
            background-color: var(--background-light);
            padding: 1.5rem 0;
            border-top: 1px solid var(--border-light);
        }

        .footer-content {
            width: 100%;
        }

        .footer-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
            line-height: 1.5;
        }

        .copyright {
            font-size: 0.9rem;
            color: var(--text-medium);
            margin: 0;
            line-height: 1.5;
        }

        .footer-links {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
            align-items: center;
            margin: 0;
            line-height: 1.5;
        }

        .footer-links a {
            font-size: 0.9rem;
            color: var(--text-medium);
            text-decoration: none;
            transition: color var(--transition-speed) ease;
            display: inline-block;
            line-height: 1.5;
            margin: 0;
        }

        .footer-links a:hover {
            color: var(--primary-color);
            text-decoration: underline;
        }

        @media (max-width: 768px) {
            .footer-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }

            .footer-links {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
                margin-top: 0.5rem;
            }
        }
    `;

    // Add the CSS to the style element
    style.appendChild(document.createTextNode(css));

    // Add the style element to the head
    document.head.appendChild(style);
}

/**
 * Function to reopen the cookie banner
 * This is a wrapper for the function in cookies-consent.js
 */
function reopenCookieBanner() {
    console.log("Footer component: reopenCookieBanner called");

    // Clear the existing consent cookie first to ensure the banner will show
    document.cookie = "cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax";

    // Check if the reopenCookieBanner function exists in the global scope
    if (typeof window.reopenCookieBanner === 'function' && window.reopenCookieBanner !== reopenCookieBanner) {
        // Call the function from cookies-consent.js
        console.log("Calling global reopenCookieBanner function");
        window.reopenCookieBanner();
    } else {
        console.log("Using fallback implementation");

        // If we're on a page other than the home page, redirect to the home page
        // This ensures the cookie banner will show properly
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
            window.location.href = '/';
        } else {
            // If we're already on the home page, just reload
            window.location.reload();
        }
    }
}

// No need to expose our function globally as we're using it internally
