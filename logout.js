document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("btnlogout");

  if (!logoutBtn) return; // button নেই → do nothing

  logoutBtn.addEventListener("click", async () => {
    // --- Optional confirm ---
    // const confirmLogout = confirm("Are you sure you want to log out?");
    // if (!confirmLogout) return;

    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");

    // সব localStorage clear প্রথমে
    localStorage.clear();

    try {
      if (refreshToken && accessToken) {
        // Backend expects Authorization header
        await fetch("https://aireshot.com/api/auth/logout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`, // 🔑 important
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });
      }
    } catch (error) {
      console.error("Logout Error:", error);
      // ignore, just redirect
    } finally {
      // --- Redirect silently ---
      window.location.href = "index.html";
    }
  });
});
