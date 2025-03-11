# Coal Dashboard

A web-based dashboard for monitoring and analyzing coal production, consumption, and related metrics. This project includes a frontend built with HTML, CSS, and JavaScript, and a backend powered by Flask for user authentication.

## Features

- **User Authentication**: Login and logout functionality with JWT-based authentication.
- **Dashboard**: Overview of coal production, pricing, exports, and imports.
- **Coal Categories**: Detailed pages for different types of coal (Bituminous, Anthracite, Lignite, Sub-bituminous).
- **Interactive Charts**: Visualize coal production and pricing trends using Chart.js.
- **AI Chatbot**: A chatbot powered by OpenAI to answer questions about coal data.
- **Onboarding Process**: A step-by-step guide to help new users navigate the dashboard.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Technologies Used

### Frontend
- HTML, CSS, JavaScript
- Chart.js for data visualization

### Backend
- Python
- Flask

### Version Control
- Git

## Setup Instructions

### Prerequisites

1. **Install Python 3.x**: Download and install Python from [python.org](https://www.python.org/).
2. **Install Flask**: Run the following command:
   bash
   pip install flask flask-cors
   

### Installation

1. Clone the repository:
   bash
   git clone https://github.com/DEEPTHID123/coal-dashboard
   cd coal-dashboard
   
2. Navigate to the backend directory:
   bash
   cd backend
  
3. Run the Flask backend:
   bash
   python app.py
   
4. Set up the frontend:
   - Open `index.html` in your browser.
   - Alternatively, use a local development server (e.g., VS Code Live Server).
5. Login using the authentication page.
6. Explore the dashboard and coal category pages to view data and charts.

## Project Structure


coal-dashboard/
├── index.html            # Login page
├── dashboard.html        # Main dashboard
├── bituminous.html       # Bituminous coal details
├── anthracite.html       # Anthracite coal details
├── lignite.html          # Lignite coal details
├── sub-bituminous.html   # Sub-bituminous coal details
├── category.html         # Generic category details page
├── settings.html         # Generic settings page
├── styles.css           # Global styles
├── script.js            # JavaScript for interactivity
├── app.py               # Flask backend
├── README.md            # Project documentation
└── images/              # Folder for images (e.g., coal category images)

