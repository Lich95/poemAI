
import { createI18n } from 'vue-i18n';

const messages = {
  en:{
  title:'AI Poem Generator',
  description:'Generate a poem about...',
  btnText:'Generate Poem',
  btnThinking:'Thinking',
  copy:'Copy',
  contentTitle:'Generated Poem',
  footer:'Powered By ChatGPT',
  cpoySuccess:'Copied successfully',
  cpoyFiled:'Copy failure. Try again plz',
  networkErr:'Network error. Try again plz'
  },
  fr:{
    title:'AI Poem Generator',
    description:'Generate a poem about...',
    btnText:'Generate Poem',
    btnThinking:'Thinking',
    copy:'Copy',
    contentTitle:'Generated Poem',
    footer:'Powered By ChatGPT',
    cpoySuccess:'Copied successfully',
    cpoyFiled:'Copy failure. Try again plz',
    networkErr:'Network error. Try again plz'
    },//法语
  ru:{
    title:'AI Poem Generator',
    description:'Generate a poem about...',
    btnText:'Generate Poem',
    btnThinking:'Thinking',
    copy:'Copy',
    contentTitle:'Generated Poem',
    footer:'Powered By ChatGPT',
    cpoySuccess:'Copied successfully',
    cpoyFiled:'Copy failure. Try again plz',
    networkErr:'Network error. Try again plz'
    },//俄语
    de:{
      title:'AI Poem Generator',
      description:'Generate a poem about...',
      btnText:'Generate Poem',
      btnThinking:'Thinking',
      copy:'Copy',
      contentTitle:'Generated Poem',
      footer:'Powered By ChatGPT',
      cpoySuccess:'Copied successfully',
      cpoyFiled:'Copy failure. Try again plz',
      networkErr:'Network error. Try again plz'
      },//德语

      it:{
    title:'AI Poem Generator',
    description:'Generate a poem about...',
    btnText:'Generate Poem',
    btnThinking:'Thinking',
    copy:'Copy',
    contentTitle:'Generated Poem',
    footer:'Powered By ChatGPT',
    cpoySuccess:'Copied successfully',
    cpoyFiled:'Copy failure. Try again plz',
    networkErr:'Network error. Try again plz'
    },//德语

    es:{
    title:'AI Poem Generator',
    description:'Generate a poem about...',
    btnText:'Generate Poem',
    btnThinking:'Thinking',
    copy:'Copy',
    contentTitle:'Generated Poem',
    footer:'Powered By ChatGPT',
    cpoySuccess:'Copied successfully',
    cpoyFiled:'Copy failure. Try again plz',
    networkErr:'Network error. Try again plz'
    },//德语

  pt:{
    title:'AI Poem Generator',
    description:'Generate a poem about...',
    btnText:'Generate Poem',
    btnThinking:'Thinking',
    copy:'Copy',
    contentTitle:'Generated Poem',
    footer:'Powered By ChatGPT',
    cpoySuccess:'Copied successfully',
    cpoyFiled:'Copy failure. Try again plz',
    networkErr:'Network error. Try again plz'
    },//德语
}


const i18n = createI18n({
  locale: 'en', // 默认语言
  messages,
});

export default i18n;