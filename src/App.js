import { Button } from "react-bootstrap";
import { useState } from "react";

const notesList = [
  {
    id: 1,
    title: "title one",
    description: `urious which components explicitly require our JavaScript and Popper? If you’re at all unsure about the general page structure, keep reading for an example page template.Accordions for extending our Collapse plugin
Alerts for dismissing
Buttons for toggling states and checkbox/radio functionality
Carousel for all slide behaviors, controls, and indicators
Collapse for toggling visibility of content
Dropdowns for displaying and positioning (also requires Popper)
Modals for displaying, positioning, and scroll behavior
Navbar for extending our Collapse and Offcanvas plugins to implement responsive behaviors
Navs with the Tab plugin for toggling content panes
Offcanvases for displaying, positioning, and scroll behavior
Scrollspy for scroll behavior and navigation updates
Toasts for displaying and dismissing
Tooltips and popovers for displaying and positioning (also requires Popper)urious which components explicitly require our JavaScript and Popper? If you’re at all unsure about the general page structure, keep reading for an example page template.

Accordions for extending our Collapse plugin
Alerts for dismissing
Buttons for toggling states and checkbox/radio functionality
Carousel for all slide behaviors, controls, and indicators
Collapse for toggling visibility of content
Dropdowns for displaying and positioning (also requires Popper)
Modals for displaying, positioning, and scroll behavior
Navbar for extending our Collapse and Offcanvas plugins to implement responsive behaviors
Navs with the Tab plugin for toggling content panes
Offcanvases for displaying, positioning, and scroll behavior
Scrollspy for scroll behavior and navigation updates
Toasts for displaying and dismissing
Tooltips and popovers for displaying and positioning (also requires Popper)`,
    bgColor: "#ffd3fd",
  },
  {
    id: 2,
    title: "title two",
    description: "test description two",
    bgColor: "#d0fffe",
  },
  {
    id: 3,
    title: "title three",
    description: "test description three",
    bgColor: "#e4ffde",
  },
];

export default function App() {
  const [showAddForm, setShowAddForm] = useState(null);
  const [notes, setNotes] = useState(notesList);
  const [selectedNote, setSelectedNote] = useState(null);
  function openAddForm() {
    setShowAddForm(1);
  }
  function closeAddForm() {
    setShowAddForm(null);
  }
  function handleCloseView()
  {
    setSelectedNote(null);
  }
  function handleDeleteNote()
  {
    setNotes(notes.filter((note) => note.id !== selectedNote.id));
    setSelectedNote(null);
    if(notes.length===1)
    {
      setNotes(null);
    }
  }
 function handleViewNote(note){
console.log("handle view")
console.log(note)

setSelectedNote(note);
 }
  function handleAddNote(newNote) {
    if (!newNote.title || !newNote.description) {
      alert("First Enter Title and Description");
      return;
    }
    console.log(newNote);
    if (!notes) {
      setNotes([newNote]);
    } else setNotes((items) => [...notes, newNote]);
    setShowAddForm(null);
  }
  return (
    <div className="App">
      {!notes && <Welcome />}
      {notes && <NotesList notes={notes} onView={handleViewNote} />}
      <AddNote openForm={openAddForm} />
      {selectedNote&&<ViewNote currentNote={selectedNote} closeView={handleCloseView} handleDeleteNote={handleDeleteNote}/>}
      {showAddForm && (
        <AddForm closeAddForm={closeAddForm} onAdd={handleAddNote} />
      )}
    </div>
  );
}
function ViewNote({currentNote,closeView,handleDeleteNote})
{
return <div className={`viewNote`} style={{backgroundColor:`${currentNote.bgColor}`}}>
  <Button variant="outline-dark" onClick={handleDeleteNote}>Delete🗑️</Button>
  <Button variant="outline-dark" onClick={closeView}>Close❌</Button>
  <h1>{currentNote.title}</h1>
  <p>{currentNote.description}</p>
</div>
}
function NotesList({ notes, onView }) {
  return (
    <div className="notes">
      {notes.map((note) => (
        <div
          key={note.id}
          className="note"
          style={{ backgroundColor: note.bgColor }}
          onClick={()=>onView(note)}
        >
          <h4>{note.title}</h4>
          <p>{note.description}</p>
        </div>
      ))}
    </div>
  );
}
function Welcome() {
  return (
    <>
      <h1 className="msg container mt-5">
        To add note click on the + button on bottom right corner
      </h1>
    </>
  );
}
function AddNote({ openForm }) {
  return (
    <>
      <Button variant="warning" className="addNote fs-1" onClick={openForm}>
        +
      </Button>
    </>
  );
}
function AddForm({ closeAddForm, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bgColor, setBgColor] = useState(`rgb(237, 237, 140)`);
  function getColor(e) {
    e.preventDefault();
    e.target.classList.add("active");
    if (e.target.className.includes("pink")) {
      setBgColor("#ffd3fd");
    } else if (e.target.className.includes("green")) {
      setBgColor("#e4ffde");
    } else if (e.target.className.includes("blue")) {
      setBgColor("#d0fffe");
    } else if (e.target.className.includes("gray")) {
      setBgColor("gray");
    } else {
      setBgColor("white");
    }
  }
  const newOne = {
    id: crypto.randomUUID(),
    title,
    description,
    bgColor,
  };

  return (
    <>
      <div className="addForm">
        <div className="addFormHead">
          <h6>Add New Note</h6>
          <span className="close" onClick={closeAddForm}>
            ❌
          </span>

          <hr></hr>
        </div>
        <form >
          <input
            className="enterTitle"
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <br></br>
          <textarea
            className="enterDesc"
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label>Select a Background Color </label>
          <br/>
          <button
            className="colours pink"
            onClick={(e) => getColor(e)}
          ></button>
          <button
            className="colours green"
            onClick={(e) => getColor(e)}
          ></button>
          <button
            className=" colours blue"
            onClick={(e) => getColor(e)}
          ></button>
          <button
            className=" colours gray"
            onClick={(e) => getColor(e)}
          ></button>
          <br></br>
          <Button
            className="addButton"
            variant="success"
            onClick={() => onAdd(newOne)}
          >
            Add
          </Button>
        </form>
      </div>
    </>
  );
}
