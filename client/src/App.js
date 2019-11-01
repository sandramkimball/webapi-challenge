import React, {useState, useEffect} from 'react';
import './App.css';
import Card from './components/Card';
import axios from 'axios';

function App() {
  const [projects, setProjects] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:4000/api/projects/')
    .then(res=>{
      console.log(res.data);
      setProjects(res.data)
    })
  }, [projects.length])

  return (
    <div className="App">
      <section className='Card-Container'>
        <h1>Project List</h1>
        {projects.map(project=> (
          <Card key={project.id} description={project.description} name={project.name}/>
        ))}

      </section>
    </div>
  );
}

export default App;
