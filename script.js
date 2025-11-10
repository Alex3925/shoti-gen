document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateBtn");
  const video = document.getElementById("video");
  const status = document.getElementById("status");
  const themeToggle = document.getElementById("themeToggle");

  // ----------------------------
  // 🌙 Theme toggle
  // ----------------------------
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  });

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }

  // ----------------------------
  // 🎥 Generate Shoti handler
  // ----------------------------
  generateBtn.addEventListener("click", async () => {
    status.classList.remove("hidden");
    status.textContent = "Fetching random video...";
    video.src = "";
    generateBtn.disabled = true;

    try {
      // Using AllOrigins CORS proxy to bypass restrictions
      const apiURL =
        "https://api.allorigins.win/raw?url=" +
        encodeURIComponent("https://norch-project.gleeze.com/api/shoti");

      const response = await fetch(apiURL);
      if (!response.ok) throw new Error("API request failed.");

      const data = await response.json();
      console.log("API Response:", data);

      if (data.video) {
        video.src = data.video;
        video.classList.remove("hidden");
        status.textContent = "✅ Video loaded successfully!";
      } else {
        throw new Error("No video field in response");
      }
    } catch (err) {
      console.error("Error fetching Shoti:", err);
      status.textContent = "❌ Error fetching video.";
    } finally {
      generateBtn.disabled = false;
    }
  });
});
