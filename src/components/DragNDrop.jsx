import { useRef, useState } from "react"

const DragNDrop = ({ data }) => {

    const [list, setList] = useState(data)
    const [dragging, setDragging] = useState(false)
    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (event, params) => {
        dragItem.current = params;
        dragNode.current = event?.target;
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(() => {
            setDragging(true)
        }, 0)
    }
    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current
        if (e.target !== dragNode.current) {
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0])
                dragItem.current = params
                return newList
            })
        }
    }
    const handleDragEnd = () => {
        setDragging(false)
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragItem.current = null;
        dragNode.current = null;
    }
    const getStyles = (params) => {
        const currentItem = dragItem.current
        if (currentItem?.grpI === params?.grpI && currentItem.itemI === params.itemI) {
            return 'current dnd-item'
        }
        return 'dnd-item'
    }
    return (
        <div className="drag-n-drop">
            {
                list?.map((grp, grpI) => (
                    <div
                        onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, { grpI, itemI: 0 }) : null}
                        key={grp.title}
                        className="dnd-group"
                    >
                        <div className="group-title">{grp.title}</div>
                        {
                            grp.items.map((item, itemI) => (
                                <div
                                    draggable
                                    key={itemI}
                                    onDragStart={(e) => { handleDragStart(e, { grpI, itemI }) }}
                                    onDragEnter={dragging ? (e) => handleDragEnter(e, { grpI, itemI }) : null}
                                    onDragOver={e => e.preventDefault()}
                                    onDrop={e => e.preventDefault()}
                                    className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
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

export default DragNDrop