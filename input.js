const humanizeBtn = document.getElementById('humanizeBtn');
const inputfield = document.getElementById('userTextarea');
const outputDiv = document.getElementById('outputDiv');
const wordCount = document.getElementById('wordCount');

// Update word counter 
inputfield.addEventListener('input', () => {
      const words = inputfield.value.trim().split(/\s+/).filter(Boolean);
        wordCount.textContent = words.length;
      });


    // Replace with your backend API
    const apiUrl = 'http://192.168.0.133:8000/humanize/'; // localapi API
      console.log(apiUrl)
    humanizeBtn.addEventListener('click', async () => {
      const userText = inputfield.value.trim();

      if (!userText) {
        alert('⚠️ Please enter some text first!');
        return;
      }

      try {
        // POST Request
        const postResponse = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: userText })
        });

        const postData = await postResponse.json();

        // GET Request
        const getResponse = await fetch(`${apiUrl}/${postData.id}`);
        const getData = await getResponse.json();

        // Directly insert output into outputDiv
        outputDiv.innerHTML = `
          <h3 class="text-xl font-bold text-black mb-3">Analysis Result</h3>
          
          <div class="mb-4">
            <h4 class="font-semibold text-gray-800">Result:</h4>
            <p class="bg-blue-50 p-2 rounded-md text-gray-700">${getData.humanized || 'No response received'}</p>
          </div>

          <div>
            <h4 class="font-semibold text-gray-800">Your Text:</h4>
            <p class="bg-gray-100 p-2 rounded-md text-gray-700">${getData.original || userText}</p>
          </div>
`;



        // Slide-in outputDiv
        outputDiv.classList.add('!right-0');

      } catch (error) {
        console.error('Error:', error);
        outputDiv.innerHTML = `<p class="text-red-600 mt-4">❌ Something went wrong!</p>`;
        outputDiv.classList.add('!right-0');
      }
    });