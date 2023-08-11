import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Task from './task'
import Deps from './deps'
import { ProgressBar } from "react-milestone";
import Link from 'next/link';
import clientPromise from "../lib/mongodb";

export async function getServerSideProps() {
  console.log("in server side");
    try {
        const client = await clientPromise;
        if(client){
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
            props: { msg:"Success",user: JSON.parse(JSON.stringify(user)), tasks:  JSON.parse(JSON.stringify(tasks)),deps:  JSON.parse(JSON.stringify(deps)),},
        };
        }
        else{
          return{
            props: {msg:"no data fetched"}
          };
        }
        
    } catch (e) {
        console.error(e);
    }
}



export default function DashBoard({msg,user,tasks,deps}) {
  console.log(msg);
  let taskItems = [];
  if (tasks){
    for (var i = 0; i < tasks.length; i++) {
        taskItems.push( <Task taskInfo={tasks[i]} />);
    }
  }
  let depItems = [];
  if(deps){
    for (var i = 0; i < deps.length; i++) {
        depItems.push(<Deps depsInfo={deps[i]}/>);
    }
  }

    
  const rewardBar = {
  height: "100%",
  width: (Number(user[0].treats_p)/Number(user[0].treats_bar))*100 + "%", // Replace "reward_bar" with the actual value for width
  backgroundColor: "green"
};
const expBar = {
  height: "100%",
  width: (Number(user[0].work_hours)/Number(user[0].bar_hours))*100 + "%", // Replace "reward_bar" with the actual value for width
  backgroundColor: "#A04DFF"
};

  return (
    <div className={styles.container}>
      <Head>
        <title>DashBoard</title>
        <link rel="icon" href="/border.png" />
      </Head>
      <div className="level"> {user[0].exp} </div>
         <div className="progressbar">
        <div style={expBar}></div>
        <span className="progressPercent">{user[0].work_hours}/{user[0].bar_hours}</span>
      </div>
      <div className="tasklist">
      <div className="block-titile"> Task List </div>
      
      {taskItems}
      </div>

      <div className="deplist">
      <div className="block-titile"> Dependency List </div>
      
      {depItems}
      </div>
  
      <div className="rewards">
       <div className="reward-bar">
        <div style={rewardBar}></div>
        <span className="progressPercent2">{user[0].treats_p}/{user[0].treats_bar}</span>
      </div>
      </div>
      
      <table className="user-table">
  <tbody>
    <tr>
      <td className="treats-tittle">Treats Earned</td>
      <td className="ttotal-tittle">Total Hours</td>
    </tr>
    <tr>
      <td className="treats-value">{user[0].treats}</td>
      <td className="ttotal-value">{user[0].total_hours}</td>
    </tr>
  </tbody>
</table>
 

      
      
      <div className="navigation-bar">
      
      <Link href="/">| Home | </Link>
      <Link href="/dashboard">| DashBoard |</Link>
      <Link href="/managetask">| Manage |</Link> 
      </div>
    
      <style jsx>{`
        
.progressbar{
  position: fixed;
  overflow: hidden;
  width: 350px;
  height: 35px;
  border-radius: 5px;
  background-color: #eee;
  top: 10px;
  left: 60px;
  border: 2px solid black;
}
.reward-bar{
  position: fixed;
  overflow: hidden;
  width: 350px;
  height: 30px;
  border-radius: 5px;
  background-color: #eee;
  top: 380px;
  left: 37px;
  border: 2px solid black;
}
.block-titile{
    position: relative;
    font-weight: 600;
    font-family: "Franklin Gothic Medium";
    color: #a04dff;
    font-size: 20px;
    background-color: yellow;
    width: 100%;
}



/* Basic table styling */
.user-table {
  border-collapse: collapse;
  width: 25%;
height:10%;
    left: 40px;
    top: 462px;
    position: fixed;
}

.user-table td {
  border: 1px solid black;
  padding: 1px;
  text-align: center;
  font-weight: 600;
    font-family: "Franklin Gothic Medium";
    
}

/* Custom styling for table header cells */
.user-table .treats-tittle,
.user-table .ttotal-tittle {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #a04dff;
}

/* Custom styling for table data cells */
.user-table .treats-value,
.user-table .ttotal-value {
  background-color: #ffffff;
  color: red;
}


.level{
  font-weight: 600;
  font-family:'Franklin Gothic Medium';
  position: fixed;
  overflow: hidden;
  height: 40px;
  border-radius: 5px;
  background-color: #eee;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 3px;
  padding-bottom: 5px;
  top: 10px;
  left: 10px;
  color: #A04DFF
}
.tasklist{
  position: fixed;
  overflow: hidden;
  height: 620px;
  width:800px;
  border-radius: 5px;
  background-color: #eee;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 3px;
  padding-bottom: 5px;
  top: 10px;
  left: 450px;
  color: #A04DFF;
  overflow-y: auto;   
}
.deplist{
  position: fixed;
  overflow: hidden;
 height: 272px;
 width:400px;
  border-radius: 5px;
  background-color: #eee;
      padding-top: 5px;
    padding-left: 5px;
    padding-right: 3px;
    padding-bottom: 5px;
    top: 60px;
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
.rewards{
  position: fixed;
  overflow: hidden;
 height: 272px;
 width:400px;
  border-radius: 5px;
  background-color: #eee;
      padding-top: 5px;
    padding-left: 5px;
    padding-right: 3px;
    padding-bottom: 5px;
    top: 350px;
    left: 10px;
    color: #A04DFF;
    
}
.progressPercent{
  font-weight: 600;
  font-family:'Franklin Gothic Medium';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  color: #eee;
  text-shadow: -1px 0 #555, 0 1px #555, 1px 0 #555, 0 -1px #555;
}
.progressPercent2{
  font-weight: 600;
  font-family:'Franklin Gothic Medium';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  color: #eee;
  text-shadow: -1px 0 #555, 0 1px #555, 1px 0 #555, 0 -1px #555;
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
