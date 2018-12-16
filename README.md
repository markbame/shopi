#SHOP WITH SOCIAL NETWORK - REACT SSR FIREBASE - MMR for development mode

* You can also pre transpile before running in production
* You can deploy in heroku for staging or production


### Getting started

* clone the project: `git clone <git url>`
* `npm install`
* run `npm run dev` - for mmr development
* run `npm run devbuild` - fast development build
* run `npm run build` - for production


### formatting, es2017+, etc.

We have all the esXXXX things - es2015, es2016, es2017, object-rest-spread - courtesy of babel.

### Tests

Testing via jest, with test files adjacent to the unit under test and named \*.test.js, eg.

### Configuration

Configuration uses 12factor-config, extracting all of the meaningful config properties to env
variables as described by [The Twelve Factor App](https://12factor.net/).

You'll need to set env vars for all of the non-default properties, and maybe override some of
the defaults too.

One way to do this in development is to create a .env file in the root of the project app.

In code you can access the config properties simply by importing `config/index.js` from the project root.
