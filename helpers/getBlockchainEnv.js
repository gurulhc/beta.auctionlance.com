export default function setUpBlockchainEnvironment(environment) {
  switch (environment) {
    case 'test':
      return {
        dAppAddress: '3N2EM5HFgf6UMBnvcJX3Cegmozwdv1iDeq2',
        baseUrl: 'https://nodes-testnet.wavesnodes.com/addresses/data/'
      }
    case 'main':
      return {
        dAppAddress: '3P7wZ8sfWmsFM5f2tdAWj21gLm4tma2RHyQ',
        baseUrl: 'https://nodes.wavesnodes.com/addresses/data/'
      }
  }
}
