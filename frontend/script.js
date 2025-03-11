// Login functionality
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value; // Get username from the form

    try {
        // Send login request to the backend
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, username }), // Include username in the request
        });

        const data = await response.json();

        if (data.success) {
            // Save the token, email, and username in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', email);
            localStorage.setItem('username', username); // Store username

            alert('Login successful!');
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        } else {
            // Display error message
            document.getElementById('error-message').textContent = data.message;
        }
    } catch (err) {
        console.error('Error during login:', err);
        document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
    }
});

// Logout functionality
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        // Remove the token, email, and username from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('username');

        // Redirect to the login page
        window.location.href = 'index.html';
    });
}

// Check if the user is logged in (on dashboard page)
if (window.location.pathname.includes('dashboard.html')) {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username'); // Retrieve username

    if (!token) {
        // If no token is found, redirect to the login page
        window.location.href = 'index.html';
    } else {
        // Display the user's username on the dashboard
        const usernameElement = document.getElementById('username');
        if (usernameElement) {
            usernameElement.textContent = username || 'User'; // Use username if available, otherwise fallback to 'User'
        }
    }
}

// Flashcard Click Functionality
const flashcards = document.querySelectorAll('.flashcard');
if (flashcards) {
    flashcards.forEach((card) => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            // Redirect to the detailed page for the selected category
            window.location.href = `category.html?category=${category}`;
        });
    });
}

// Fetch and Display Category Data (on category.html)
if (window.location.pathname.includes('category.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
        // Update the category name
        const categoryNameElement = document.getElementById('category-name');
        if (categoryNameElement) {
            categoryNameElement.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        }

        // Fetch and display data for the selected category
        fetchCategoryData(category);
    } else {
        // Redirect to dashboard if no category is specified
        window.location.href = 'dashboard.html';
    }
}

// Function to fetch and display data for the selected category
function fetchCategoryData(category) {
    // Replace this with actual API calls to fetch data for the selected category
    console.log(`Fetching data for: ${category}`);
    // Example: Mock data for each category
    const mockData = {
        bituminous: {
            name: 'Bituminous Coal',
            description: 'Bituminous coal is a middle-rank coal with high heating value.',
            availability: 'Widely available',
            cost: 'INR 6,104/ton',
            production: '1,000,000 tons/year',
            trends: [
                { year: 2021, production: '900,000 tons', price: 'INR 5,668/ton' },
                { year: 2022, production: '1,000,000 tons', price: 'INR 6,104/ton' },
                { year: 2023, production: '1,100,000 tons', price: 'INR 6,541/ton' },
            ],
        },
        anthracite: {
            name: 'Anthracite Coal',
            description: 'Anthracite is the highest rank of coal with the highest carbon content.',
            availability: 'Limited availability',
            cost: 'INR 8,716/ton',
            production: '500,000 tons/year',
            trends: [
                { year: 2021, production: '450,000 tons', price: 'INR 8,285/ton' },
                { year: 2022, production: '500,000 tons', price: 'INR 8,716/ton' },
                { year: 2023, production: '550,000 tons', price: 'INR 9,152/ton' },
            ],
        },
        lignite: {
            name: 'Lignite Coal',
            description: 'Lignite is the lowest rank of coal with the lowest heating value.',
            availability: 'Moderate availability',
            cost: '$50/ton',
            production: '800,000 tons/year',
            trends: [
                { year: 2021, production: '750,000 tons', price: '$45/ton' },
                { year: 2022, production: '800,000 tons', price: '$50/ton' },
                { year: 2023, production: '850,000 tons', price: '$55/ton' },
            ],
        },
        'sub-bituminous': {
            name: 'Sub-bituminous Coal',
            description: 'Sub-bituminous coal has properties between bituminous and lignite coal.',
            availability: 'Widely available',
            cost: '$60/ton',
            production: '1,200,000 tons/year',
            trends: [
                { year: 2021, production: '1,100,000 tons', price: '$55/ton' },
                { year: 2022, production: '1,200,000 tons', price: '$60/ton' },
                { year: 2023, production: '1,300,000 tons', price: '$65/ton' },
            ],
        },
    };

    const data = mockData[category];
    if (data) {
        // Update the UI with the fetched data
        updateCategoryData(data);
    } else {
        console.log('No data found for the selected category.');
    }
}

