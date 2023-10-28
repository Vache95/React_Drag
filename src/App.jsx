import DragNDrop from "./components/DragNDrop";

const data = [
  { title: 'ToDo', items: ['1', '2', '3'] },
  { title: 'Progress', items: ['4', '5'] },
  { title: 'Done', items: ['6', '7'] }
]

const App = () => (
  <div className="App">
    <header className="App-header">
      <DragNDrop data={data} />
    </header>
  </div >
);


export default App;
