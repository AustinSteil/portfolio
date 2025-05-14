/**
 * Dynamic Header Component Script
 *
 * Author: Austin Steil
 * Version: 1.0.0
 * Last Updated: 2025-05-12
 *
 * This script automatically generates a consistent header across all pages of the website.
 * It creates the logo, navigation menu, and mobile menu toggle, and handles the mobile menu functionality.
 *
 * Features:
 * - Consistent header across all pages
 * - Automatically highlights the active page in the navigation
 * - Responsive design with mobile menu toggle
 * - Customizable navigation items and logo text
 * - Single source of truth for header content
 *
 * === HOW TO USE THIS SCRIPT ===
 *
 * 1. Include this script in your HTML:
 *    <script src="js/header-component.js" defer></script>
 *
 *    For pages in subdirectories, adjust the path accordingly:
 *    <script src="../js/header-component.js" defer></script>
 *
 * 2. Add an empty element with the ID "site-header" where you want the header to appear:
 *    <div id="site-header"></div>
 *
 * 3. To customize the navigation items or logo text, edit the CONFIGURATION section below.
 *    You only need to change this file once, and it will update across all pages.
 *
 * 4. The script will automatically:
 *    - Create the header structure in the DOM
 *    - Add the "active" class to the current page's navigation item
 *    - Handle the mobile menu toggle functionality
 *
 * === HTML STRUCTURE GENERATED ===
 *
 * This script generates the following HTML structure:
 *
 * <header>
 *   <div class="container">
 *     <div class="mobile-header-wrapper">
 *       <button class="mobile-menu-toggle" aria-label="Toggle menu">
 *         <div class="menu-icon">
 *           <span class="menu-line"></span>
 *           <span class="menu-line"></span>
 *           <span class="menu-line"></span>
 *         </div>
 *       </button>
 *       <div class="logo">
 *         <a href="/">Austin Steil</a>
 *       </div>
 *     </div>
 *     <nav class="main-nav">
 *       <ul>
 *         <li><a href="/business">Business</a></li>
 *         <li><a href="/technology">Technology</a></li>
 *         <li><a href="/clinical-care">Clinical Care</a></li>
 *         <li><a href="/safety">Safety Professional</a></li>
 *         <li><a href="/leadership">Leadership</a></li>
 *         <li><a href="#" class="cta-button">Contact Me</a></li>
 *       </ul>
 *     </nav>
 *   </div>
 * </header>
 *
 * === CSS STYLING ===
 *
 * The header component uses the following CSS classes:
 * - header: The main header container
 * - .container: Centers the header content
 * - .mobile-header-wrapper: Wrapper for mobile layout elements
 * - .logo: Styles the logo text
 * - .main-nav: Styles the navigation menu
 * - .mobile-menu-toggle: Styles the mobile menu toggle button
 * - .menu-icon: Container for the menu icon
 * - .menu-line: Individual lines in the menu icon
 *
 * These styles are defined in your main CSS file (css/styles.css).
 *
 * === MOBILE MENU FUNCTIONALITY ===
 *
 * The header component includes JavaScript to handle the mobile menu toggle:
 * - Clicking the mobile menu toggle button shows/hides the navigation menu
 * - Clicking outside the menu closes it
 * - Pressing the Escape key closes the menu
 * - Clicking a navigation link closes the menu
 * - The menu is responsive and adapts to different screen sizes
 *
 * === ACTIVE PAGE HIGHLIGHTING ===
 *
 * The header component automatically adds the 'active' class to the current page's
 * navigation item based on the URL path. This allows you to style the active page
 * differently in your CSS.
 *
 * === TROUBLESHOOTING ===
 *
 * If the header doesn't appear:
 * 1. Make sure you've included the header-component.js script in your HTML
 * 2. Make sure you've added the <div id="site-header"></div> container
 * 3. Check the browser console for any JavaScript errors
 */

// ===== CONFIGURATION =====
// Change these values to customize your header

// Logo text that appears in the top left
const HEADER_LOGO_TEXT = "Austin Steil";

