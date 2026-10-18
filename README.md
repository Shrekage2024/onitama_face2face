# Onitama App — Face to Face Edition
[![CI](https://github.com/Shrekage2024/onitama_face2face/actions/workflows/ci.yml/badge.svg)](https://github.com/Shrekage2024/onitama_face2face/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/Shrekage2024/onitama_face2face/actions/workflows/pages.yml/badge.svg)](https://github.com/Shrekage2024/onitama_face2face/actions/workflows/pages.yml)

Play the board game [Onitama](https://www.arcanewonders.com/onitama/) in your browser: against a bot, with a friend
online, or **face to face on one iPad**.

**Play now: [https://shrekage2024.github.io/onitama_face2face/](https://shrekage2024.github.io/onitama_face2face/)**

This is a fork of [jackadamson/onitama](https://github.com/jackadamson/onitama) (played at
[onitama.app](https://onitama.app/)), adding a two-player tablet mode and an updated tech stack.

## Face to Face mode

Two players sit across from each other with a tablet lying flat between them, like a chess board.

- Red sits at the bottom, Blue at the top. Each player's cards, turn status and pieces are rotated to face them,
  and each card's move pattern is shown from that player's point of view.
- Players take turns. The active player's side is highlighted and only their cards can be tapped.
- The spare ("Next card") sits with the player about to move, and the result ("You win!" / "You lose!") is shown
  to each player the right way up, with a Rematch button over the board.
- The board scales to fill the screen and works in portrait or landscape.

On an iPad: open the link in Safari, tap **Share → Add to Home Screen**, then launch it from the home screen to play
full screen. After the first visit it also works offline.

The [GitHub Pages](https://shrekage2024.github.io/onitama_face2face/) version includes Face to Face, Local
Multiplayer, Single Player and Training, with the AI running in the browser. Online Multiplayer needs the server,
so it is only available when running the Docker image (see [Deployment](#deployment)).

## What's new in this fork

- **Face to Face (Tablet) mode** for two players on one device (described above)
- **Hosted on GitHub Pages**, redeployed automatically on every push to `master`
- **Rust**: `wasm-bindgen` upgraded so the project builds on current stable Rust (no nightly), unmaintained crates
  replaced, edition 2021
- **Frontend**: Create React App replaced with Vite; React 19, MUI 9 and React Router 7; Node 22
- **Tooling**: ESLint 9 + Prettier 3, a CI workflow running tests, lint and builds on every pull request, and
  updated Docker images (Rust 1.97, Node 22)
- **Security**: known npm advisories reduced from 602 to 0

## Roadmap

Things that could be cool to implement, that aren't done yet, and might one day get done

- [x] Show piece that last moved, and where it moved from
- [x] Say when opponent has requested a rematch
- [ ] Add chat (maybe)
- [x] Add "how to play"
- [x] Add different difficulty AIs

## Local AI

The default Dockerfile will disable server-side AI, and instead compile the AI Agent as web-assembly and run in a
JS WebWorker.

An alternate Dockerfile (`Dockerfile.remoteai`) uses server-side AI which runs the agent code in the same process that
serves the game and delivers messages for multiplayer games.

~~The server-side AI is roughly 30x faster at running Monte Carlo simulations, meaning that the hard bot is notably harder when run server side.~~  
The server side AI is roughly 2x faster, ever since swapping out the RNG used in the Monte Carlo search. Previously it was
significantly slower.

To use server-side AI, build the container with
```bash
docker build -t onitama:remoteai -f Dockerfile.remoteai .
```

The original [https://onitama.app/](https://onitama.app/) uses the **local AI** as it is
very light on server resource requirements.

## Deployment

### Run from GitHub

Images are published to the GitHub container registry when a `v*` tag is pushed.

Pull from GitHub container registry
```bash
docker pull ghcr.io/shrekage2024/onitama:<tag>
```

Run the container
```bash
docker run -dp 80:80 --name onitama --rm ghcr.io/shrekage2024/onitama:<tag>
```

### build Locally

build the container
```bash
docker build -t onitama .
```

Run the container
```bash
docker run -dp 80:80 --name onitama --rm onitama
```

## Development

Requires Rust (stable, with the `wasm32-unknown-unknown` target) and Node (v22, see `.nvmrc`).
The frontend is built with [Vite](https://vite.dev/).

1. Install the wasm target with `rustup target add wasm32-unknown-unknown`
1. Install dependencies with `yarn install`  
1. Build the game library to WebAssembly with `yarn build-native-dev`
   (re-run after changing Rust code in `onitamalib`)
1. Start the backend with `cargo run --bin onitamaserver`
1. Start the frontend with `yarn start`
1. Visit [http://localhost:3000](http://localhost:3000) to see the app

To develop single-player without the backend, start the frontend with
```bash
yarn start-local-ai
```
