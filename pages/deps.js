import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useState} from 'react';
import {sayHello,getCurrentDate} from "../lib/commonTaskFun";
export default function Deps({depsInfo}) {
  if(depsInfo){
  const [taskStatus, settaskStatus] = useState(depsInfo.status); 

  // Event handler to update the task status selection
  const handletaskStatus = (event) => {
    settaskStatus(event.target.value);
  };
  return (
   
    <div className="main-div">
    <label className="task-id"> &nbsp; Task Id: {depsInfo.task_id}</label>
    <label > &nbsp; {depsInfo.title} </label><br/>
    <select className="status" id="task_status" value={taskStatus} onChange={handletaskStatus}>
    <option value="INP">In Progress</option>
    <option value="DN">Done</option>
    <option value="BL">Backlog</option>
    <option value="HLD">Hold</option>
    </select>
    <input type="number" className="h-label" id="hours_worked" value={depsInfo.p_hours} readOnly/> Hr
    <label > &nbsp; Date: {depsInfo.Ddate}</label>
    <label > &nbsp; Blocked By: {depsInfo.Blocked.join('#')} </label>
    <button  className="button1" onClick={sayHello}>Save </button>
     <style jsx>{`
     .main-div{
      position: relative;
  border-radius: 5px;
  background-color: #FFFFFF;
      padding-top: 5px;
    padding-left: 5px;
    padding-right: 3px;
    padding-bottom: 5px;
    border: 1px solid blue

     }
     .button1 {
  background-color: #A04DFF; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  border-radius: 5px;
  margin-left: 10px;
}
.status{
  border: 2px solid blue;
   margin-left: 10px;
}
    .h-label { 
  color: #212121;
  margin-left: 10px;
  width: 70px;
}
.label { 
  color: #212121;
  margin-left: 10px;
}
.task-id{
  color: red;
  background-color: yellow;
}

`}</style>
    </div>

  )
}
}
