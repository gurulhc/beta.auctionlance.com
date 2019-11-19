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
  it('contains a span with the class of spinner', () => {
    const wrapper = factory()
    expect(wrapper.html()).toContain('<span class="spinner">')
  })
  it('has an svg element', () => {
    const wrapper = factory()
    expect(wrapper.contains('svg')).toBeTruthy()
  })
})
