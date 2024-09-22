# Ollama Chatbot Interface with Code Highlighting

This project is a React-based user interface for interacting with the Ollama API. It allows users to select different preloaded LLM (Large Language Model) models, ask questions, and receive answers, including the ability to display code snippets with syntax highlighting and a "Copy" button for easy copying.

## Features

- Select from various preloaded LLM models, dynamically retrieved from the Ollama API.
- Send questions and receive real-time responses.
- Render code blocks with syntax highlighting tailored to the language of the code.
- Easy copying of code blocks with a dedicated "Copy to clipboard" button.
- Fully responsive and centered layout for optimal user experience.

## Installation

Follow these steps to get the project up and running on your local machine:

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/get-npm) (typically comes with Node.js)
- Ollama running on your local machine (ensure it is properly set up).

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yusatll/ollama-simple-ui.git
   cd ollama-chat-interface
2. **Install Dependencies:**
    ```bash
    npm install
3. **Start the Ollama Server:**
    Make sure the Ollama server is active by running:

    ```bash
    ollama serve
4. **Run the React Application:**
    ```bash
    npm start
This starts the development server and opens the application in your default web browser at http://localhost:3000.

## How to Use
+ **Select a Model:** Use the dropdown at the top to choose one of the available LLM models.
+ **Type Your Question:** Enter your query in the input box and click "Send".
+ **Receive Responses:** The model's responses will be displayed in the chat interface.
+ **Code Blocks:** If a response includes code (indicated with triple backticks and optional language identifier), it will be highlighted according to the specified language, and you will have the option to copy the code directly from the interface.

## Project Structure

```plaintext
.
├── public
│   └── index.html             # HTML entry point
├── src
│   ├── App.js                 # Main React component
│   ├── CodeBlock.js           # Component for rendering and copying code blocks
│   ├── App.css                # Main stylesheet for the application
│   └── index.js               # React application entry point
├── README.md                  # Documentation for the project
├── package.json               # Project metadata and dependencies
└── .gitignore                 # Specifies intentionally untracked files to ignore 
```


## Dependencies
+ **React:** For building the user interface.
+ **axios:** For making HTTP requests.
+ **highlight.js:** For syntax highlighting of code blocks.
+ **Ollama:** Required to run large language models locally.

## Future Improvements
+ Implement more interactive features, such as voice input and responses.
+ Enhance security measures for API interactions.
+ Improve accessibility features for better usability.

## Contributing
Contributions to this project are welcome! You can contribute by:

- Forking the repository,
- Creating a new branch for your feature,
- Committing your changes,
- Pushing to the branch,
- Opening a pull request.

## License
This project is made available under the MIT License.