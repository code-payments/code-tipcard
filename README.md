# Code Tip Card
![license][license-image]
![version][version-image]

[version-image]: https://img.shields.io/badge/version-0.1.0-blue.svg?style=flat
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat

This repository contains the backend for the Code Tip Card project, a new feature in the Code app that enables any Code user to seamlessly accept tips from anyone in the world.

##  What is Code?

[Code](https://getcode.com) is a mobile app that leverages self custodial 
blockchain technology to deliver a seamless payments experience that is instant, 
global, and private. 

## Development
The codebase is split into the following packages:

* `backend` - A server that shows a Code Tip Card for connected [X](https://x.com) accounts.
* `frontend` - Empty for now, the frontend is provided by the Code SDK.
* `renderer` - The opengraph tile renderer.

This project makes use of the [code-sdk](https://github.com/code-wallet/code-sdk).

## Quick Start
Each package has its own `Makefile`, which can be used to build and run the package. Additionally, you can run each package in a Docker container. Use `npm run dev` to run the local development environment both the frontend and backend.

<img width="50%" src="https://github.com/code-payments/code-cash-links/assets/623790/574c90bb-1bf5-42a8-85a3-bd03e678b64c">


## Getting Help

If you have any questions or need help integrating Code into your website or application, please reach out to us on [Discord](https://discord.gg/T8Tpj8DBFp) or [Twitter](https://twitter.com/getcode).

##  Contributing

For now the best way to contribute is to share feedback on [Discord](https://discord.gg/T8Tpj8DBFp). This will evolve as we continue to build out the platform and open up more ways to contribute. 
