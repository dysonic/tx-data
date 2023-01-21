import React, { useState, ChangeEvent } from 'react'
import format from 'date-fns/format'
// import "./Upload.css";

const { REACT_APP_TX_DATA_API: api } = process.env

export const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isBusy, setIsBusy] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const lastModifiedDate = selectedFile
    ? format(selectedFile.lastModified, 'dd/MM/yyyy hh:mm bb')
    : ''

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    const file = files ? files[0] : null
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmission = () => {
    if (!selectedFile) {
      return
    }

    setSuccessMessage(null)
    setErrorMessage(null)

    const formData = new FormData()
    formData.append('file', selectedFile)

    setIsBusy(true)
    fetch(`${api}/uploadFile`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setSuccessMessage(`File '${result.filesUploaded[0]} uploaded.`)
      })
      .catch((error) => {
        setErrorMessage(error.message)
      })
      .finally(() => {
        setIsBusy(false)
      })
  }
  const isUploadButtonDisabled = !selectedFile || isBusy
  const showFileInfo = selectedFile && !successMessage

  return (
    <div className="Upload">
      <h1>
        Upload <small>Upload banking transactions</small>
      </h1>
      {successMessage && (
        <div className="error-message">
          <p>{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      <form>
        <fieldset>
          <legend>File upload</legend>
          <p>Select an Open Financial Exchange (OFX) file to upload:</p>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <label htmlFor="file">File</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={changeHandler}
              />
              {showFileInfo && (
                <div className="input-group">
                  <label htmlFor="filesize">Size</label>
                  <input
                    type="text"
                    id="size"
                    readOnly={true}
                    value={selectedFile.size}
                  />
                  <label htmlFor="last-modified">Last modified</label>
                  <input
                    type="text"
                    id="last-modified"
                    readOnly={true}
                    value={lastModifiedDate}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <button
                className="primary"
                disabled={isUploadButtonDisabled}
                onClick={handleSubmission}
              >
                Upload
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
