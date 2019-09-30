/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const chat_appid = process.env.Comet_Chat_App_ID
const chat_auth = process.env.Comet_Chat_Auth_Key
const chat_id = '' // Intentionally left blank
const chat_name = '' // Intentionally left blank
const chat_avatar = '' // Intentionally left blank
const chat_link = '' // Intentionally left blank


const css = document.createElement('link')
css.rel = 'stylesheet'
css.type = 'text/css'
css.href = 'https://fast.cometondemand.net/' + chat_appid + 'x_xchat.css'
document.getElementsByTagName('head')[0].appendChild(css)
const js = document.createElement('script')
js.type = 'text/javascript'
js.src = 'https://fast.cometondemand.net/' + chat_appid + 'x_xchat.js'
const s = document.getElementsByTagName('script')[0]
s.parentNode.insertBefore(js, s)

