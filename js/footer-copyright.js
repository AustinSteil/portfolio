/**
 * Dynamic Copyright Footer Script
 * 
 * Author: Austin Steil
 * Version: 1.0.0
 *
 * This script automatically generates a copyright footer with the current year.
 * i.e. © 2023 Austin Steil. All rights reserved.
 *
 * === HOW TO USE THIS SCRIPT ===
 *
 * 1. Include this script in your HTML:
 *    <script src="js/footer-copyright.js" defer></script>
 *
 * 2. Add an empty element with the ID "copyright-footer" where you want the
 *    copyright notice to appear:
 *    <div id="copyright-footer"></div>
 *
 * 3. To customize the name or text, edit the CONFIGURATION section below.
 *    You only need to change this file once, and it will update across all pages.
 */

// ===== CONFIGURATION =====
// Change these values to customize your copyright notice
const COPYRIGHT_NAME = "Austin Steil";
const COPYRIGHT_TEXT = "All rights reserved.";
// =========================

document.addEventListener('DOMContentLoaded', function() {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Create the copyright text
    const copyrightHTML = `&copy; ${currentYear} ${COPYRIGHT_NAME}. ${COPYRIGHT_TEXT}`;

    // Find all elements with the copyright-footer ID
    const footerElements = document.querySelectorAll('#copyright-footer');

    // Update each element with the copyright notice
    footerElements.forEach(function(element) {
        element.innerHTML = copyrightHTML;
    });
});
