depends_on: This tells Docker that FE is useless without BE, it needs BE to activate FE
networkds: It creates a private, isolated tunnel where your containers can talk to each other securely.

How to turn on the app?
Open Docker and docker-compose up --build