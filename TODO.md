## Inspirace:

https://backloggd.com/
https://infinitebacklog.net/
https://rawg.io/

## Funkce:

- registrace a prihlasovani
- Oznacovat hry ruznymi statusy (dohrano, prave hraji apod) a tim si vytvaret svou katalog
- Pridavat k hram hodnoceni (1 az 10) a psana recenze
- Pridavat hry do Wishlistu

## TODO

- [x] Registrace a prihlaseni
- [x] Routing na frontendu
- [x] JWT token (persinent login)
- [x] Zabezpeceni routingu, middleware
- [x] Pridani css knihovny na frontendu
- [x] Homepage - zobrazeni vsech videoher
- [x] Registration page
- [x] Reviews section
- [x] create review apis - view, create, update and delete
- [x] add confirm password frotend check
- [x] add logout api, add to frontend
- [x] login page
- [x] library page
- [x] wishlist page
- [x] Detail game page
- [x] add all endpoints - not yet implemented
- [x] divide app.js file to smaller files per service (services)
- [x] remake database
- [x] Define model types
- [x] pridat navigate to login and register page
- [x] devide db.js to smaller files per database table (repositories)
- [x] remake endpoints
- [x] finished and test the middleware
- [ ] add checks for body in api calls
- [x] pridat login/logout link do sidebaru

# Database

- users
- games
- library (m:n table references to user and game)
- wishlist (m:n table reference to user and game)
- review (table with references to user and game, with rating and text)
