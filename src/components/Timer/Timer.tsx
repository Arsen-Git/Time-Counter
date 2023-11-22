'use client'
import {useState, useEffect, useRef} from 'react';

function Timer(){
    const [time, setTime] = useState({minutes: 0, seconds: 0});
    const [timerActive, setTimerActive] = useState(false);
    const intervalRef = useRef(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setTime({...time,[e.target.getAttribute('id')]:e.target.value})
    }

    const clearTimer = ()=>{
        setTimerActive(false);
        clearTimeout(intervalRef.current);
        document.getElementById('btnStart').disabled = false;
    }

    const onStart = (e: React.MouseEvent<HTMLElement>) =>{
        if(time.seconds > 0 || time.minutes > 0){
            setTimerActive(true);
            e.target.disabled = true;
        }
    }

    const onStop = (e: React.MouseEvent<HTMLElement>) =>{
        if(timerActive){
            clearTimer();
        }
    }

    const onReset = (e: React.MouseEvent<HTMLElement>) =>{
        clearTimer();
        setTime({minutes:0,seconds:0})
    }

    const onTick = () =>{
        intervalRef.current = setTimeout(()=>{
            time.seconds > 0 ? setTime(prev=>({...prev, seconds: prev.seconds - 1 })): time.minutes > 0 ? setTime(prev=>({seconds: 59, minutes: prev.minutes - 1})): document.getElementById('btnStart').disabled = false;;
        },1000)
    }

    useEffect(()=>{
        if(timerActive && time.seconds >= 0 && time.minutes >= 0){
            onTick();
        }
    },[time, timerActive])
    return(
        <div className="flex rounded-md bg-white p-2 gap-2 items-center">
            <label htmlFor="minutes">Minutes</label>
            <input onChange={onChange} id='minutes' name="minutes" value={time.minutes} className="border-2 outline-0 rounded-md text-center text-lg focus:border-slate-500 hover:border-slate-500 transition ease-linear" type="number" placeholder="Minutes"/>
            <label htmlFor="seconds">Seconds</label>
            <input onChange={onChange} id='seconds' name="seconds" value={time.seconds} className="border-2 outline-0 rounded-md text-center text-lg focus:border-slate-500 hover:border-slate-500 transition ease-linear" type="number" placeholder="Seconds"/>
            <div className="flex gap-2 ">
                <button id="btnStart" onClick={onStart} className="p-2 border-2 rounded-lg hover:bg-slate-200 disabled:bg-slate-300">Start</button>
                <button id="btnStop" onClick={onStop} className="p-2 border-2 rounded-lg hover:bg-slate-200 disabled:bg-slate-300">Stop</button>
                <button id="btnReset" onClick={onReset} className="p-2 border-2 rounded-lg hover:bg-slate-200 disabled:bg-slate-300">Reset</button>
            </div>
        </div>
    );
}
export {Timer};