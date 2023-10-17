import { useState } from "react"
import { brotliDecompress } from "zlib"

// const initialData = {
//   columns: {
//     'column-1': {
//       id: 'column-1',
//       title: 'TO-DO',
//       taskIds: [{ id: 1, content: '111' }, { id: 2, content: '22222' }],
//     },
//     'column-2': {
//       id: 'column-2',
//       title: 'IN-PROGRESS',
//       taskIds: [{ id: 3, content: '333333' }],
//     },
//     'column-3': {
//       id: 'column-3',
//       title: 'COMPLETED',
//       taskIds: [{ id: 4, content: '4444444' }, { id: 5, content: '5555' }],
//     },
//   }
// }

function App() {
  const [boards, setBoards] = useState([
    { id: 1, title: "ToDo", items: [{ id: 1, title: "test1" }, { id: 2, title: "test2" }] },
    { id: 2, title: "Progress", items: [{ id: 3, title: "test3" }, { id: 4, title: "test4" }] },
    { id: 3, title: "Done", items: [] }
  ])
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [drag, setDrag] = useState(null)
  //@ts-ignore
  const over = (e) => {
    e.preventDefault()
    if (e.target.className === "task") {
      // e.target.style.boxShadow = '0 2px 3px gray'
    }
  }
  //@ts-ignore

  const enter = (board) => {
    //@ts-ignore

    setDrag(board)
  }
  //@ts-ignore

  const leave = (e) => {
    // e.target.style.boxShadow = 'none'
  }
  //@ts-ignore

  const start = (e, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)
    // console.log(e.dataTransfer.setData("ss", "1"), "start");

  }
  //@ts-ignore

  const end = (e) => {
    // e.target.style.boxShadow = 'none'
    // console.log(e.dataTransfer.getData("ss"), "enf");
    setDrag(null)
  }
  //@ts-ignore

  const drop = (e, board, item) => {
    e.preventDefault()
    e.stopPropagation()
    //@ts-ignore

    const currentIndex = currentBoard?.items?.indexOf(currentItem)
    //@ts-ignore
    currentBoard?.items?.splice(currentIndex, 1)
    const dropIndex = board?.items?.indexOf(item)
    board?.items?.splice(dropIndex + 1, 0, currentItem)
    //@ts-ignore
    setBoards(boards.map((b) => {
      //@ts-ignore
      if (b.id === board.id) {
        //@ts-ignore
        return board
      }
      //@ts-ignore
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      //@ts-ignore
      return b
    }))
  }
  //@ts-ignore
  const handdrop = (e, board) => {
    board.items.push(currentItem)
    e.preventDefault()
    e.stopPropagation()
    //@ts-ignore
    const currentIndex = currentBoard?.items?.indexOf(currentItem)
    //@ts-ignore
    currentBoard?.items?.splice(currentIndex, 1)
    //@ts-ignore
    setBoards(boards.map((b) => {
      //@ts-ignore
      if (b.id === board.id) {
        //@ts-ignore
        return board
      }
      //@ts-ignore
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      //@ts-ignore
      return b
    }))
  }

  return (
    <div className="wrapper">
      <h1>Todo Custom Drag Drop</h1>
      <div className="wrapper__container">
        {
          boards.map((board) => (
            <div
              //@ts-ignore
              className={`column ${board?.id === drag?.id && "columndrag"}`}
              onDragOver={over}
              onDrop={(e) => handdrop(e, board)}
              onDragEnter={() => enter(board)}
            >
              <div className="column__title"><h3>{board.title}</h3></div>
              <div className="column__container">
                {
                  board.items.map((item) => (
                    <div
                      className={`task ${currentItem === item && "taskdrag"}`}
                      draggable
                      onDragLeave={leave}
                      onDragEnd={end}
                      onDragOver={(e) => over(e)}
                      onDrop={(e) => drop(e, board, item)}
                      onDragStart={(e) => start(e, board, item)}
                    > {item.title}</div>
                  ))
                }
              </div>

            </div>
          ))
        }

      </div>
    </div >
  );
}

export default App;
