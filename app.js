document.addEventListener("DOMContentLoaded", () => {
  // --- LOGIN PAGE ---
  const googleBtn = document.getElementById("google");
  if (googleBtn) {
    googleBtn.addEventListener("click", () => {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "main.html";
    });
  }

  // --- MAIN PAGE NAVBAR UPDATE ---
  const navbars = document.getElementById("navlist");
  if (navbars && localStorage.getItem("loggedIn") === "true") {
    document.getElementById("login")?.remove();
    document.getElementById("free")?.remove();

    navbars.insertAdjacentHTML('beforeend', `
      <ul class="flex flex-col sm:flex-row items-center gap-2 p-2 bg-white">
        <li class="list-none">
          <a href="#" class="text-black font-semibold">Balance: <span>$250</span></a>
        </li>
        <li class="list-none">
          <a href="#" class="bg-green-500 hover:bg-green-600 p-2 rounded-lg font-semibold text-white transition-colors duration-300">
            Get more words
          </a>
        </li>
        <li class="list-none">
          <a href="./history.html" class="font-semibold text-gray-500">
            <i class="fa-solid fa-clock-rotate-left text-xl border-2 rounded-full p-1 h-8 w-8 flex items-center justify-center"></i>
          </a>
        </li>
        <li class="relative group list-none">
          <button onclick="window.location.href='dashboard.html'" id="profileBtn" class="flex items-center gap-2 font-semibold">
            <i class="fa-solid fa-user-circle text-3xl"></i>
          </button>
        </li>
      </ul>
    `);

    document.getElementById("start")?.remove();
  }

  // --- TEXTAREA & PASTE & WORD COUNT ---
  const textarea = document.getElementById("textarea");
  const pasteBtn = document.getElementById("btn");
  const textDisplay = document.getElementById("textDisplay");
  const humanizeBtn = document.getElementById("humanizeBtn");
  const checkAiBtn = document.getElementById("checkai"); // ✅ নতুন button
  const wordCount = document.getElementById("wordCount");
  const textareaWrapper = document.getElementById("textareaWrapper");

  if (textarea && pasteBtn && wordCount) {
    // Function to update word count
    const updateWordCount = () => {
      const words = textarea.value.trim().split(/\s+/).filter(Boolean).length;
      wordCount.textContent = words;
    };

    textarea.addEventListener("input", () => {
      updateWordCount();
      pasteBtn.style.display = textarea.value.trim() === "" ? "block" : "none";
    });

    pasteBtn.addEventListener("click", () => {
      navigator.clipboard.readText().then(text => {
        textarea.value = text;
        updateWordCount();
        pasteBtn.style.display = "none";
      }).catch(() => alert("Failed to paste from clipboard!"));
    });

    // ✅ Humanize Button — Human Result Show করবে
    humanizeBtn?.addEventListener("click", () => {
      const text = textarea.value.trim();
      if (!text) return;

      // Clear old content
      textDisplay.innerHTML = "";

      // Create Humanize Result Section
      const topBar = document.createElement("div");
      topBar.className = "flex justify-between items-center mb-2";

      const left = document.createElement("div");
      left.textContent = "Result";
      left.className = "font-semibold text-lg";

      const right = document.createElement("div");
      right.className = "flex items-center gap-1 text-green-600 font-semibold";
      right.innerHTML = `<i class="fa-solid fa-fingerprint"></i> 100% Human Written`;

      topBar.appendChild(left);
      topBar.appendChild(right);
      textDisplay.appendChild(topBar);

      const contentDiv = document.createElement("div");
      contentDiv.innerHTML = text
        .split("\n")
        .map(line => `<p class="mb-1">${line}</p>`)
        .join("");
      textDisplay.appendChild(contentDiv);

      const totalWords = text.split(/\s+/).filter(Boolean).length;
      const wordCountDisplay = document.createElement("div");
      wordCountDisplay.className = "mt-4 text-right text-gray-500 text-sm";
      wordCountDisplay.textContent = `Word Count: ${totalWords} words`;
      textDisplay.appendChild(wordCountDisplay);

      textDisplay.style.width = "50%";
      textDisplay.style.opacity = "1";
      textareaWrapper.style.width = "50%";
    });

    // ✅ Check AI Button — শুধুমাত্র খালি div দেখাবে
    checkAiBtn?.addEventListener("click", () => {
      textDisplay.innerHTML = ""; // পুরনো Human result মুছে ফেলবে

      const emptyDiv = document.createElement("div");
      emptyDiv.id = "aiResultBox"; // ভবিষ্যতে তুমি এখানে API data দেখাবে
      emptyDiv.className = "w-full h-48 flex items-center justify-center border-2 border-dashed border-blue-400 rounded-lg text-gray-500";
      emptyDiv.textContent = "AI Score will appear here...";

      textDisplay.appendChild(emptyDiv);

      textDisplay.style.width = "50%";
      textDisplay.style.opacity = "1";
      textareaWrapper.style.width = "50%";
    });
  }
});



// FAQ toogle 
 document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
      const header = item.querySelector(".flex");
      const answer = item.querySelector(".faq-answer");
      const icon = item.querySelector("i");

      header.addEventListener("click", () => {
        // অন্য সব বন্ধ করো
        faqItems.forEach(i => {
          if (i !== item) {
            const ans = i.querySelector(".faq-answer");
            const icn = i.querySelector("i");
            ans.style.maxHeight = null;
            ans.style.opacity = 0;
            icn.classList.remove("rotate-180");
          }
        });

        // নিজেরটা toggle করো
        if (answer.style.maxHeight) {
          answer.style.maxHeight = null;
          answer.style.opacity = 0;
          icon.classList.remove("rotate-180");
        } else {
          answer.style.maxHeight = answer.scrollHeight + "px";
          answer.style.opacity = 1;
          icon.classList.add("rotate-180");
        }
      });
    });
  });