// Function to update the UI with the fetched category data
function updateCategoryData(data) {
    const categoryDataContainer = document.getElementById('category-data');
    if (categoryDataContainer) {
        categoryDataContainer.innerHTML = `
            <p><strong>Description:</strong> ${data.description}</p>
            <p><strong>Availability:</strong> ${data.availability}</p>
            <p><strong>Cost:</strong> ${data.cost}</p>
            <p><strong>Production:</strong> ${data.production}</p>
            <h2>Production Trends</h2>
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Production</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.trends.map((trend) => `
                        <tr>
                            <td>${trend.year}</td>
                            <td>${trend.production}</td>
                            <td>${trend.price}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
}

// Chart.js - Coal Production Chart
const ctx = document.getElementById('coalProductionChart')?.getContext('2d');
if (ctx) {
    const coalProductionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2021', '2022', '2023', '2024'], // X-axis labels
            datasets: [{
                label: 'Coal Production (tons)', // Dataset label
                data: [1000000, 1200000, 1300000, 1400000], // Y-axis data
                borderColor: '#007bff', // Line color
                backgroundColor: 'rgba(0, 123, 255, 0.1)', // Fill color
                fill: true, // Fill under the line
            }]
        },
        options: {
            responsive: true, // Make the chart responsive
            maintainAspectRatio: false, // Allow the chart to stretch to fill the container
            scales: {
                y: {
                    beginAtZero: true, // Start Y-axis from 0
                    title: {
                        display: true,
                        text: 'Tons' // Y-axis title
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year' // X-axis title
                    }
                }
            }
        }
    });
}

// Coal Price Chart
const priceCtx = document.getElementById('coalPriceChart')?.getContext('2d');
if (priceCtx) {
    const coalPriceChart = new Chart(priceCtx, {
        type: 'line',
        data: {
            labels: ['2021', '2022', '2023', '2024'], // X-axis labels
            datasets: [{
                label: 'Coal Price (INR/ton)', // Dataset label
                data: [5740, 6150, 6560, 6970], // Y-axis data (price in INR)
                borderColor: '#ff6384', // Line color
                backgroundColor: 'rgba(255, 99, 132, 0.1)', // Fill color
                fill: true, // Fill under the line
            }]
        },
        options: {
            responsive: true, // Make the chart responsive
            maintainAspectRatio: false, // Allow the chart to stretch to fill the container
            scales: {
                y: {
                    beginAtZero: true, // Start Y-axis from 0
                    title: {
                        display: true,
                        text: 'INR/ton' // Y-axis title
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year' // X-axis title
                    }
                }
            }
        }
    });
}

