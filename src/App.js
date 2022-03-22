import './App.css'
import { useEffect } from 'react';
import MainLayout from './components/MainLayout';


// const userName = "105"
// const password = "test1105"
// const phoneNumber = "0979955925"
// const socketURL = "wss://sbc03.tel4vn.com:7444"
// const socketURL = "wss://192.168.1.6:3001/"
// const call = (first) => `sip:${first}@2-test1.gcalls.vn:50061`
// const call = (first) => `sip:${first}@192.168.1.6:3001`


export default function App() {
 
  return (
    <section className="App">
      <MainLayout/>
    </section>
  );
}
