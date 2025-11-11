document.addEventListener("DOMContentLoaded", () => {
  const navbars = document.getElementById("navlist");
  if (!navbars) return;

  if (localStorage.getItem("loggedIn") === "true") {
    // Remove login/free buttons
    document.getElementById("login")?.remove();
    document.getElementById("free")?.remove();

    // Update navbar
    navbars.innerHTML = `
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
          <button id="profileBtn" class="flex items-center gap-2 font-semibold">
            <i class="fa-solid fa-user-circle text-3xl"></i>
          </button>
          <div id="profileDropdown" class="hidden group-hover:block absolute right-0 mt-2 bg-white border rounded shadow w-36 z-50">
            <button onclick="window.location.href='dashboard.html'" class="w-full text-left px-4 py-2 hover:bg-gray-100">Dashboard</button>
            <button id="logout" class="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
          </div>
        </li>
      </ul>
    `;

    // Profile dropdown toggle
    const profileBtn = document.getElementById("profileBtn");
    const profileDropdown = document.getElementById("profileDropdown");
    profileBtn?.addEventListener("click", () => {
      profileDropdown.classList.toggle("hidden");
    });

    // Logout
    document.getElementById("logout")?.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      window.location.reload();
    });
  }
});
