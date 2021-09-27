import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useFetch from './hooks/useFetch';

function App() {
  const [tasks, setTasks] = useState([]);

  

  // const { isLoading, error, sendRequests: fetchTasks } = useFetch(useMemo(() => ({ url: 'https://task-adder-bc3cc-default-rtdb.firebaseio.com/tasks.json' }), []),dataHandler);
  const { isLoading, error, sendRequests: fetchTasks } = useFetch();

  useEffect(() => {
    const dataHandler = (data) => {
      const loadedTasks = [];
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
      setTasks(loadedTasks);
    }
    
    fetchTasks({ url: 'https://task-adder-bc3cc-default-rtdb.firebaseio.com/tasks.json' },dataHandler);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
