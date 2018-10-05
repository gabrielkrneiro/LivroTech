import Vue from 'vue'
import LoginPage from '../../../src/components/LoginPage/LoginPage.vue'

describe('LoginPage.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(LoginPage)
    const vm = new Constructor().$mount()

    expect(vm.$el.querySelector('.container h1').textContent)
      .to.equal('Login')
  })
})
