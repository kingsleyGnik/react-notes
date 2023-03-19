import React, { useState, useEffect } from 'react'
import Note from '../note/Note';
import axios from 'axios';

export default function Archive() {
    const [archiveNotes, setArchive] = useState([])

    useEffect(() => {
        // var userdata = JSON.parse(localStorage.getItem("user"))
        // user = userdata;
        getAllNotes()
    }, [])


    function daysSince(previousDate) {
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
        const currentDate = new Date();
        const prevTimestamp = new Date(previousDate).getTime();
        const currentTimestamp = currentDate.getTime();
        const diffDays = Math.round(Math.abs(currentTimestamp - prevTimestamp) / oneDay);
        return diffDays;
    }
    const getAllNotes = async () => {
        var userdata = JSON.parse(localStorage.getItem("user"))
        await axios.get("http://localhost:3000/notes/allnotes").then(res => {
            console.log(res.data, "response data")
            var userNotes = res.data.filter((note, i) => { return note.username === userdata.username })

            // --- archive notes

            var archiveNotess = userNotes.filter((note, i) => {
                return note.archive === true
            })
            setArchive(archiveNotess)

        })
    }


    const handleArchive = async (singleNote) => {
        var temp = { ...singleNote }
        temp = { ...temp, archive: false }
        var { noteId, ...other } = temp
        //other.archive = true
        console.log("singleNote", noteId, other, temp)
        await axios.put("http://localhost:3000/notes/" + noteId, other).then(res => {
            getAllNotes()
        })
    }
    return (
        <div>
            <div className="notes" style={{ justifyContent: 'space-around' }}>
                {archiveNotes.map((note, i) => (

                    <div key={i}>
                        <div className="note" style={{ backgroundColor: note.color }}>

                            <div className="noteInfo" >

                                {/* {note.pin === false &&
          <i className="fa-regular fa-bookmark pinIcon" onClick={() => { handlePinNotes(note) }}></i>
        }
        {note.pin === true &&
          <i className="fa-solid fa-thumbtack pinIcon" onClick={() => { handlePinNotes(note) }}></i>
        }  */}
                                <i class="fa-solid fa-box-archive pinIcon" onClick={() => { handleArchive(note) }} ></i>

                                <span className="noteTitle" >
                                    <a to="/note/abc" className="nav-link">
                                        {note.title}
                                    </a>
                                </span>
                                <span className="noteDate">Last edited at: {daysSince(note.date)} days ago</span>
                                <p className="noteDesc">
                                    {note.desc}
                                </p>
                            </div>
                            <div>

                                {/* <Link className="link" to={`/write/${singleNote.noteId}`}>
        </Link> */}
                                {/* <i className=" far fa-edit" ></i>
        <i className=" far fa-trash-alt" > </i> */}

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
