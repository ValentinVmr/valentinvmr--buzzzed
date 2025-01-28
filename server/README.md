# Buzzzed Server

Buzzzed Server is an application to create online buzzers (for blind tests for example).
To do so, the application will create a SocketIO room where you can invite your friends to join and start to enjoy !

This project is part of the [Buzzed](https://github.com/ValentinVmr/valentinvmr--buzzzed) project.
This directory contains the server part of the project which is built with JavaScript and NodeJS.

## Installation
To install the application, you need to clone the repository and install the dependencies.
```bash
git clone https://github.com/ValentinVmr/valentinvmr--buzzzed Buzzzed
cd Buzzzed/server && npm install
```

## Start the server
You can start the server by running the following command in the server directory.
```bash
npm run start
```

You can also start the server using Docker by running the following command in the server directory.
```bash
docker build -t buzzzed-server .
docker run -p 8080:8080 buzzzed-server
```

Both commands will start the server on [http://localhost:8080](http://localhost:8080).

## Contributing
1. Clone the project.
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
6. Enjoy a refreshing :coffee: and wait for the review.

## Code owners
Check the `CODEOWNERS` file to know the code owners.

## License
This project is under the MIT license. You are allowed to reproduce, distribute or use this project for commercial purposes.