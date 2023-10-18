
import { useRef, useState } from "react"

export default function DragNDrop({data}:{
    data:[
        {
            title:string,
            items:[string]
        }
    ]
}) {
    const [list,setList] = useState(data)
    const [dragging,setDragging] = useState(false)
    const dragItem = useRef()
    const dragNode = useRef()
    //@ts-ignore
    const handleDragStart = (e,params) => {
        dragItem.current = params;
        dragNode.current = e.target;
         //@ts-ignore
        dragNode.current.addEventListener('dragend',handleDragEnd)
     setTimeout(() => {
        setDragging(true)
     },0)
    // setDragging(true)

    }
        //@ts-ignore
    const handleDragEnter = (e,params) => {
        console.log("target")
        const currentItem = dragItem.current
        if(e.target !== dragNode.current){
                //@ts-ignore
          setList(oldList => {
                //@ts-ignore
            let newList = JSON.parse(JSON.stringify(oldList));
                //@ts-ignore
            newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI,1)[0])
            dragItem.current = params
            return newList
          })
        }
    }
        //@ts-ignore
    const handleDragEnd = () => {
        console.log("end")
        setDragging(false)
        //@ts-ignore
        dragNode.current.removeEventListener('dragend',handleDragEnd)
                //@ts-ignore
                dragItem.current = null;
                //@ts-ignore
                dragNode.current = null;
    }
     //@ts-ignore
    const getStyles = (params) => {
        const currentItem = dragItem.current
            //@ts-ignore
        if(currentItem?.grpI === params?.grpI && currentItem.itemI === params.itemI){
        console.log("mtav")
        return 'current dnd-item'
        }
        return 'dnd-item'
    }
 return (
    <div className="drag-n-drop">
    {
      list.map((grp,grpI) => (
        <div
         //@ts-ignore
         onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e,{grpI,itemI:0}) : null}
         key={grp.title}
          className="dnd-group"
        >
          <div className="group-title">{grp.title}</div> 
          {
            grp.items.map((item,itemI)=> (
              <div
                 draggable
                 key={item}
                 onDragStart={(e) => {handleDragStart(e,{grpI,itemI})}}
                //@ts-ignore
                 onDragEnter={dragging ? (e) =>  handleDragEnter(e,{grpI,itemI}) : null} 
                 //@ts-ignore
                 className={dragging ? getStyles({grpI,itemI}) : "dnd-item"}
                 >
              <div>
               <p> {item}</p>
              </div>
             </div>
            ))
          }
       </div>
      ))
      }
   </div>
 )
}