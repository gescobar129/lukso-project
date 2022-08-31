# lukso-project

Evolve Wallet
Is a Lukso blockchain cryptocurrency wallet with a gamified NFT experience for mobile devices. The wallet allows the user to hold, send, and view LSP7 / LSP8 Tokens (the respective equivalents for ERC20 and ERC721 NFT standards on the Lukso Blockchain). Every wallet will have a virtual pet NFT that exists within the app and can grow based on the interactions the user does with the chain. On wallet creation the NFT is minted and ownership is granted to the Universal Profile. The more the user transacts with their wallet, the more exp their monster gains in turn unlocking new features. In the beginning the monster will start off as an egg, and over time it will hatch and grow!

MVP Features:
- [x] Create an Externally Owned Account wallet and Seed Phrase
- [x] Create and Deploy Universal Profile Contract
- [x] Create and Deploy Vault Contracts to better manage assets
- [x] Log in with your universal profile
- [x] Deposit funds / supported assets manually or using a QR code. You can select either one of the vaults or the Externally Owned account as a destination
- [x] Send Funds (using the supported assets list)
- [x] Deploy and mint digital Pet NFT
- [x] Observe your digital pet NFT interacting with the environment
- [x] View your owned NFT assets on the collectibles page
- [x] View your recent transactions on the Recent Activity page

MVP Video
You can also watch an overview video here https://youtu.be/FFuyGzOj-Z0

Technical Implementation
The project is built using React Native for iOS, XCode. We also utilized the web3 library to interact with the lukso blockchain.
At the moment this app is specifically designed for mobile (to be downloaded from the app store)


Improvements:
Ideally we want the Evolve Wallet to be THE goto wallet for Lukso. Natrually this requires building upon our proof of concept. Some of the things we want to add in the near future are:

- wallet connect integration, this will allow the evolve mobile app to link to any lukso dapp
- Leveling System for the NFT. In the proof of concept the Monster NFT did not handle leveling/exp points. Ideally as you transact on Lukso the NFT will gain experience points and evolve, and grow
- Improved Design and UX
- Create an `EvolveWallet` Contract that handles deploying and initializing all needed contracts in 1 transaction. Currently we create multiple transactions to set up the UP, Vaults, URD, NFT Monster, etc. This can take 30+ seconds or more to fully set up the account for the user. Ideally it would be great to do this all in 1 transaction via a smart contract to provide a superior experience
- Swap Tokens directly via the mobile app - we would integrate with an AMM on Lukso to allow users to swap tokens
- Increased Security features, FACE ID, 2fa, etc
- Lukso Analytics page + trending Lukso assets and NFTs



Installation
Must have Xcode installed (https://developer.apple.com/xcode/)
Select iphone 13 from the dropdown menu at the very top of Xcode
Once installed, you can run the following commands:

Clone the project
Run `yarn install`
`cd ios`, then `pod install` inside the ios directory (if you do not have cocoapods installed, you will have to install it. See here for more: https://guides.cocoapods.org/using/getting-started.html

Build Issue Workaround:
if you get the error ` 144 duplicate symbols for architecture x86_64` when attempting to build the project, there is a work around for this.
1. Open Xcode (if not open already)
2. In the project Navigator click on "Pods" and then under targets select `CocoaAsyncSocket`

<img width="423" alt="image" src="https://user-images.githubusercontent.com/90875884/187687945-ff0a3dfd-a34d-4bd7-b499-6822619279eb.png">

3. Delete `GCDAsyncSocket.h`, `GCDAsyncSocket.m`, `GCDAsyncUdpSocket.h`, `GCDAsyncUdpSocket.m`
<img width="489" alt="image" src="https://user-images.githubusercontent.com/90875884/187688190-69913ece-f1a5-40f0-94f0-46d228c5dfbd.png">

4. Try running again (this time it should build the project successfully)

Open XCode
File Open LuksoWalletApp.xcworkspace
Press the play button at the top to run the app in the iOS simulator

Team
Gaida Escobar - gescobar129@gmail.com
Keenan Alves - keenan.alves@gmail.com
Chris Gonzalez - cryptobank04@gmail.com
