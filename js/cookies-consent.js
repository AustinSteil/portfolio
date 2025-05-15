/**
 * Cookie Consent Management Script
 *
 * Author: Austin Steil
 * Version: 1.0.0
 * Last Updated: 2025-05-14
 *
 * This script manages cookie consent across the website, displaying a cookie banner
 * and handling user preferences for cookie usage. It implements a GDPR-compliant
 * cookie consent solution with options to accept all cookies or only necessary ones.
 *
 * Features:
 * - Cookie consent banner at the bottom of the page
 * - "Accept All" and "Accept Only Necessary" options
 * - Remembers user preferences across sessions
 * - Loads Google Analytics only when user consents
 * - Customizable appearance and text content
 * - Automatically creates and injects the banner into the DOM
 *
 * === HOW TO USE THIS SCRIPT ===
 *
 * 1. Include this script in your HTML:
 *    <script src="js/cookies-consent.js" defer></script>
 *
 * 2. The script will automatically:
 *    - Check if the user has already provided consent
 *    - If not, display the cookie consent banner
 *    - Handle user interactions with the banner
 *    - Load Google Analytics if the user accepts all cookies
 *
 * 3. To customize the appearance or text, edit the CONFIGURATION section below.
 *    You only need to change this file once, and it will update across all pages.
 *
 * === COOKIE TYPES MANAGED ===
 *
 * This script manages the following types of cookies:
 * - Necessary: Essential cookies required for the website to function properly
 * - Analytics: Cookies used to collect anonymous information about how visitors use the site
 *
 * === GOOGLE ANALYTICS IMPLEMENTATION ===
 *
 * The script will only load Google Analytics if the user accepts all cookies.
 * The Google Analytics tag is configured in the CONFIGURATION section below.
 *
 * === COOKIE STORAGE ===
 *
 * User preferences are stored in a cookie named "cookie_consent" with the following values:
 * - "all": User has accepted all cookies
 * - "necessary": User has accepted only necessary cookies
 * - undefined: User has not yet made a choice
 *
 * === CUSTOMIZATION ===
 *
 * You can customize the appearance and text of the cookie banner by modifying
 * the CONFIGURATION section below. This includes:
 * - Banner text and button labels
 * - Banner appearance (colors, position, etc.)
 * - Google Analytics tracking ID
 *
 * === COMPLIANCE INFORMATION ===
 *
 * This script is designed to help with GDPR, CCPA, and other privacy regulations by:
 * - Requiring explicit consent before setting non-essential cookies
 * - Providing clear options for users to choose their cookie preferences
 * - Remembering user preferences to avoid showing the banner repeatedly
 * - Only loading tracking scripts after consent is given
 *
 * Note: While this script helps with compliance, it may need to be adapted to
 * meet specific legal requirements in your jurisdiction.
 */

// ===== CONFIGURATION =====
// Change these values to customize your cookie consent implementation

// Banner text and button labels
const COOKIE_BANNER_TITLE = "Cookie Consent";
const COOKIE_BANNER_TEXT = "This website uses cookies to enhance your browsing experience. We use necessary cookies to ensure the website functions properly, and with your consent, analytics cookies to help us improve our website.";
const ACCEPT_ALL_BUTTON_TEXT = "Accept All";
const ACCEPT_NECESSARY_BUTTON_TEXT = "Accept Only Necessary";
const PRIVACY_POLICY_TEXT = "Privacy Policy";
const PRIVACY_POLICY_URL = "/privacy";

// Cookie settings
const COOKIE_NAME = "cookie_consent";
const COOKIE_EXPIRATION_DAYS = 365; // How long to remember the user's choice

// Google Analytics settings
const GA_TRACKING_ID = "G-MVD9DZT628"; // Your Google Analytics tracking ID

// Banner appearance
const BANNER_POSITION = "bottom"; // Options: "top", "bottom"
const BANNER_THEME = "light"; // Options: "light", "dark"
// =========================

// Wait for the DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the cookie consent functionality
    initCookieConsent();
});

/**
 * Initializes the cookie consent functionality
 * Checks if the user has already provided consent and acts accordingly
 */
function initCookieConsent() {
    // Check if user has already made a choice
    const userConsent = getCookie(COOKIE_NAME);

    if (userConsent === "all") {
        // User has accepted all cookies, load Google Analytics
        loadGoogleAnalytics();
    } else if (userConsent === "necessary") {
        // User has accepted only necessary cookies, do nothing
    } else {
        // User has not made a choice yet, show the banner
        createCookieBanner();
    }
}

/**
 * Creates and displays the cookie consent banner
 */
