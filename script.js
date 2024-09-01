const pages = document.querySelectorAll(".page");
const buttons = document.querySelectorAll(".navigate-btn");
const loadingOverlay = document.getElementById("loadingOverlay");
console.log("script loaded")
let currentPage = 0;
function test(){
    console.log("button clicked");
    
}
function showPage(index) {
  // Show the loading overlay before transitioning
  gsap.to(loadingOverlay, {
    opacity: 1,
    duration: 0.5,
    onStart: () => {
      loadingOverlay.style.display = "flex"; // Show loading overlay
    },
    onComplete: () => {
      // After loading animation, perform the page transition
      gsap
        .timeline()
        .set(pages[currentPage], { display: "none" }) // Hide the current page
        .set(pages[index], {
          display: "flex",
          opacity: 0,
          rotateY: 90,
          transformOrigin: "center left",
        }) // Prepare next page for animation
        .to(pages[index], {
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: "power2.inOut",
        })
        .call(() => {
          // Hide the loading overlay after the transition
          gsap.to(loadingOverlay, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              loadingOverlay.style.display = "none"; // Hide loading overlay
            },
          });
        });

      currentPage = index; // Update the current page index

      // Staggered animation for the content elements for a more dynamic entry effect
      gsap.fromTo(
        pages[currentPage].querySelectorAll(".text-center > *"),
        { opacity: 0, y: 50, skewY: 5, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        }
      );
    },
  });
}

// Add click event listeners to all buttons for navigation
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    console.log("button clicked");

    showPage((currentPage + 1) % pages.length);
  });
});

// Initialize the first page with GSAP
gsap.set(pages[currentPage], { opacity: 1, rotateY: 0, zIndex: 1 });
