import Vue from 'vue'
// import Upload from '@/components/modals/upload/Upload'


// import uploader from 'vue-simple-uploader'
// Vue.use(uploader)

import Upload from '@/components/modals/upload/Upload'

export default ({store,app: { $axios,$cookies}}) => {
    let instance
    if (!instance) {
        const UploadConstructor = Vue.extend(Upload)
        instance = new UploadConstructor({store,$axios,$cookies})
        instance.$mount(document.createElement('div'))
        document.body.appendChild(instance.$el)
    }
    Vue.prototype.$Upload = instance.confirm
    return instance
}
