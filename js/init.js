
// Initialize Lottie Animation with "Queen Birthday" theme
var animation = lottie.loadAnimation({
  container: document.getElementById("lottie-animation"), // the DOM element
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "lottie/b2.json", // Example URL, replace with the Lottie animation JSON URL of a "Queen Birthday" theme
});

// Function to dynamically load pages from JSON
function loadPagesFromJson() {
  fetch("pages.json") // Fetch the JSON file
    .then((response) => response.json())
    .then((data) => {
      const promises = data.pages.map((page, index) => {
        return new Promise((resolve) => {
          const section = document.createElement("div");
          section.id = page.id;
          section.className =
            "section bg-gray-800  min-h-screen flex flex-col justify-center items-center fade-in hidden";

          if (page.template) {
            // Fetch the external HTML template
            fetch(page.template)
              .then((response) => response.text())
              .then((html) => {
                section.innerHTML = html;
                resolve(section);
              });
          } else {
            // Use the default template
            section.innerHTML = `
              <h1 class="text-3xl font-bold mb-4">${page.title}</h1>
              <p class="mb-8">${page.content}</p>
              <button class=" button${
                index + 1
              } bg-yellow-500 text-gray-900 px-6 py-2 rounded">Click Here Go Next..</button>
            `;
            resolve(section);
          }
        });
      });

      Promise.all(promises).then((sections) => {
        const container = document.getElementById("content-container");
        sections.forEach((section) => {
          container.appendChild(section);
        });

        // Add event listeners to buttons after sections are created
        addNavigationEventListeners();
      });
    });
}

// Function to add navigation event listeners dynamically
function addNavigationEventListeners() {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section, index) => {
    const button = section.querySelector(".button" + (index + 1));
    if (button) {
      button.addEventListener("click", () => {
        const nextIndex = (index + 1) % sections.length;
        showLoaderAndNextSection(sections[index].id, sections[nextIndex].id);
      });
    }
  });
}

// Function to show the loader and navigate to the next section
function showLoaderAndNextSection(current, next) {
  document.getElementById("loading").classList.remove("hidden"); // Show loader
  document.getElementById(current).classList.add("hidden"); // Hide current section

  setTimeout(function () {
    document.getElementById("loading").classList.add("hidden"); // Hide loader
    var nextSection = document.getElementById(next);
    nextSection.classList.remove("hidden"); // Show next section
    setTimeout(function () {
      nextSection.classList.add("visible"); // Apply fade-in effect
    }, 50); // Slight delay to ensure the transition triggers
  }, 3000); // Loader duration before showing the next section
}

// Initial page load
window.onload = function () {
  loadPagesFromJson(); // Load pages dynamically
  setTimeout(function () {
    document.getElementById("loading").classList.add("hidden"); // Hide initial loader
    var firstSection = document.querySelector(".section");
    if (firstSection) {
      firstSection.classList.remove("hidden"); // Show first section
      setTimeout(function () {
        firstSection.classList.add("visible"); // Apply fade-in effect
      }, 50); // Slight delay to ensure the transition triggers
    }
  }, 2000); // Initial loader duration
};
