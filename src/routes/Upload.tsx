import React, { useState, ChangeEvent } from 'react'
import format from 'date-fns/format'
// import "./Upload.css";

export const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isFilePicked, setIsFilePicked] = useState(false)

  const lastModifiedDate = selectedFile
    ? format(selectedFile.lastModified, 'dd/MM/yyyy hh:mm bb')
    : ''

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    const file = files ? files[0] : null
    if (file) {
      setSelectedFile(file)
      setIsFilePicked(true)
    }
  }

  const handleSubmission = () => {
    if (!selectedFile) {
      return
    }

    const formData = new FormData()
    formData.append('File', selectedFile)

    fetch('http://localhost:8080/rest/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <div className="Dashboard">
      <div>
        <input type="file" name="file" onChange={changeHandler} />
        {isFilePicked && selectedFile ? (
          <div>
            <ul>
              <li>Filename: {selectedFile.name}</li>
              <li>Filetype: {selectedFile.type}</li>
              <li>Size in bytes: {selectedFile.size}</li>
              <li>Last modified date: {lastModifiedDate}</li>
            </ul>
          </div>
        ) : (
          <p>Select an Open Financial Exchange (OFX) file to upload.</p>
        )}
        <div>
          <button disabled={!isFilePicked} onClick={handleSubmission}>
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}
