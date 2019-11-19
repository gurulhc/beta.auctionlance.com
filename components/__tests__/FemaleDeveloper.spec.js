import { shallowMount } from '@vue/test-utils'
import FemaleDeveloper from '../FemaleDeveloper'

const factory = () => {
  return shallowMount(FemaleDeveloper, {})
}

describe('FemaleDeveloper', () => {
  it('mounts properly', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
