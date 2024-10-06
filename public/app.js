async function handleLogin() {
  try {
    // Replace with your actual login logic or OAuth
    const response = await fetch('/api/auth/login', { method: 'POST' });
    const data = await response.json();
    
    if (data.success) {
      document.getElementById('status').innerHTML = "Logged in as: " + data.user.email;
    } else {
      document.getElementById('status').innerHTML = "Login failed. Please try again.";
    }
  } catch (error) {
    console.error("Login error:", error);
    document.getElementById('status').innerHTML = "An error occurred during login.";
  }
}

async function processEmails() {
  try {
    document.getElementById('process-status').innerHTML = "Processing emails...";
    
    // Call the backend API to start fetching and analyzing emails
    const response = await fetch('/api/fetchEmails', { method: 'GET' });
    const result = await response.json();
    
    if (result.success) {
      document.getElementById('process-status').innerHTML = "Emails processed successfully!";
      
      // Display feedback results on the frontend
      const resultList = document.getElementById('result-list');
      resultList.innerHTML = ''; // Clear existing results
      
      result.data.forEach((email) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Name: ${email.name}, Feedback: ${email.feedback}, Sentiment: ${email.sentiment}`;
        resultList.appendChild(listItem);
      });
    } else {
      document.getElementById('process-status').innerHTML = "Error processing emails. Try again.";
    }
  } catch (error) {
    console.error("Processing error:", error);
    document.getElementById('process-status').innerHTML = "An error occurred during processing.";
  }
}
