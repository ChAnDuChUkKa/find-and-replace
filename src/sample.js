import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function Sample() {
  const [items,setItems]=useState([])
  const arr=Array.from({length:1000},(_,index)=>`Item + ${index}`)
  const [visibleIndex,setVisibleIndex]=useState(20)

  const infiniteScrolling=()=>{
    const newItems=arr.slice(0,visibleIndex)
    setItems(newItems)
  }

  const throttle=(fn,delay=1000)=>{
    let lastExecuted=0;
    return function(...args){
      const now=Date.now()
      if(now-lastExecuted>=delay){
        fn(...args)
        console.log("executed after throttling")
        lastExecuted=now
      }
    }
  }

  const debounce=(fn,delay=1000)=>{
    let timer;
    return (...args)=>{
      clearTimeout(timer);
      timer=setTimeout(()=>fn(...args),delay)
    }
  }

  const handleChange=debounce((event)=>{
    console.log(event.target.value)
  },2000)

  const handleInput=(e)=>{
    handleChange(e)
  }

  useEffect(()=>{
    infiniteScrolling()
    const handleScroll=debounce(()=>{
      if(window.innerHeight+ document.documentElement.scrollTop>=document.documentElement.offsetHeight-50){
        setVisibleIndex(prev=>prev+20)
      }
    })
    window.addEventListener('scroll',handleScroll)
    return ()=>window.removeEventListener('scroll',handleScroll)
  },[visibleIndex])

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <progress max={100} value={50} />
      <input type='text' onChange={(e)=>handleInput(e)} />
      <ol style={{margin:'4px'}}>
        {items.map((item,index)=>{
          return <li style={{margin:'4px'}} key={index}>{item}</li>
        })}
      </ol>
    </div>
  );
}

export default Sample;
