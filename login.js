
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const email = emailInput.value.trim();

  let errorMsg = document.getElementById("emailError");
  if (!errorMsg) {
    errorMsg = document.createElement("p");
    errorMsg.id = "emailError";
    errorMsg.className = "text-red-600 mt-1 text-sm text-left hidden";
    emailInput.parentNode.appendChild(errorMsg);
  }

  // Reset old error
  emailInput.classList.remove("border-red-500");
  errorMsg.classList.add("hidden");
  errorMsg.innerText = "";

  // Validation
  if (!email) {
    errorMsg.innerText = "Please enter your email.";
    errorMsg.classList.remove("hidden");
    emailInput.classList.add("border-red-500");
    return;
  }

  try {
    //  Backend expects { "identifier": "example@gmail.com" }
    const response = await fetch("https://aireshot.com/api/auth/request-otp/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: email }), // Correct structure
    });

    const data = await response.json();
   
    console.log("Server Response:", data); // 


    if (response.ok) {
      console.log(data.detail); // "OTP sent via email"
      localStorage.setItem("userEmail", email);
      window.location.href = "otp.html";
    } else {
      errorMsg.innerText = data.detail || "Your email is not registered.";
      errorMsg.classList.remove("hidden");
      emailInput.classList.add("border-red-500");
    }

  } catch (error) {
    console.error("Error:", error);
    errorMsg.innerText = "Something went wrong. Try again later.";
    errorMsg.classList.remove("hidden");
    emailInput.classList.add("border-red-500");
  }
});





   async function handleCredentialResponse(response) {
    const idToken = response.credential;

    try {
      const res = await fetch("https://aireshot.com/api/auth/google-login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });

      const data = await res.json();
      console.log("Backend Response:", data);

      if (data.success) {
        window.location.href = "/dashboard.html";
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID", // এখানে নিজের Client ID বসাও
      callback: handleCredentialResponse,
    });

    // Custom button click handle
    const googleBtn = document.getElementById("google");
    googleBtn.addEventListener("click", () => {
      // Google prompt manually trigger
      google.accounts.id.prompt(); 
    });
  };