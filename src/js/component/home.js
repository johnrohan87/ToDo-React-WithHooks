import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [tasks, setTask] = useState([{ label: "run", done: true }]);

	useEffect(
		() =>
			// here i fetch my todos from the API
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/alesanchezr"
			)
				.then(r => r.json())
				.then(data => setTask(data)), //here it re-set the variable tasks with the incoming data
		[]
	);
	const deleteEntry = label => {
		setTask(tasks.filter(t => t.label != label));
	};

	return (
		<>
			<div className="text-center mt-5">
				<input
					placeholder="add a todo here"
					onKeyUp={e =>
						e.keyCode === 13 &&
						setTask(
							tasks.concat({ label: e.target.value, done: false })
						)
					}
				/>
			</div>
			<div>
				{tasks === null
					? "Loading..."
					: tasks.map((t, i) => (
							<li
								className={t.done ? "done" : "not-done"}
								key={i}>
								{t.label}
								<span
									type="button"
									className="btn btn-success"
									onClick={() => deleteEntry(t.label)}>
									X
								</span>
							</li>
					  ))}
			</div>
		</>
	);
}
