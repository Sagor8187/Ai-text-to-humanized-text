document.addEventListener("DOMContentLoaded", async () => {
  const demo = document.getElementById("demo");

  // ✅ Loading animation
  demo.innerHTML = `<p class="text-center text-gray-500">Loading your history...</p>`;

  // ✅ Access Token get from localStorage
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    demo.innerHTML = `<p class="text-red-500 text-center">No access token found. Please log in again.</p>`;
    return;
  }

  try {
    const response = await fetch("https://aireshot.com/api/user/history/", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        demo.innerHTML = `<p class="text-red-500 text-center">Unauthorized! Please log in again.</p>`;
      } else {
        demo.innerHTML = `<p class="text-red-500 text-center">Failed to load history. (${response.status})</p>`;
      }
      return;
    }

    const data = await response.json();
    const histories = data.histories;

    // ✅ যদি কোনো history না থাকে
    if (!histories || histories.length === 0) {
      demo.innerHTML = `<p class="text-center text-gray-500">No history yet</p>`;
      return;
    }

    // ✅ History দেখানো সুন্দরভাবে
    demo.innerHTML = histories
      .map(
        (item, index) => `
        <div class="border-b border-gray-200 py-4">
          <h3 class="font-semibold text-gray-800 mb-2">History #${index + 1}</h3>
          <p class="text-gray-700"><strong>Original:</strong> ${item.original_text}</p>
          <p class="text-gray-700 mt-2"><strong>Humanized:</strong> ${item.changed_text}</p>
          <p class="text-sm text-gray-500 mt-1">🕒 ${new Date(item.created_at).toLocaleString()}</p>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("Error fetching history:", error);
    demo.innerHTML = `<p class="text-red-500 text-center">Something went wrong while fetching history.</p>`;
  }
});
