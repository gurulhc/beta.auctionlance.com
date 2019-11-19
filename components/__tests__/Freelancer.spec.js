import { shallowMount } from '@vue/test-utils'
import Freelancer from '../Freelancer'

const factory = () => {
  return shallowMount(Freelancer)
}

describe('Freelancer', () => {
  it('mounts properly', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
