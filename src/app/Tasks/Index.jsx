import React, { useState, useEffect } from "react";
import axios from "axios";
import { TaskRows } from "./TaskRows.jsx";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../Redux/Actions";

const Index = () => {
  const lowPriority = useSelector((store) => store.low);
  const highPriority = useSelector((store) => store.high);
  const doneTask = useSelector((store) => store.done);
  const undoneTask = useSelector((store) => store.undone);
  const dispatch = useDispatch();

  //***************************//
  //Initials//
  const initialState = {
    id: "",
    title: "",
    description: "",
    priority: false,
    tasks: [],
  };
  //***************************//

  //***************************//
  //States//
  const [state, setState] = useState(initialState);
  const [btnStatus, setBtnStatus] = useState("Save");
  const [btnCancel, setBtnCancel] = useState(false);
  //***************************//

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const getSize = () => {
      dispatch(actions.taskStatus(state.tasks));
    };
    getSize();
  }, [state.tasks]);

  //***************************//
  //Request//
  const fetchTasks = async () => {
    return await axios("/api/tasks/").then((data) => {
      setState({
        ...initialState,
        tasks: data.data,
      });
      setBtnStatus("Save");
    });
  };

  const deleteTask = (id, title, description) => {
    swal({
      title: `Delete task?`,
      text: `Title: ${title} - Description: ${description}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (remove) => {
      if (remove)
        return await axios({
          method: "DELETE",
          url: `/api/tasks/${id}`,
        }).then(() => {
          setState({
            ...initialState,
            tasks: state.tasks.filter((task) => task._id !== id),
          });
          setBtnCancel(false);
          setBtnStatus("Save");
          M.toast({ html: "Deleted!", classes: "rounded red lighten-1" });
        });
    });
  };

  const addTask = async () => {
    await axios({
      method: "POST",
      url: "/api/tasks",
      data: {
        title: state.title,
        description: state.description,
        priority: state.priority,
      },
    })
      .then((data) => {
        setState({
          ...initialState,
          tasks: [
            ...state.tasks,
            {
              _id: data.data._id,
              title: state.title,
              description: state.description,
              priority: state.priority,
            },
          ],
        });
        M.toast({ html: "Saved!", classes: "rounded green lighten-1" });
      })
      .catch((err) => {
        M.toast({ html: err, classes: "rounded red lighten-1" });
      });
  };

  const editTask = async (id) => {
    await axios({
      method: "PUT",
      url: `/api/tasks/${id}`,
      data: {
        title: state.title,
        description: state.description,
        priority: state.priority,
      },
    }).then(() => {
      setState({
        ...initialState,
        tasks: state.tasks.map((task) =>
          task._id === id
            ? {
                ...task,
                title: state.title,
                description: state.description,
                priority: state.priority,
              }
            : task
        ),
      });
      setBtnStatus("Save");
      setBtnCancel(false);
      M.toast({ html: "Updated!", classes: "rounded blue lighten-1" });
    });
  };
  //***************************//

  //***************************//
  //Handlers//
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    let data = value;
    if (name === "priority") data = checked;

    setState({
      ...state,
      [name]: data,
    });
  };

  const handleDone = async (id, done) => {
    await axios({
      method: "PUT",
      url: `/api/tasks/${id}`,
      data: {
        done: !done,
      },
    }).then(() => {
      setState({
        ...initialState,
        tasks: state.tasks.map((task) =>
          task._id === id
            ? {
                ...task,
                done: !done,
              }
            : task
        ),
      });
      setBtnStatus("Save");
      setBtnCancel(false);
      if (!done) return M.toast({ html: "Set as done!", classes: "rounded blue lighten-1" });
      M.toast({ html: "Set as undone!", classes: "rounded red lighten-1" });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (btnStatus === "Save") return addTask();
    return editTask(state.id);
  };

  const handleUpdate = (title, description, id, priority) => {
    setState({
      ...state,
      id,
      title,
      description,
      priority,
    });
    setBtnStatus("Update");
    setBtnCancel(true);
  };

  const handleCancel = () => {
    setBtnCancel(false);
    setState({ ...state, id: "", title: "", description: "", priority: "" });
    setBtnStatus("Save");
  };
  //***************************//

  return (
    <div>
      <div className="container" style={{ marginTop: "50px" }}>
        <div className="row">
          <div className="col s5">
            <div className="card" style={{ borderRadius: "25px" }}>
              <div
                className="card-title"
                style={{
                  padding: "20px",
                  borderRadius: "25px 25px 0 0",
                  backgroundColor: "#48566B",
                }}
              />

              <div className="card-content">
                <h4>Status</h4>
                <ul>
                  <li>
                    <h6 className="">Low priority: {lowPriority}</h6>
                  </li>
                  <li>
                    <h6 className="">High priority: {highPriority}</h6>
                  </li>
                  <li>
                    <h6 className="">Done: {doneTask}</h6>
                  </li>
                  <li>
                    <h6 className="">Undone: {undoneTask}</h6>
                  </li>
                  <li>
                    <h5>
                      <b>Total tasks: {lowPriority + highPriority}</b>
                    </h5>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col s7">
            <div className="card" style={{ borderRadius: "25px" }}>
              <div
                className="card-title "
                style={{
                  padding: "20px",
                  borderRadius: "25px 25px 0 0",
                  backgroundColor: "#48566B",
                }}
              />
              <div className="card-content">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <label htmlFor="title">Title</label>
                      <input
                        required
                        className="validate"
                        id="title"
                        name="title"
                        onChange={handleChange}
                        type="text"
                        placeholder="Title"
                        value={state.title}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <label htmlFor="description">Description</label>
                      <textarea
                        required
                        id="description"
                        name="description"
                        onChange={handleChange}
                        className="materialize-textarea validate"
                        type="text"
                        placeholder="Description"
                        value={state.description}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="switch col s12">
                      <label htmlFor="priority" style={{ paddingRight: "10px" }}>
                        Priority
                      </label>
                      <label>
                        <span className="green-text">Low</span>
                        <input
                          type="checkbox"
                          id="priority"
                          name="priority"
                          checked={state.priority}
                          onChange={handleChange}
                        />
                        <span className="lever"></span>
                        <span className="red-text">High</span>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-large"
                    style={
                      btnStatus === "Save"
                        ? { backgroundColor: "#4472B8", width: "50%" }
                        : { backgroundColor: "#5792EB", width: "50%" }
                    }
                  >
                    {btnStatus === "Save" ? (
                      <span>
                        Save <i className="material-icons right">save</i>
                      </span>
                    ) : (
                      <span>
                        Update <i className="material-icons right">sync</i>
                      </span>
                    )}
                  </button>
                  {btnCancel ? (
                    <button
                      className="btn red lighten-1 btn-large"
                      onClick={() => handleCancel()}
                      style={{ width: "50%" }}
                    >
                      <span>Cancel</span> <i className="material-icons right">cancel</i>
                    </button>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <table className="highlight">
              <thead className="grey lighten-1">
                <tr>
                  <th className="center-align" style={{ width: "25%" }}>
                    Title
                  </th>
                  <th className="center-align" style={{ width: "55%" }}>
                    Description
                  </th>
                  <th className="center-align" style={{ width: "15%" }}>
                    Priority
                  </th>
                  <th
                    className="center-align"
                    style={{ backgroundColor: "#5792EB", width: "5%" }}
                  ></th>
                  <th
                    className="center-align"
                    style={{ backgroundColor: "#5792EB", width: "5%" }}
                  ></th>
                  <th
                    className="center-align"
                    style={{ backgroundColor: "#5792EB", width: "5%" }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                <TaskRows
                  edit={handleUpdate}
                  delete={deleteTask}
                  tasks={state.tasks}
                  done={handleDone}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
