import Vue from 'vue'
import Banner from '../../../../src/components/fixed/Banner.vue'

function getRenderedText(Component, propsData) {
    const Constructor = Vue.extend(Component);
    const vm = new Constructor({ propsData: propsData }).$mount();
    return vm.$el.querySelector('.title').textContent;
}


describe('Banner.vue', () => {
  it('should render correct contents', () => {
    expect(getRenderedText(Banner, {
        titulo: 'bem vindo'
    })).to.equal('bem vindo');
  })
})
