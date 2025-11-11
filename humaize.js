humanizeBtn?.addEventListener("click", async () => {
  const text = textarea.value.trim();
  if (!text) return alert("Please enter some text to humanize!");

  // Clear old content & show loading
  textDisplay.innerHTML = "";
  textDisplay.style.width = "50%";
  textDisplay.style.opacity = "1";
  textareaWrapper.style.width = "50%";

  const loadingDiv = document.createElement("div");
  loadingDiv.className = "w-full h-48 flex items-center justify-center border-2 border-dashed border-green-400 rounded-lg text-gray-500";
  loadingDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i>Humanizing text...`;
  textDisplay.appendChild(loadingDiv);

  try {
    const accessToken = localStorage.getItem("accessToken") || "";

    const response = await fetch("https://aireshot.com/api/humanize/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      },
      body: JSON.stringify({
        text: text,
        option: 1
      })
    });

    if (!response.ok) {
      throw new Error("API request failed with status " + response.status);
    }

    const data = await response.json();

    // Remove loading
    textDisplay.innerHTML = "";

    // Original Text
    const originalDiv = document.createElement("div");
    originalDiv.className = "mb-4";
    originalDiv.innerHTML = `<h3 class="font-semibold text-lg mb-1">Original Text</h3><p class="text-gray-700">${data.original}</p>`;
    textDisplay.appendChild(originalDiv);

    // Humanized Text
    const humanizedDiv = document.createElement("div");
    humanizedDiv.className = "mb-2";
    humanizedDiv.innerHTML = `<h3 class="font-semibold text-lg mb-1">Humanized Text</h3><p class="text-gray-800">${data.humanized}</p>`;
    textDisplay.appendChild(humanizedDiv);

    // Word Count
    const totalWords = data.humanized.split(/\s+/).filter(Boolean).length;
    const wordCountDisplay = document.createElement("div");
    wordCountDisplay.className = "mt-4 text-right text-gray-500 text-sm";
    wordCountDisplay.textContent = `Word Count: ${totalWords} words`;
    textDisplay.appendChild(wordCountDisplay);

  } catch (error) {
    textDisplay.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
  }
});
