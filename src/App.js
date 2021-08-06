import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import About from "./components/About"



function App() {

	const [showAddTask, setShowAddTask] = useState(false)

	const [tasks, setTasks] = useState([ ])	

	useEffect(() =>{ 
		const getTasks = async() => { 
			const taskFromServer = await fetchTasks()
			setTasks(taskFromServer)
		}
		getTasks()
	}, [])

	// Fetch Database tasks
	const fetchTasks = async() => {
		const res = await fetch('http://localhost:5000/tasks')
		const data = await res.json()
		// console.log(data)
		return data
	}

	// Fetch Database single task
	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`)
		const data = await res.json()
		// console.log(data)
		return data
	}

	// Add Task 
	const addTask = async(task) => {
		const res = await fetch('http://localhost:5000/tasks', {
			method: 'POST',
			headers:{ 
				'Content-type': 'application/json',
			},
			body: JSON.stringify(task),
		})

		const data = await res.json()

		setTasks([...tasks, data])	

		//  ui backend block
		// const id = Math.floor(Math.random() * 1000) + 1;
		// // console.log(task, id)
		// const newTask = {
		// 	id: id,
		// 	...task
		// }
		// setTasks([...tasks, newTask])
	}

	// Delete Task 
	const deleteTask = async(id) => {
		// console.log('Delete', id)
		await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
		setTasks(tasks.filter((task) => task.id !== id));
	}

	// Toggle Reminder setAPI
	const toggleReminder = async(id) => {
		// console.log('toggleReminder', id);
		const taskToToggle = await fetchTask(id)
		const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'PUT',
			headers:{
				'Content-type': 'application/json',
			},
			body: JSON.stringify(updateTask),
		})

		const data = await res.json()

		setTasks(tasks.map((task) =>
			task.id === id
				? { ...task, reminder: data.reminder }
				: task
			)
		)
	}

	return (
		<Router>
			<div className="container">
				{/* <Header title='Hello' />  override default props.title */}
				{/* <Header title={'Task Tracker'}/>  using PropTypes expected var type*/}
				<Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
				<Route path='/' exact render={ () =>
					<>
						{showAddTask && <AddTask onAdd={addTask} />}
						{
							tasks.length > 0
								? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
								: 'NO Task'
						}
					</>
				}/>
				<Route path='/about' component={About}/>
				<Footer />
			</div>
		</Router>
	);
}


export default App;
