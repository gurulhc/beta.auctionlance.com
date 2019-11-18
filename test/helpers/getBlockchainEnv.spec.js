import setUpBlockchainEnvironment from '@/helpers/getBlockchainEnv'

describe('getBlockchainEnv', () => {
  it("Returns main base url and dAppAddress when passed the string 'main'", () => {
    const env = {
      dAppAddress: '3P7wZ8sfWmsFM5f2tdAWj21gLm4tma2RHyQ',
      baseUrl: 'https://nodes.wavesnodes.com/addresses/data/'
    }
    expect(setUpBlockchainEnvironment('main')).toStrictEqual(env)
  })
  it("Returns test base url and dAppAddress when passed the string 'test'", () => {
    const env = {
      dAppAddress: '3N2EM5HFgf6UMBnvcJX3Cegmozwdv1iDeq2',
      baseUrl: 'https://nodes-testnet.wavesnodes.com/addresses/data/'
    }
    expect(setUpBlockchainEnvironment('test')).toStrictEqual(env)
  })
})
