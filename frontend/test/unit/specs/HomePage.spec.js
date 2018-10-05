import Vue from 'vue'
import HomePage from '../../../src/components/HomePage/HomePage.vue'

describe('HomePage.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HomePage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hero-body .container .title').textContent)
      .to.equal('Bem Vindo!')
  })
})