// Onboarding Process
document.addEventListener('DOMContentLoaded', () => {
    const onboardingSteps = [
        {
            element: '#login-form',
            title: 'Login',
            description: 'Use this form to log in to your account. Enter your email, password, and username to access the dashboard.',
        },
        {
            element: '.flashcard',
            title: 'Flashcards',
            description: 'Click on any flashcard to view detailed information about a specific coal category.',
        },
        {
            element: '#coalProductionChart',
            title: 'Coal Production Chart',
            description: 'This chart shows the production trends of coal over the years. Hover over the chart to see detailed data.',
        },
        {
            element: '#chatbot-container',
            title: 'Chatbot',
            description: 'Use the chatbot to ask questions about coal data. It can provide information on production, costs, and more.',
        },
    ];

    let currentStep = 0;
    const onboardingModal = document.getElementById('onboarding-modal');
    const onboardingTitle = document.getElementById('onboarding-title');
    const onboardingDescription = document.getElementById('onboarding-description');
    const onboardingProgress = document.getElementById('onboarding-progress');
    const onboardingNextBtn = document.getElementById('onboarding-next-btn');
    const onboardingSkipBtn = document.getElementById('onboarding-skip-btn');

    // Function to show the onboarding modal
    function showOnboardingModal() {
        onboardingModal.style.display = 'block';
        updateOnboardingStep();
    }

    // Function to update the onboarding step
    function updateOnboardingStep() {
        const step = onboardingSteps[currentStep];
        onboardingTitle.textContent = step.title;
        onboardingDescription.textContent = step.description;
        onboardingProgress.textContent = `Step ${currentStep + 1} of ${onboardingSteps.length}`;

        // Highlight the element being explained
        const element = document.querySelector(step.element);
        if (element) {
            element.style.border = '2px solid #007bff';
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Function to move to the next step
    function nextStep() {
        const currentElement = document.querySelector(onboardingSteps[currentStep].element);
        if (currentElement) {
            currentElement.style.border = ''; // Remove highlight
        }

        currentStep++;
        if (currentStep < onboardingSteps.length) {
            updateOnboardingStep();
        } else {
            // End of onboarding
            onboardingModal.style.display = 'none';
            localStorage.setItem('onboardingCompleted', 'true');
            alert('Onboarding complete! You are now ready to use the website.');
        }
    }

    // Function to skip the onboarding process
    function skipOnboarding() {
        onboardingModal.style.display = 'none';
        localStorage.setItem('onboardingCompleted', 'true');
    }

    // Event listeners for buttons
    onboardingNextBtn.addEventListener('click', nextStep);
    onboardingSkipBtn.addEventListener('click', skipOnboarding);

    // Check if onboarding has already been completed
    if (!localStorage.getItem('onboardingCompleted')) {
        showOnboardingModal();
    }
});

// Toggle Chatbot Visibility
function toggleChatbot() {
    const chatbotContainer = document.getElementById('chatbot-container');
    console.log('Chatbot toggled'); // Debugging
    if (chatbotContainer) {
        chatbotContainer.classList.toggle('active');
    } else {
        console.error('Chatbot container not found');
    }
}

// Chatbot Send Message Functionality
const chatbotSendBtn = document.getElementById('chatbot-send-btn');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

// Predefined questions and answers
const predefinedQuestionsAndAnswers = {
    "What are the different types of coal?": "There are four main types of coal: 1. Anthracite: The highest rank of coal with the highest carbon content. 2. Bituminous: A middle-rank coal widely used for electricity generation. 3. Sub-bituminous: Lower in carbon content than bituminous. 4. Lignite: The lowest rank of coal with the lowest heating value.",
    "What are the production trends for bituminous coal?": "Here are the production trends for bituminous coal: - 2021: 900,000 tons at $65/ton - 2022: 1,000,000 tons at $70/ton - 2023: 1,100,000 tons at $75/ton.",
    "How much does anthracite coal cost, and is it widely available?": "Anthracite coal costs around $100/ton. However, it has limited availability due to its high carbon content.",
    "What is lignite coal used for?": "Lignite coal is primarily used for electricity generation in power plants located near mining sites.",
    "What is the environmental impact of coal production?": "Coal production can lead to greenhouse gas emissions, air pollution, and land degradation. Efforts are being made to reduce these impacts through cleaner technologies.",
    "Which country has the largest coal reserves?": "The United States has the largest coal reserves in the world, followed by Russia, Australia, and China.",
    "How much of the world's energy comes from coal?": "Coal accounts for approximately 27% of global energy production.",
    "What is the future of coal in the energy sector?": "The future of coal is uncertain due to the global shift toward renewable energy sources like solar and wind. However, coal is expected to remain significant in developing countries.",
    "What are the main methods of coal mining?": "The two main methods of coal mining are: 1. Surface mining: Used when coal deposits are close to the surface. 2. Underground mining: Used for deeper coal deposits.",
    "How is coal used in steel production?": "Coal is used in steel production primarily in the form of coking coal, which is heated to produce coke. Coke is then used in blast furnaces to reduce iron ore into molten iron.",
};

// Function to add a message to the chat
function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
}

// Event listener for sending messages
chatbotSendBtn.addEventListener('click', async () => {
    const userMessage = chatbotInput.value.trim();
    if (!userMessage) return;

    // Add user message to chat
    addMessage('user', userMessage);
    chatbotInput.value = '';

    // Check if the question is predefined
    const answer = predefinedQuestionsAndAnswers[userMessage];
    if (answer) {
        // If the question is predefined, return the answer
        addMessage('bot', answer);
    } else {
        // If the question is not predefined, send it to the OpenAI API
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`, // Use your OpenAI API key
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant that provides information about coal data.',
                        },
                        {
                            role: 'user',
                            content: userMessage,
                        },
                    ],
                }),
            });

            const data = await response.json();
            const botMessage = data.choices[0].message.content;

            // Add bot message to chat
            addMessage('bot', botMessage);
        } catch (err) {
            console.error('Error fetching response from OpenAI:', err);
            addMessage('bot', 'Sorry, I am unable to process your request at the moment.');
        }
    }
});