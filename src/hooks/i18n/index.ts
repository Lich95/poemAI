
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
    title:'frAI Poem Generator',
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
    title:'ruAI Poem Generator',
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
      title:'deAI Poem Generator',
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

      ita:{
    title:'itaAI Poem Generator',
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

    ep:{
    title:'epAI Poem Generator',
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
    title:'ptAI Poem Generator',
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