# Pomodoro Timer for WhatsApp

This application provides a simple Pomodoro timer that can be controlled via WhatsApp messages. Users can start, stop, and adjust the work and break intervals of the timer.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Commands](#commands)
5. [Contributing](#contributing)

## Prerequisites

Before you can run the application, make sure you have the following software installed on your machine:

1. Node.js (version 12 or higher)
2. npm (version 6 or higher)

## Installation

1. Clone the repository to your local machine.
   ```
   git clone https://github.com/farmhutsoftwareteam/whatsapp-pomodoro-timer.git
   ```

2. Navigate to the project folder and install the dependencies.
   ```
   cd whatsapp-pomodoro-timer
   npm install
   ```

3. Create a `.env` file in the root directory of the project and set the `PORT` environment variable to your desired port number (optional).
   ```
   PORT=8000
   ```

4. Start the application by running the following command in the terminal.
   ```
   node index.js
   ```

## Usage

1. Add your phone number to the .env file

2. Scan the QR code generated in the terminal using your WhatsApp application. This will pair the bot with your WhatsApp account.

3. Send a message to the bot to control the Pomodoro timer. Available commands can be found in the [Commands](#commands) section.

## Commands

Here is a list of commands you can send to the bot to control the Pomodoro timer:

- `start`: Starts a new Pomodoro timer with the current work and break interval durations.
- `stop`: Stops the current Pomodoro timer if it is running.
- `work [duration]`: Sets the work interval duration in minutes (e.g., `work 25`).
- `break [duration]`: Sets the break interval duration in minutes (e.g., `break 5`).
- `status`: Displays the current timer status (work or break) and the remaining time.

## Contributing
Please star this for me if you find it cool
If you wish to contribute to this project, please fork the repository, make your changes, and submit a pull request.