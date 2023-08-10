import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Task from './task'
import Deps from './deps'
import Link from 'next/link';
import clientPromise from "../lib/mongodb";
import {useState} from 'react';
import axios from 'axios';

export async function getServerSideProps() {
  console.log("in server side")
    try {
        const client = await clientPromise;
        const db = client.db("gamemaster");

        const user = await db
            .collection("users")
            .find({})
            .sort({ metacritic: -1 })
            .limit(1)
            .toArray();
            console.log(user)
        const tasks = await db
            .collection("tasks")
            .find({status: "INP"})
            .sort({ metacritic: -1 })
            .toArray();
            console.log(tasks)
        const deps = await db
            .collection("tasks")
            .find({status: "HLD"})
            .sort({ metacritic: -1 })
            .toArray();
            console.log(deps)
        return {
            props: { user: JSON.parse(JSON.stringify(user)), tasks:  JSON.parse(JSON.stringify(tasks)),deps:  JSON.parse(JSON.stringify(deps)),},
        };
    } catch (e) {
        console.error(e);
    }
}



export default function Managetask({user,tasks,deps}) {
  let taskItems = [];
    for (var i = 0; i < tasks.length; i++) {
        taskItems.push(<Task taskInfo={tasks[i]} />);
    }
let depItems = [];
    for (var i = 0; i < deps.length; i++) {
        depItems.push(<Deps depsInfo={deps[i]}/>);
    }
  const [taskName,settaskName] = useState("")
  const handletaskName = (event) => {
    settaskName(event.target.value);
  };

  const [taskExphours,settaskExphours] = useState(0)
  const handletaskExphours = (event) => {
    settaskExphours(event.target.value);
  };
  const [taskDate,settaskDate] = useState()
  const handletaskDate = (event) => {
    settaskDate(event.target.value);
  };
async function addTask(){
 // Replace 'your-api-url' with the actual API endpoint URL
    const apiUrl = 'http://localhost:3000/api/addTask';
    const formData={ 
title: taskName,
Ddate: taskDate,
e_hours: taskExphours
};
     axios.post(apiUrl, formData)
      .then(response => {
        console.log('API Response:', response.data);
        // Handle the API response here
      })
      .catch(error => {
        console.error('API Error:', error);
        // Handle errors here
      });
};
  return (
    <div className={styles.container}>
      <Head>
        <title>Manage Task</title>
        <link rel="icon" href="/border.png" />
      </Head>
      <div className="tasklist">
      <div className="block-titile"> Task List </div>
      
      {taskItems}
      </div>
      
      <div className="backlog">
      <div className="block-titile"> Backlog </div>
      
      {depItems}
      </div>
    
      <div className="add-task">
      <div className="block-titile"> Add Task </div>
      <label> Task: </label>
    <input type="text"  className="name-label" value={taskName} onChange= {handletaskName}/> <br/>
    <label> Expected Hours: </label>
    <input type="number"   value={taskExphours} onChange= {handletaskExphours}/> Hr <br/>
    <label> Deadline: </label><input type="date"  value={taskDate} onChange= {handletaskDate}/><br/>
    <button  className="button1" onClick={addTask}>Add </button>
      
      </div>
      <div className="navigation-bar">
      
      <Link href="/">| Home | </Link>
      <Link href="/dashboard">| DashBoard |</Link>
      <Link href="/managetask">| Manage |</Link> 
      </div>
    
      <style jsx>{`
        


.block-titile{
    position: relative;
    font-weight: 600;
    font-family: "Franklin Gothic Medium";
    color: #a04dff;
    font-size: 20px;
    background-color: yellow;
    width: 100%;
}
.name-label{
  width:90%;
}
.button1 {
  background-color: #A04DFF; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
}
.tasklist{
  position: fixed;
  overflow: hidden;
  height: 620px;
  width:430px;
  border-radius: 5px;
  background-color: #eee;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 3px;
  padding-bottom: 5px;
  top: 10px;
  left: 825px;
  color: #A04DFF;
  overflow-y: auto;   
}
.backlog{
  position: fixed;
  overflow: hidden;
 height: 460px;
 width:800px;
  border-radius: 5px;
  background-color: #eee;
      padding-top: 5px;
    padding-left: 5px;
    padding-right: 3px;
    padding-bottom: 5px;
    top: 10px;
    left: 10px;
    color: #A04DFF;
    overflow-y: auto;
    
}
.add-task{
  position: fixed;
  overflow: hidden;
 height: 140px;
 width:800px;
  border-radius: 5px;
  background-color: #eee;
      padding-top: 5px;
    padding-left: 5px;
    padding-right: 3px;
    padding-bottom: 5px;
    top: 480px;
    left: 10px;
    color: #A04DFF;
    overflow-y: auto;
    
}
.navigation-bar{
  position: fixed;
  top: 630px;
  left: 500px;
  width: 350px;
  height: 22px;
        }
code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
