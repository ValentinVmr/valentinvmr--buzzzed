# Buzzzed

Buzzzed is an application to create virtual buzzers (for blind tests for example).
To do so, the application will create a SocketIO room where you can invite your friends to join and start to enjoy !

## Demo
You can visit the [demo](#) to see the application in action.

## Installation
To install the application, you need to clone the repository and install the dependencies.
```bash
git clone https://github.com/ValentinVmr/valentinvmr--buzzzed Buzzzed
cd Buzzzed/server && npm install
cd ../webapp && npm install
```

## Starting the server and the webapp
You can start the server and the webapp by running the following command in the root directory.
```bash
docker-compose up --build
```

It will build the server and the webapp images and start the containers.

## Usage
To use the application, you need to open the webapp and create a room by visiting [http://localhost:3000](http://localhost:3000) :
you will be redirected to the room join or creation page where you can join an existing room or create one and start to Buzzz!

## Contributing
1. Clone the project.
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Code owners
Check the `CODEOWNERS` file to know the code owners.

## License
This project is under the MIT license. You are allowed to reproduce, distribute or use this project for commercial purposes.
For more details, check the `LICENSE` file.
