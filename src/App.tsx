import { useState } from 'react'
import './App.css'

import { useFireproof } from 'use-fireproof';
import { connect } from '@fireproof/netlify';

function App() {
    console.log("app happened");
    const [docID, setDocID] = useState("");
    const [msg, setMsg] = useState("");
    const { database } = useFireproof("fptest")
    database.sthis.env.set("FP_KEYBAG_URL", 'indexdb://fp-keybag?extractKey=_deprecated_internal_api')

    database.subscribe((docs) => {
        const docIds = docs.map(value => value._id).join(",")
        console.log("subscribe sees docs", docIds);
    }, true);


    connect(database/*, document.location.origin*/);

    function createDocument() {
        database.put({'foo':'bar'}).then(value => setDocID(value.id))
    }

    function checkAllDocsCount() {
        database.allDocuments().then(docs => {
            setMsg(`All Docs Length ${docs.rows.length}`);
        })
    }

  return (
    <>
        <h1>Vite + React + Fireproof + Netlify</h1>
        <div className="card">
            <p>
                Created DocID: ${docID}
            </p>
            <p>
                ${msg}
            </p>
        </div>
        <button onClick={createDocument}>
            Create Document
        </button>
        <button onClick={checkAllDocsCount}>
            Check All Docs Count
        </button>
    </>
  )
}

export default App
