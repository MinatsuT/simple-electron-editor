# Simple Electron Text Editor

This project is a simple text editor built using Electron. It provides a basic interface for creating and editing text files.

## Project Structure

```
simple-electron-editor
├── src
│   ├── main.js        # Main process entry point
│   ├── preload.js     # Preload script
│   ├── renderer.js    # Renderer process script
│   ├── index.html     # HTML structure for the main window
│   └── styles
│       └── main.css   # Stylesheet for the application
├── package.json       # npm configuration file
├── .gitignore         # Specifies files and directories to ignore in Git
└── README.md          # Project documentation
```

## Getting Started

To get started with the Simple Electron Text Editor, follow these steps:

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/simple-electron-editor.git
   cd simple-electron-editor
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

## Features

- Create and edit text files
- Simple and intuitive user interface
- Save and overwrite files
- Open files via drag & drop
- Warning for unsaved changes
- Status bar displaying filename and modification state

## Keyboard Shortcuts

- `Ctrl+N` / `Cmd+N` - Create new file
- `Ctrl+O` / `Cmd+O` - Open file
- `Ctrl+S` / `Cmd+S` - Save file
- `Ctrl+Shift+S` / `Cmd+Shift+S` - Save as

## Build Instructions

To build the application for different platforms:

- **Build for Windows:**
  ```
  npm run build:windows
  ```

- **Build for Mac:**
  ```
  npm run build:mac
  ```

- **Build for Linux:**
  ```
  npm run build:linux
  ```

- **Build for all platforms:**
  ```
  npm run build
  ```

The built applications will be output to the dist directory.

## License

This project is licensed under the MIT License.