function createCookieBanner() {
    // Create the banner container
    const banner = document.createElement('div');
    banner.className = `cookie-banner ${BANNER_POSITION} ${BANNER_THEME}`;

    // Create the banner content
    const bannerContent = document.createElement('div');
    bannerContent.className = 'cookie-banner-content';

    // Add title
    const title = document.createElement('h3');
    title.textContent = COOKIE_BANNER_TITLE;

    // Add description text
    const description = document.createElement('p');
    description.textContent = COOKIE_BANNER_TEXT;

    // Create buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'cookie-banner-buttons';

    // Create "Accept All" button
    const acceptAllButton = document.createElement('button');
    acceptAllButton.className = 'cookie-accept-all';
    acceptAllButton.textContent = ACCEPT_ALL_BUTTON_TEXT;
    acceptAllButton.addEventListener('click', function() {
        acceptAllCookies();
    });

    // Create "Accept Only Necessary" button
    const acceptNecessaryButton = document.createElement('button');
    acceptNecessaryButton.className = 'cookie-accept-necessary';
    acceptNecessaryButton.textContent = ACCEPT_NECESSARY_BUTTON_TEXT;
    acceptNecessaryButton.addEventListener('click', function() {
        acceptNecessaryCookies();
    });

    // Create privacy policy link
    const privacyLink = document.createElement('a');
    privacyLink.href = PRIVACY_POLICY_URL;
    privacyLink.className = 'cookie-privacy-link';
    privacyLink.textContent = PRIVACY_POLICY_TEXT;

    // Assemble the banner
    buttonsContainer.appendChild(acceptAllButton);
    buttonsContainer.appendChild(acceptNecessaryButton);
    buttonsContainer.appendChild(privacyLink);

    bannerContent.appendChild(title);
    bannerContent.appendChild(description);
    bannerContent.appendChild(buttonsContainer);

    banner.appendChild(bannerContent);

    // Add the banner to the page
    document.body.appendChild(banner);

    // Add CSS for the banner
    addBannerStyles();
}

/**
 * Adds the necessary CSS styles for the cookie banner
 */
function addBannerStyles() {
    // Create a style element
    const style = document.createElement('style');

    // Define the CSS
    const css = `
        .cookie-banner {
            position: fixed;
            left: 0;
            width: 100%;
            background-color: var(--background-light);
            box-shadow: 0 -2px 10px var(--shadow-medium);
            z-index: 9999;
            padding: 1rem;
            display: flex;
            justify-content: center;
        }

        .cookie-banner.bottom {
            bottom: 0;
        }

        .cookie-banner.top {
            top: 0;
        }

        .cookie-banner.dark {
            background-color: var(--primary-color);
            color: var(--text-light);
        }

        .cookie-banner-content {
            max-width: 1200px;
            width: 90%;
            margin: 0 auto;
        }

        .cookie-banner h3 {
            margin-top: 0;
            margin-bottom: 0.5rem;
        }

        .cookie-banner p {
            margin-bottom: 1rem;
        }

        .cookie-banner-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            align-items: center;
        }

        .cookie-accept-all {
            background-color: var(--secondary-color);
            color: white;
            border: none;
            padding: 0.5rem 1.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color var(--transition-speed) ease;
        }

        .cookie-accept-all:hover {
            background-color: var(--accent-color);
        }

        .cookie-accept-necessary {
            background-color: transparent;
            border: 1px solid var(--border-medium);
            padding: 0.5rem 1.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color var(--transition-speed) ease;
        }

        .cookie-accept-necessary:hover {
            background-color: var(--background-light-gray);
        }

        .cookie-privacy-link {
            margin-left: auto;
            font-size: 0.9rem;
        }

        @media (max-width: 768px) {
            .cookie-banner-buttons {
                flex-direction: column;
                align-items: flex-start;
            }

            .cookie-privacy-link {
                margin-left: 0;
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
 * Handles the "Accept All" button click
 * Sets a cookie to remember the choice and loads Google Analytics
 */
function acceptAllCookies() {
    // Set cookie to remember user's choice
    setCookie(COOKIE_NAME, "all", COOKIE_EXPIRATION_DAYS);

    // Load Google Analytics
    loadGoogleAnalytics();

    // Remove the banner
    removeBanner();
}

/**
 * Handles the "Accept Only Necessary" button click
 * Sets a cookie to remember the choice
 */
function acceptNecessaryCookies() {
    // Set cookie to remember user's choice
    setCookie(COOKIE_NAME, "necessary", COOKIE_EXPIRATION_DAYS);

    // Remove the banner
    removeBanner();
}

/**
 * Removes the cookie banner from the DOM
 */
function removeBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
        banner.remove();
    }
}

/**
 * Loads the Google Analytics script
 */
function loadGoogleAnalytics() {
    // Create the first script element (gtag.js)
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;

    // Create the second script element (configuration)
    const configScript = document.createElement('script');
    configScript.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}', {
            'anonymize_ip': true
        });
    `;

    // Add the scripts to the document
    document.head.appendChild(gtagScript);
    document.head.appendChild(configScript);
}

/**
 * Sets a cookie with the given name, value, and expiration days
 *
 * @param {string} name - The name of the cookie
 * @param {string} value - The value to store in the cookie
 * @param {number} days - The number of days until the cookie expires
 */
function setCookie(name, value, days) {
    let expires = "";

    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
}

/**
 * Gets the value of a cookie by name
 *
 * @param {string} name - The name of the cookie to retrieve
 * @returns {string|null} The cookie value or null if not found
 */
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }

        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }

    return null;
}
