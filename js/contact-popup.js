/**
 * Contact Popup Script
 *
 * Author: Austin Steil
 * Version: 1.1.0
 * Last Updated: 2025-05-12
 *
 * This script creates a popup with contact information when the "Contact Me" button is clicked.
 * The popup displays social links and contact information in a modal dialog with a darkened overlay.
 *
 * Features:
 * - Darkened background overlay that still allows seeing the page content
 * - Close button (X) in the top right corner
 * - Closes when clicking outside the popup area
 * - Closes when pressing the Escape key
 * - Copy buttons for email and phone number
 * - Fully responsive design
 *
 * === HOW TO USE THIS SCRIPT ===
 *
 * 1. Include this script in your HTML:
 *    <script src="js/contact-popup.js" defer></script>
 *
 * 2. Add a "Contact Me" button with the class "cta-button":
 *    <a href="#" class="cta-button">Contact Me</a>
 *
 * 3. The script will automatically:
 *    - Create the popup structure in the DOM
 *    - Add event listeners to the "Contact Me" button
 *    - Handle opening and closing the popup
 *
 * 4. To customize the popup content, edit the CONFIGURATION section below.
 *    You can easily modify:
 *    - Title and subtitle text
 *    - Contact information (phone, email)
 *    - Social media links and icons
 */

// ===== CONFIGURATION =====
// Change these values to customize your popup
const POPUP_TITLE = "Contact Me";
const POPUP_SUBTITLE = "Let's connect! Reach out through any of these channels:";

// Contact Information - Edit these to update your contact details
const CONTACT_INFO = [
    {
        type: "phone",
        icon: "fas fa-phone",
        text: "(515) 890-8456",
        link: "tel:+15158908456",
        copyable: true
    },
    {
        type: "email",
        icon: "fas fa-envelope",
        text: "austinsteil21@gmail.com",
        link: "mailto:austinsteil21@gmail.com",
        copyable: true
    },
    {
        type: "linkedin",
        icon: "fab fa-linkedin",
        text: "LinkedIn",
        link: "https://www.linkedin.com/in/austinsteil/",
        target: "_blank"
    },
    {
        type: "github",
        icon: "fab fa-github",
        text: "GitHub",
        link: "https://github.com/austinsteil",
        target: "_blank"
    }
    // Add more social links as needed following the same format
];

document.addEventListener('DOMContentLoaded', function() {
    // Create popup elements
    createContactPopup();

    // Get all "Contact Me" buttons
    const contactButtons = document.querySelectorAll('a.cta-button');

    // Add click event listeners to all "Contact Me" buttons
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openContactPopup();
        });
    });
});

/**
 * Creates the contact popup structure and adds it to the DOM
 */
function createContactPopup() {
    // Create popup container
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'contact-popup-overlay';

    // Create popup content
    const popupContent = document.createElement('div');
    popupContent.className = 'contact-popup-content';

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'contact-popup-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close popup');

    // Create popup header
    const popupHeader = document.createElement('div');
    popupHeader.className = 'contact-popup-header';

    const popupTitle = document.createElement('h2');
    popupTitle.textContent = POPUP_TITLE;

    const popupSubtitle = document.createElement('p');
    popupSubtitle.textContent = POPUP_SUBTITLE;

    // Create popup body
    const popupBody = document.createElement('div');
    popupBody.className = 'contact-popup-body';

    // Create contact links container
    const contactLinksContainer = document.createElement('div');
    contactLinksContainer.className = 'contact-slim';

    // Add contact links from configuration
    CONTACT_INFO.forEach(contact => {
        const contactLink = document.createElement('div');
        contactLink.className = 'contact-link-container';

        // Create the main link
        const link = document.createElement('a');
        link.href = contact.link;
        link.className = 'contact-link';
        if (contact.target) {
            link.target = contact.target;
        }

        // Add icon
        const icon = document.createElement('i');
        icon.className = contact.icon;

        // Add text
        const text = document.createElement('span');
        text.textContent = contact.text;

        // Assemble link
        link.appendChild(icon);
        link.appendChild(text);
        contactLink.appendChild(link);

        // Add copy button for copyable items
        if (contact.copyable) {
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.setAttribute('aria-label', `Copy ${contact.type}`);
            copyButton.setAttribute('data-copy-text', contact.text);

            // Add copy functionality
            copyButton.addEventListener('click', function() {
                const textToCopy = this.getAttribute('data-copy-text');
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Show copied feedback
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i>';
                    this.classList.add('copied');

                    // Reset after 2 seconds
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                        this.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Could not copy text: ', err);
                });
            });

            contactLink.appendChild(copyButton);
        }

        contactLinksContainer.appendChild(contactLink);
    });

    // Assemble popup structure
    popupHeader.appendChild(popupTitle);
    popupHeader.appendChild(popupSubtitle);

    popupBody.appendChild(contactLinksContainer);

    popupContent.appendChild(closeButton);
    popupContent.appendChild(popupHeader);
    popupContent.appendChild(popupBody);

    popupOverlay.appendChild(popupContent);

    // Add to document
    document.body.appendChild(popupOverlay);

    // Add event listeners for closing
    closeButton.addEventListener('click', closeContactPopup);
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closeContactPopup();
        }
    });

    // Add keyboard event listener for Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.body.classList.contains('popup-open')) {
            closeContactPopup();
        }
    });
}

/**
 * Opens the contact popup
 */
function openContactPopup() {
    // Show the popup
    document.querySelector('.contact-popup-overlay').classList.add('active');
    document.body.classList.add('popup-open');

    // Focus on close button for accessibility
    document.querySelector('.contact-popup-close').focus();
}

/**
 * Closes the contact popup
 */
function closeContactPopup() {
    document.querySelector('.contact-popup-overlay').classList.remove('active');
    document.body.classList.remove('popup-open');
}
