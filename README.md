# Rhabit Take Home Assessment
This is the take home engineering assessment for Rhabit. 

## Set up
### Prerequisites
Make sure that you have Ruby, Ruby on Rails, Node, React, PostgresSQL installed.
My versions:
```
ruby 2.6.1p33 (2019-01-30 revision 66950) [x86_64-linux]
Rails 5.2.2
Node v10.4.0
psql (10.6 (Ubuntu 10.6-0ubuntu0.18.04.1))
```

### Installation
1. Clone the repo

Frontend setup
```
cd rhabitorg
npm i
npm start
```

Backend Setup
create postgres user with username: rhabit password: rhabit1
```
cd rhabitOrg-api
bundle install
rake db:seed
rake db:setup

rails server -p 3001 //Make sure port is 3001. React is running on 3000
```

## Things to impove on if had more time
* Better Chart Visualization
* Look into performance
* Run unit tests
* Run usability tests

