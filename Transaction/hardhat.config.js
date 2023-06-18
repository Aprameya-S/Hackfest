// https://eth-sepolia.g.alchemy.com/v2/B1yGMIHd0sTrfwXOUiROfYQr0liXYGbn

require ('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.19',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/EqmU3TJhCyfxQ_WEQuHy3y0q6RpCYKSS',
      accounts: [ '2231170a69e4e2a171029c7f8f8d6c9a7d2cf5115ca924142b538a0eff75f9f1' ]
    }
  }
}
// 0x95C95e18C587bea59BF7EFcbF809a8bb4c652468