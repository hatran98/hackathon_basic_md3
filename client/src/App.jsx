import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const baseURL = "http://localhost:3000/api/v1/todo";
  const [taskUnCompleted, setTaskUnCompleted] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState([]);
  const [todo, setTodo] = useState({
    name: "",
    status: 0,
  });
  const getTask = async () => {
    await axios
      .get(`${baseURL}`)
      .then((res) => {
        setTaskCompleted(res.data.todo1);
        setTaskUnCompleted(res.data.todo0);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    setTodo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddTodo = () => {
    if (todo.name) {
      axios.post(`${baseURL}`, todo).then((res) => {
        setTodo({
          name: "",
          status: 0,
        });
        getTask();
      });
    } else {
      alert("K đc để trống");
    }
  };

  const handleDeleteTodo = (id) => {
    axios
      .delete(`${baseURL}/${id}`)
      .then((res) => {
        getTask();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (task) => {
    axios
      .put(`${baseURL}/${task.id}`, task.status)
      .then((res) => {
        getTask();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getTask();
  }, []);
  return (
    <div className="container" style={{ backgroundColor: "#adb3b87a" }}>
      <h3
        style={{
          color: "white",
          backgroundColor: "blue",
          textAlign: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        TODO LIST
      </h3>
      <div className="btn" style={{ marginLeft: "40%" }}>
        <div className="action">
          <div className="action-add">
            <input
              type="text"
              placeholder="Add"
              name="name"
              onChange={handleChange}
              value={todo.name}
            />
          </div>
          <button className="action-icon" onClick={handleAddTodo}>
            <i class="fa-solid fa-plus cursor"></i>
          </button>
        </div>
      </div>

      <div
        className="row"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <div className="col-6">
          <div className="mb-3">
            <h3>Uncompleted Tasks</h3>
          </div>
          {taskUnCompleted.map((taskun, index) => (
            <div
              key={index}
              className="mb-3"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid black",
                backgroundColor: "white",
                padding: "10px",
              }}
            >
              <p style={{ fontSize: "20px", marginTop: "10px" }}>
                {taskun.name}
              </p>
              <div>
                <span
                  style={{ marginRight: "10px" }}
                  onClick={() => handleDeleteTodo(taskun.id)}
                >
                  <i class="fa-solid fa-trash cursor"></i>
                </span>
                <span onClick={() => handleUpdate(taskun)}>
                  <i class="fa-regular fa-circle-check cursor"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="col-6">
          <div className="mb-3">
            <h3>Completed Tasks</h3>
          </div>
          {taskCompleted.map((taskCom, index) => (
            <div
              key={index}
              className="mb-3"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid black",
                backgroundColor: "white",
                padding: "10px",
              }}
            >
              <p style={{ fontSize: "20px", marginTop: "10px" }}>
                {" "}
                {taskCom.name}{" "}
              </p>
              <div>
                <span
                  style={{ marginRight: "10px" }}
                  onClick={() => handleDeleteTodo(taskCom.id)}
                >
                  <i class="fa-solid fa-trash cursor"></i>
                </span>
                <span onClick={() => handleUpdate(taskCom)}>
                  <i class="fa-solid fa-circle-check cursor"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
