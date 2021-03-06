/**
 * Created by Administrator on 2016/12/23.
 */
import Vue from 'vue'
import modal from './modal.vue'

let ModalConstructor = Vue.extend(modal)

let instance
function initInstance () {
  instance = new ModalConstructor({
    el: document.createElement('div')
  })
}

let showModal = options => {
  if (!instance) {
    initInstance()
    document.body.appendChild(instance.$el)
  }
  instance.path = ''
  for (let key in options) {
    instance[key] = options[key]
  }
  if (!instance.value) {
    Vue.nextTick(() => {
      instance.value = true
    })
  } else {
    instance.value = false
  }
}
export {showModal}
