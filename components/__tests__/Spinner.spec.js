import { shallowMount } from '@vue/test-utils'
import Spinner from '../Spinner'

const factory = () => {
  return shallowMount(Spinner, {})
}

describe('Spinner', () => {
  it('mounts properly', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
