document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = loginForm.querySelector("button[type='submit']");

  // Create error spans
  let emailError = document.createElement("span");
  emailError.className = "text-red-500 text-sm block mt-1";
  emailInput.parentNode.appendChild(emailError);

  let passwordError = document.createElement("span");
  passwordError.className = "text-red-500 text-sm block mt-1";
  passwordInput.parentNode.appendChild(passwordError);

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    emailError.innerText = "";
    passwordError.innerText = "";

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    let hasError = false;

    if (!email) {
      emailError.innerText = "Email is required.";
      hasError = true;
    } else if (!gmailRegex.test(email)) {
      emailError.innerText = "Please enter a valid Gmail address.";
      hasError = true;
    }

    if (!password) {
      passwordError.innerText = "Password is required.";
      hasError = true;
    } else if (password.length < 8) {
      passwordError.innerText = "Password must be at least 8 characters.";
      hasError = true;
    }

    if (hasError) return;

    // Show loader
    const originalText = loginButton.innerHTML;
    loginButton.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Logging in...`;
    loginButton.disabled = true;

    try {
      const response = await fetch("https://aireshot.com/api/auth/login-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password: password }),
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        if (data.identifier) emailError.innerText = data.identifier;
        if (data.password) passwordError.innerText = data.password;
        if (data.detail) passwordError.innerText = data.detail;
      } else {
        // Redirect to home page after successful login
        localStorage.setItem("refreshToken", data.tokens.refresh);
        localStorage.setItem("accessToken", data.tokens.access);
        console.log(data.tokens.access)
        console.log(data.tokens.refresh)
        
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html";
      }
    } catch (error) {
      console.error("Error:", error);
      passwordError.innerText = "Something went wrong. Please try again later.";
    } finally {
      // Restore button state
      loginButton.innerHTML = originalText;
      loginButton.disabled = false;
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const navbars = document.getElementById("navlist");
  if (!navbars) return;

  if (localStorage.getItem("loggedIn") === "true") {
    // Remove login/free buttons
    document.getElementById("login")?.remove();
    document.getElementById("free")?.remove();

    // Add updated navbar
    navbars.insertAdjacentHTML('beforeend', `
      <ul class="flex flex-col sm:flex-row items-center gap-2 p-2 bg-white">
        <li class="list-none">
          <a href="#" class="text-black font-semibold">Balance: <span>$250</span></a>
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
          <div id="profileDropdown" class="hidden absolute right-0 mt-2 bg-white border rounded shadow w-36 z-50">
            <button onclick="window.location.href='dashboard.html'" class="w-full text-left px-4 py-2 hover:bg-gray-100">Dashboard</button>
            
          </div>
        </li>
      </ul>
    `);

    

    
  }
});





