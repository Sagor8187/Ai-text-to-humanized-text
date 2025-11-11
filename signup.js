document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");

  const usernameInput = document.getElementById("username");
  const numberInput = document.getElementById("numbers");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  // Field-specific error spans
  const usernameError = document.getElementById("usernameError");
  const numberError = document.getElementById("numberError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  const result = document.getElementById("result");
  const loader = document.getElementById("loader");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Clear previous messages
    result.innerText = "";
    result.classList.add("hidden");

    // Clear field-specific errors and borders
    [usernameInput, numberInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
      input.style.borderColor = "#ccc";
    });
    [usernameError, numberError, emailError, passwordError, confirmPasswordError].forEach(span => {
      span.innerText = "";
    });

    const username = usernameInput.value.trim();
    const phone = numberInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirm_password = confirmPasswordInput.value.trim();

    let valid = true;

    // Frontend validation
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!username) {
      usernameError.innerText = "Username is required.";
      usernameInput.style.borderColor = "red";
      valid = false;
    } else if (!usernameRegex.test(username)) {
      usernameError.innerText = "Invalid username";
      usernameInput.style.borderColor = "red";
      valid = false;
    }

    const numberRegex = /^[0-9]{11}$/;
    if (!phone) {
      numberError.innerText = "Number is required.";
      numberInput.style.borderColor = "red";
      valid = false;
    } else if (!numberRegex.test(phone)) {
      numberError.innerText = "Invalid number";
      numberInput.style.borderColor = "red";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      emailError.innerText = "Email is required.";
      emailInput.style.borderColor = "red";
      valid = false;
    } else if (!emailRegex.test(email)) {
      emailError.innerText = "Invalid email";
      emailInput.style.borderColor = "red";
      valid = false;
    }

    if (!password) {
      passwordError.innerText = "Password is required.";
      passwordInput.style.borderColor = "red";
      valid = false;
    } else if (password.length < 8) {
      passwordError.innerText = "Password is too short";
      passwordInput.style.borderColor = "red";
      valid = false;
    }

    if (!confirm_password) {
      confirmPasswordError.innerText = "Confirm Password is required.";
      confirmPasswordInput.style.borderColor = "red";
      valid = false;
    } else if (password !== confirm_password) {
      confirmPasswordError.innerText = "Passwords do not match.";
      confirmPasswordInput.style.borderColor = "red";
      valid = false;
    }

    if (!valid) return;

    // Show loader
    loader.classList.remove("hidden");

    try {
      const response = await fetch("https://aireshot.com/api/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          phone,
          password,
          confirm_password
        })
      });

      const data = await response.json();
      loader.classList.add("hidden");

      if (response.ok) {
        result.innerText = "Sign up successful!";
        result.classList.remove("hidden");
        form.reset();
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("accessToken", data.access);   // যদি backend পাঠায়
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("loggedIn", "true");
        window.location.href = "main.html";
      } else {
        // Server errors field-wise show
        if (typeof data === "object") {
          for (const key in data) {
            const message = Array.isArray(data[key]) ? data[key].join(", ") : data[key];

            switch (key) {
              case "username":
                usernameError.innerText = message;
                usernameInput.style.borderColor = "red";
                break;
              case "phone":
              case "number":
                numberError.innerText = message;
                numberInput.style.borderColor = "red";
                break;
              case "email":
                emailError.innerText = message;
                emailInput.style.borderColor = "red";
                break;
              case "password":
                passwordError.innerText = message;
                passwordInput.style.borderColor = "red";
                break;
              case "confirm_password":
                confirmPasswordError.innerText = message;
                confirmPasswordInput.style.borderColor = "red";
                break;
              default:
                console.error("Unexpected server error:", key, message);
                break;
            }
          }
        }
      }

    } catch (err) {
      console.error("API Error:", err);
      loader.classList.add("hidden");
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
          <a href="#" class="text-black font-semibold">Balance: <span>0</span></a>
        </li>
        <li class="list-none">
          <a href="./history.html" class="font-semibold text-gray-500">
            <i class="fa-solid fa-clock-rotate-left text-xl border-2 rounded-full p-1 h-8 w-8 flex items-center justify-center"></i>
          </a>
        </li>
        <li class="relative group list-none">
          <button onclick ="dashboard.html" id="profileBtn" class="flex items-center gap-2 font-semibold">
            <i class="fa-solid fa-user-circle text-3xl"></i>
          </button>
          
            
            
          </div>
        </li>
      </ul>
    `);

    

   
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // ... navbar & profile dropdown code ...

  // LOGOUT
  document.getElementById("logout")?.addEventListener("click", async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token found!");

      const response = await fetch("https://aireshot.com/api/auth/logout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken })
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");

        window.location.href = "login.html";
      } else {
        alert(data.detail || "Logout failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Logout failed. Please try again!");
    }
  });

  // ... textarea, paste, wordcount, humanize logic ...
});


