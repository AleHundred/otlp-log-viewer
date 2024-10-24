# 🪵 OpenTelemetry Protocol Log Viewer

This project is a log viewer for OpenTelemetry Protocol (OTLP) logs, built with Next.js and TypeScript.

## Features

- Display logs in a table format with detailed log information.
- Expandable log entries to show additional details, such as attributes and metadata.
- Histogram visualization for viewing log distribution over time.
- Fully responsive design for use across different device types.

## Installation

1. Clone the repository:

   `bash
git clone https://github.com/alehundred/otlp-log-viewer.git
cd otlp-log-viewer
`

2. Install the required dependencies:

   `bash
npm install
`

## Running the Application

To start the development server, run:

`bash
npm run dev
`

After starting the server, open [http://localhost:3000](http://localhost:3000) in your browser to view the app in action.

### Available Scripts

- **npm run dev**: Starts the development server.
- **npm run build**: Builds the project for production.
- **npm start**: Starts the production server after the build.
- **npm test**: Runs the test suite.
- **npm run lint**: Lints the code using ESLint.
- **npm run format**: Formats the code using Prettier.

## Running Tests

To run the test suite, execute:

`bash
npm test
`

This will run unit tests using Jest and React Testing Library to ensure that components behave as expected.

## Building for Production

To build the application for production, use:

`bash
npm run build
`

Once built, you can start the production server with:

`bash
npm start
`

This optimizes the build and serves the production version of the app.

## Technologies Used

This project utilizes the following technologies:

- **Next.js**: A React framework for building server-side rendered applications.
- **TypeScript**: Strongly typed JavaScript, ensuring more reliable code.
- **React**: JavaScript library for building user interfaces.
- **Recharts**: Library for building chart visualizations, used here for the log histogram.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Jest and React Testing Library**: Used for unit testing components.

## Directory Structure

- **/components**: Contains all React components.
- **/pages**: Includes the main application pages for the log viewer.
- **/public**: Static assets such as images and icons.
- **/styles**: Global CSS files or Tailwind configuration.
- **/tests**: Test files for unit testing components and utilities.

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and test them thoroughly.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.

## Resources

- [OpenTelemetry Overview](https://www.splunk.com/en_us/blog/learn/opentelemetry.html#:~:text=OpenTelemetry%20collects%20several%20classes%20of,coherence%20to%20multi%2Dlayered%20ecosystems)
- [OpenTelemetry Logs](https://opentelemetry.io/docs/concepts/signals/logs/)
