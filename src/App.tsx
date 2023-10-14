const initialData = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'TO-DO',
      taskIds: [{ id: 1, content: '111' }, { id: 2, content: '22222' }],
    },
    'column-2': {
      id: 'column-2',
      title: 'IN-PROGRESS',
      taskIds: [{ id: 3, content: '333333' }],
    },
    'column-3': {
      id: 'column-3',
      title: 'COMPLETED',
      taskIds: [{ id: 4, content: '4444444' }, { id: 5, content: '5555' }],
    },
  }
}
function App() {

  return (
    <div className="wrapper">
      <h1>Todo Custom Dragn Drop</h1>
      <div className="wrapper__container">
        {
          Object.values(initialData.columns).map((item) => (
            <div className="column">
              <h3>{item.title}</h3>
              {
                item.taskIds.map((ts) => (
                  <div className="task" draggable={true}>{ts.content}</div>
                ))
              }

            </div>
          ))
        }

      </div>
    </div>
  );
}

export default App;
