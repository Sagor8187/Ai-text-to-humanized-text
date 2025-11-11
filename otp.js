document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("userEmail"); // Get the email saved from login page
  const otpInput = document.getElementById("code"); // Your OTP input element
  const loginForm = document.getElementById("loginForm");

  // OTP info message
  if (email) {
    const msgDiv = document.createElement("p");
    msgDiv.innerText = `Your OTP has been sent to ${email}`;
    msgDiv.className = "text-gray-600 mb-2 text-sm text-left";
    loginForm.insertBefore(msgDiv, loginForm.firstChild);
  } else {
    alert("No email found. Please go back to login.");
    window.location.href = "login.html"; // Redirect to login page if no email found
  }

  // Error message element
  const errorMsg = document.createElement("p");
  errorMsg.className = "text-red-600 mt-1 text-sm text-left hidden"; // Hidden by default
  otpInput.parentNode.appendChild(errorMsg);

  // Form submit
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const otp = otpInput.value.trim();
    otpInput.classList.remove("border-red-500"); // Reset input border
    errorMsg.classList.add("hidden"); // Hide previous error
    errorMsg.innerText = "";

    if (!otp) {
      errorMsg.innerText = "Please enter your OTP.";
      errorMsg.classList.remove("hidden");
      otpInput.classList.add("border-red-500");
      return;
    }

    try {
      const response = await fetch("https://aireshot.com/api/auth/verify-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.removeItem("userEmail");
        window.location.href = "home.html"; // Redirect to dashboard page
      } else {
        errorMsg.innerText = data.message || " Invalid OTP, try again.";
        errorMsg.classList.remove("hidden");
        otpInput.classList.add("border-red-500");
      }
    } catch (error) {
      console.error(error);
      errorMsg.innerText = "Server error. Try again later.";
      errorMsg.classList.remove("hidden");
      otpInput.classList.add("border-red-500");
    }
  });
});
