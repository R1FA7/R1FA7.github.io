document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // Function to set the active link based on scroll position
  function setActiveLinkOnScroll() {
    let scrollPosition = window.scrollY + 200; // Adjusted offset for better detection

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      // Check if the current scroll position is within this section's range
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        // Remove the active class from all links
        navLinks.forEach(nav => nav.classList.remove("active-link"));

        // Add the active class to the link corresponding to this section
        const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (activeLink) {
          activeLink.classList.add("active-link");
        }
      }
    });
  }

  // Call the function on scroll to update active link based on scroll position
  window.addEventListener("scroll", setActiveLinkOnScroll);

  // Initialize the first active link (About section) when the page loads
  document.querySelector('.nav-link[href="#about"]').classList.add('active-link');

  // Function to handle the click on navigation links
  navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      // Prevent default behavior of the anchor tag
      event.preventDefault();

      // Get the section to scroll to
      const sectionId = event.target.getAttribute("href").substring(1); // Get the section ID (e.g., "#about" -> "about")
      const section = document.getElementById(sectionId);

      // Smooth scroll to the section
      section.scrollIntoView({
        behavior: "smooth",
        block: "start", // Scroll to the top of the section
      });

      // Delay the addition of the active class to allow for smooth scrolling to complete
      setTimeout(() => {
        // Remove the active class from all links
        navLinks.forEach(nav => nav.classList.remove("active-link"));

        // Add the active class to the clicked link
        event.target.classList.add("active-link");
      }, 300); // Delay in milliseconds (should match the scroll duration)
    });
  });

  // Ensure active link is set based on scroll position when the page loads
  setActiveLinkOnScroll();
});
