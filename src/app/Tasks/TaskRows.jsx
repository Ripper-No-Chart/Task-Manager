import React from "react";

export const TaskRows = (props) => {
  return props.tasks.map((task) => {
    return (
      <tr key={task._id} style={task.done ? { backgroundColor: "#9FBFEE" } : null}>
        <td className="center-align">{task.title}</td>
        <td className="center-align">{task.description}</td>
        <td className={task.priority ? "center-align" : "center-align"}>
          {task.priority ? <b>High</b> : "Low"}
        </td>
        <td className="center-align">
          <button className="btn" onClick={() => props.done(task._id, task.done)}>
            {!task.done ? (
              <i className="material-icons">done</i>
            ) : (
              <i className="material-icons">undo</i>
            )}
          </button>
        </td>
        <td className="center-align">
          <button
            className="btn orange"
            onClick={() => props.edit(task.title, task.description, task._id, task.priority)}
          >
            <i className="material-icons">edit</i>
          </button>
        </td>
        <td className="center-align">
          <button
            className="btn red lighten-1"
            onClick={() => props.delete(task._id, task.title, task.description)}
          >
            <i className="material-icons">delete</i>
          </button>
        </td>
      </tr>
    );
  });
};
