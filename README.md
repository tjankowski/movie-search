## Summary

Responsive movie search demo.
Demo allows user to search for movie/series/game and display details for selected result. Infinite scroll pattern is used to load more results from API when needed.

[Demo](https://movie-search-five.vercel.app/)

> Unfortunately due to the [NextJS 10 issue](https://github.com/vercel/next.js/issues/18769) deployed on Vercel unstyled content(FOUC) is visible when user navigates between pages. Issue is not present on development environment

> Deployed new vesion using NextJS 9.5.1 which doesn't have unstyled content issue but it has other issue with CSS order.

### Features backlog

- [x] Searching page with form
- [x] Search results using OMDB API
- [x] Load details using OMDB API
- [x] Handle fetching errors
- [x] Handle no resuls error
- [x] Handle no resuls error
- [x] Support results paging using infinite scroll pattern
- [x] Display data loading status using skeletons pattern
- [x] Server-side rendering based on query parameter
- [x] Query parameter update in URL during searching
- [x] Enter and exit animations for pages
- [x] Staggering animation for loaded results
- [x] Page to display basic details for selected item
- [x] Responsive UI
- [x] John Travolta looking for missing posters
- [ ] Transform images using Cloudinary SDK
- [ ] Narrow searching results to selected type like movie, series, game. Filters displayed as part of search form on additional panel below input field.
- [ ] Staring animation. Display search form in the middle of the page and move it to the top when users starts typing.
- [ ] Replace search form placeholder with typing animation presenting how to search. Animation would present example queries by changing value of the input characted by character in both directions, simulating typing and deleting query using Backspace.
- [ ] Add multimodal design by adding voice interactions. Create voice interface using Dialogflow connected with application API and browsers microphone support. Add basic commands to search movie, display details and navigate between pages.
- [ ] Display more details on details page like ratings.
- [ ] Add reviews and comments using Disqus API.
- [ ] Add PWA support.
- [ ] Create multiplayer game about finding movie based on the plot. Multiplayer support implemented using WebSockets. Scoring based on time and number of tries.

### Project structure:

- `/api` - contains logic to fetch data from API
- `/components` - directory for stateles reusable UI compoents
- `/hooks` - directory for React hooks for IntersectionObserver and data fetching
- `/pages` - NextJS pages for used as components with state and UI logic
- `/public`- directory to store public assets
- `/scripts`- directory for additional scripts helpful during development
- `/styles`- directory for CSS & SCSS styles
- `/utils`- functions used across application

3rd party libraries used for project:

- `sass` - to style UI
- `lodash.debounce` - to limit calls to API on user interaction
- `react-loading-skeleton` - to display placeholders during data fetching
- `framer-motion` - to add some animations
- `dotenv` - to load environment variables
- `jest` - for unit testing

To improve:

- create unit tests for hooks
- add integration tests because API design is uncertain
- add development tools like eslint, prettier and git hooks
- improve image tranformations using Cloudinary SDK

## Usage

### `Setup`

Requirements to run:

- one of latest NodeJS versions - created using `14.3.0`
- `yarn` or `npm` to download dependecies and run scripts
- .env or .env.local files with variables

### Quick start

1. Install dependecies using `yarn` or `npm`
2. Run in development mode using start script `yarn dev` or `npm run dev`
3. Create .env file with NEXT_PUBLIC_API_URL (https://www.omdbapi.com) & NEXT_PUBLIC_API_TOKEN variables with proper values.

### Commands

```
yarn dev
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```
yarn test
```

Launches the test runner.<br />

```
yarn build
```

Builds the application for production usage.

```
yarn start
```

Starts a Next.js production server