// Navigation items - edit this array to update your navigation menu
// Each item needs a 'text' (display text), 'url' (link destination), and 'key' (unique identifier for the page)
const NAVIGATION_ITEMS = [
    {
        text: "Business",
        url: "/business",
        key: "business"
    },
    {
        text: "Technology",
        url: "/technology",
        key: "technology"
    },
    {
        text: "Clinician",
        url: "/clinical-care",
        key: "clinical-care"
    },
    {
        text: "EHS",
        url: "/safety",
        key: "safety"
    },
    {
        text: "Leadership",
        url: "/leadership",
        key: "leadership"
    }
];

// Contact button configuration
const CONTACT_BUTTON = {
    text: "Contact Me",
    url: "#contact", // This will be used as an identifier, not an actual URL
    class: "cta-button"
};
// =========================

document.addEventListener('DOMContentLoaded', function() {
    // Create and insert the header
    createHeader();

    // Set up mobile menu functionality
    setupMobileMenu();
});

/**
 * Creates the header structure and inserts it into the DOM
 */
function createHeader() {
    // Find the header container element
    const headerContainer = document.getElementById('site-header');

    // If the container doesn't exist, exit the function
    if (!headerContainer) {
        console.warn('Header container with ID "site-header" not found.');
        return;
    }

    // Create the header element
    const header = document.createElement('header');

    // Create the container div
    const container = document.createElement('div');
    container.className = 'container';

    // Create the logo div
    const logo = document.createElement('div');
    logo.className = 'logo';

    // Create the logo link
    const logoLink = document.createElement('a');
    logoLink.href = '/';
    logoLink.textContent = HEADER_LOGO_TEXT;

    // Create the mobile menu toggle button
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.setAttribute('aria-label', 'Toggle menu');

    // Create the menu icon with three lines
    const menuIcon = document.createElement('div');
    menuIcon.className = 'menu-icon';

    // Create three lines for the menu icon
    for (let i = 0; i < 3; i++) {
        const line = document.createElement('span');
        line.className = 'menu-line';
        menuIcon.appendChild(line);
    }

    // Create the navigation element
    const nav = document.createElement('nav');
    nav.className = 'main-nav';

    // Create the navigation list
    const navList = document.createElement('ul');

    // Get the current page path to determine which nav item should be active
    const currentPath = window.location.pathname;

    // Add each navigation item to the list
    NAVIGATION_ITEMS.forEach(item => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        link.href = item.url;
        link.textContent = item.text;

        // Check if this is the active page
        if (currentPath.includes(item.key)) {
            link.className = 'active';
        }

        listItem.appendChild(link);
        navList.appendChild(listItem);
    });

    // Add the contact button
    const contactListItem = document.createElement('li');
    const contactLink = document.createElement('a');

    contactLink.href = CONTACT_BUTTON.url;
    contactLink.className = CONTACT_BUTTON.class;
    contactLink.textContent = CONTACT_BUTTON.text;

    contactListItem.appendChild(contactLink);
    navList.appendChild(contactListItem);

    // Assemble the header structure
    logo.appendChild(logoLink);
    mobileMenuToggle.appendChild(menuIcon);
    nav.appendChild(navList);

    // Create a mobile header wrapper for better control in mobile view
    const mobileHeaderWrapper = document.createElement('div');
    mobileHeaderWrapper.className = 'mobile-header-wrapper';

    // Add elements to the container
    mobileHeaderWrapper.appendChild(mobileMenuToggle);
    mobileHeaderWrapper.appendChild(logo);

    container.appendChild(mobileHeaderWrapper);
    container.appendChild(nav);

    header.appendChild(container);

    // Insert the header into the container
    headerContainer.appendChild(header);
}

/**
 * Sets up the mobile menu toggle functionality
 */
function setupMobileMenu() {
    // Get the mobile menu toggle and main nav elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // If either element doesn't exist, exit the function
    if (!mobileMenuToggle || !mainNav) {
        return;
    }

    // Add click event listener to the mobile menu toggle
    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event from bubbling up
        mainNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav.classList.contains('active') &&
            !mainNav.contains(event.target) &&
            !mobileMenuToggle.contains(event.target)) {
            mainNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Close mobile menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Add click event listeners to navigation links to close menu when clicked
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Handle contact button click
            if (link.classList.contains('cta-button')) {
                e.preventDefault();
                // Check if openContactPopup function exists (from contact-popup.js)
                if (typeof openContactPopup === 'function') {
                    openContactPopup();
                }
            }

            // Only close the menu on mobile
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
}
