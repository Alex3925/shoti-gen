lucide.createIcons();

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
themeToggle.addEventListener('click', () => html.classList.toggle('light'));

const btn = document.getElementById('generateBtn');
const spinner = document.getElementById('btnSpinner');
const status = document.getElementById('status');
const videoSection = document.getElementById('videoSection');
const shotiVideo = document.getElementById('shotiVideo');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');

btn.addEventListener('click', async () => {
  try {
    btn.disabled = true;
    spinner.classList.remove('hidden');
    status.textContent = "Fetching a random Shoti...";
    videoSection.classList.add('hidden');
    videoSection.classList.remove('opacity-100');

    const response = await fetch('https://norch-project.gleeze.com/api/shoti');
    const data = await response.json();
    console.log(data);

    if (data && data.url) {
      shotiVideo.src = data.url;
      downloadBtn.href = data.url;
      videoSection.classList.remove('hidden');
      setTimeout(() => videoSection.classList.add('opacity-100'), 50);
      status.textContent = "✅ Success! Enjoy your Shoti.";
    } else {
      status.textContent = "⚠️ Failed to fetch video. Try again.";
    }
  } catch (err) {
    console.error(err);
    status.textContent = "❌ Error fetching video.";
  } finally {
    spinner.classList.add('hidden');
    btn.disabled = false;
  }
});

copyBtn.addEventListener('click', async () => {
  const url = shotiVideo.src;
  if (!url) return;
  try {
    await navigator.clipboard.writeText(url);
    status.textContent = "📋 Link copied to clipboard!";
  } catch {
    status.textContent = "⚠️ Failed to copy link.";
  }
});
