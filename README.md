# Game database

School project for course 4IT573 - Node.js Basics.

## Inspirace:

https://backloggd.com/
https://infinitebacklog.net/
https://rawg.io/

## Functions:

- Registration and login
- Mark games with different statuses (completed, currently playing, etc.) and create your own catalog
- Add ratings (1 to 10) and written reviews to games
- Add games to Wishlist

## Get Started:

1. **Clone the Git repository**

   ```bash
   git clone https://github.com/MinttDrazi/4IT573_nodejs_semester_work.git
   cd 4IT573_nodejs_semester_work
   ```

2. **Create `.env` file**

   Copy the content of .env.example into .env.

   ```bash
   cp .env.example .env
   ```

3. **Add all missing values in the `.env` file**

4. **Install NPM packages**

   ```bash
   npm install
   cd client
   npm install
   ```

5. **Run database geneartion, migrations and seeders**

   ```bash
   cd ..
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

6. **Start development servers**

   ```bash
   npm run dev
   cd client
   npm run dev
   ```
