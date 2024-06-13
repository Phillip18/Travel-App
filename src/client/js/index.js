const { listener } = require('./listener')
import { style } from '../styles/style.scss'

console.log('secure context? ' + window.isSecureContext)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('/service-worker.js')
        .then(serviceWorker => { console.log('Service worker registered.') })
        .catch(error => { console.log(`Error registering service worker: ${error}`) })
})}

document.getElementById('button').addEventListener('click', listener)
