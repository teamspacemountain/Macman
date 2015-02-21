While in MacMan directory via command line, execute:

npm install

node app.js

Open new terminal window and navigate to MacMan directory:

mongod --dbpath .

Open new terminal window and navigate to MacMan directory:

mongo

use MacMan

Populate the database with the following sample data:

db.scores.insert({name: "Pikachu", score:500})

db.scores.insert({name: "Blastoise", score:400})

db.scores.insert({name: "Dragonite", score:300})

db.scores.insert({name: "Tyranitar", score:200})

db.scores.insert({name: "Gyarados", score:100})

Navigate to localhost:8080. 

Enjoy!