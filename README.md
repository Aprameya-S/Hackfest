# VitalFund
> VM Instance -> http://34.131.106.178 &emsp; Netlify link -> [vitalfund.netlify.app](https://vitalfund.netlify.app/)

VitalFund is an online platform that facilitates multi-user crowdfunding for health-related campaigns. The goal of this project is to develop an online crowdfunding platform for healthcare that utilizes blockchain technology and cryptocurrency transactions to provide secure, transparent, and efficient funding for medical treatments.

<pre>
VitalFund offers significant advantages over other crowdfunding platforms, including:
🔶 Data security measures facilitated by the use of blockchain technology
🔶 Ensured transaction security through the implementation of smart contracts and Metamask integration
🔶 Streamlined fund disbursement, whereby funds are directly transferred to the beneficiary's account, eliminating the need for manual collection as is often required on other platforms
🔶 Real-time tracking of campaign progress and transaction status, providing users with up-to-date and transparent information throughout the crowdfunding process.
</pre>

Developed using the React.js framework, the VitalFund platform incorporates blockchain technology to create and store campaign data. In order to accomplish this, it employs a Solidity smart contract which is deployed using Hardhat, and synchronized with Thirdweb for ease of debugging and visualization. To initiate a campaign, users may easily do so by linking their Metamask account and completing a form, which stores the user's name, ailment description, and image on the blockchain.

In order to execute fund transfers, the platform utilizes a secondary Solidity smart contract, which is integrated with Metamask to facilitate Ethereum transactions. This feature can be extended to various other wallets in future updates.

The two smart contracts were initially tested on Remix and GCP geth node, and subsequently deployed utilizing Hardhat configured for Sepolia ETH(Testnet) for better accessibility. Access to campaign and transaction data is attained by various elements of the application through [contexts](./client/src/context/) and state that are passed through routes. To enable communication between the blockchain and the application, as well as to provide utility functions, Ethers.js is employed. The synergistic interplay of the two smart contracts allows for a seamless and secure experience for both campaign beneficiaries and donors, rendering VitalFund a truly cutting-edge platform for health-related crowdfunding.

The UI built on React.js uses SASS(Syntactically Awesome Stylesheet) and Tailwind for dynamic styling. All info is easily accessible through nav links. Users can track and monitor all their activities(campaigns) and transactions on their profile page. 

Drawbacks of conventional online crowdfunding platforms:\
❌ Lack of regulation: A study published in the Journal of Medical Ethics found that many crowdfunding campaigns for healthcare funding are not regulated by government agencies, such as the Central Drugs Standard Control Organisation(CDSCO), which can lead to misuse of funds.

❌ Inequitable distribution: Crowdfunding campaigns for healthcare funding tend to favor certain medical conditions over others. For example, cancer campaigns tend to raise more money than campaigns for mental health or rare diseases. This can create an uneven playing field and leave some patients with insufficient funds.

❌ Limited reach: Most transactions are local due to the constraints of national currency.

How VitalFund tackles these problems:\
✅ Blockchain technology allows for a decentralized network, meaning that no central authority or intermediary is controlling the transactions. This reduces the risk of fraud or corruption, as all transactions are transparent and can be traced back to their source. Other online crowdfunding platforms tend to hold the funds until the campaign ends or till the beneficiary manually collects the funds. This opens the door to possible mismanagement of funds. Our platform facilitates a direct transaction between donor and beneficiary which eliminates the problem of fund management.

✅ Our platform is impartial to campaigns providing equal exposure to all campaigns.

✅ Global reach: Cryptocurrency transactions allow for instant, borderless transactions, which means that donors from all over the world can contribute to a healthcare crowdfunding campaign. This increases the potential pool of donors and can help to raise funds more quickly.

### Tech stack:
<pre>
• React.js
• Firebase
• Thirdweb
• Node.js
• Hardhat
• Remix
• VM Instances(GCP)
• Metamask
• Solidity
• SASS
• Smart contracts
• Tailwind 
</pre>
