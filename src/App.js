import { useState } from 'react'
import Header from "./components/Header"
import Tasks from "./components/Tasks"


function App() {

	const [tasks, setTasks] = useState(
		[
			{
				"id": 1,
				"text": "Doctors Appointment",
				"day": "Feb 5th at 2:30pm",
				"reminder": true
			},
			{
				"id": 2,
				"text": "Meeting at School",
				"day": "Feb 6th at 1:30pm",
				"reminder": true
			}
		]
	)

	// Delete Task
	const deleteTask = (id) => {
		// console.log('Delete', id)
		setTasks(tasks.filter((task) => task.id !== id));
	}

	// Toggle Reminder
	const toggleReminder = (id) => {
		// console.log('toggleReminder', id);
		setTasks(tasks.map((task) => 
				task.id === id
				? {...task, reminder: !task.reminder }
				: task
			)
		)
	}

	return (
		<div className="container">
			{/* <Header title='Hello' />  override default props.title */}
			{/* <Header title={'Task Tracker'}/>  using PropTypes expected var type*/}
			<Header />
			{
				tasks.length > 0
					? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
					: 'NO Task'
			}
		</div>
	);
}


export default App;
