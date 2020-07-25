const initialState = {
  low: 0,
  high: 0,
  done: 0,
  undone: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "TASK_STATUS":
      const low = action.payload.filter((task) => task.priority === false);
      const high = action.payload.filter((task) => task.priority === true);
      const done = action.payload.filter((task) => task.done === true);
      const undone = action.payload.filter((task) => task.done === false);

      return {
        low: low.length,
        high: high.length,
        done: done.length,
        undone: undone.length,
      };

    default:
      return state;
  }
};
