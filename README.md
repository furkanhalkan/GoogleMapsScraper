# Google Maps Place Search

This is a Node.js application that uses the Google Places API to search for places based on a user-provided query. It searches for the places, retrieves their details, and logs them in the console.

## Prerequisites

Make sure you have Node.js installed on your computer. If not, download it from the [official website](https://nodejs.org/).

## Setup

1. Clone the repository:
```
git clone https://github.com/username/repository
```

2. Navigate into the repository:
```
cd repository
```

3. Install the necessary dependencies:
```
npm install
```

4. Create a \`.env\` file at the root of the project and add your Google Maps API Key:
```
GOOGLE_MAP_API=your_api_key_here
```

## How to Run

Start the application by running the \`index.ts\` file. 

```
ts-node index.ts
```

After running the \`index.ts\` file, you'll be asked to provide a query. This query should represent what you're searching for. For example, if you're searching for car rental services in Istanbul, you would enter: \`rent a car istanbul\`.

Example:
```
Please enter a query: rent a car istanbul
```

The application will then use the Google Places API to search for relevant places and display their details in the console.

## Error Handling

The application handles errors by logging them in the console. If an error occurs during the place search or while retrieving place details, it will be printed in the console.

## License

This project is licensed under the MIT License. See the LICENSE file for details.