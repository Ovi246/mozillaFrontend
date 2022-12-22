import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

export const RecordView = () => {
  const initialState = {
    recordingMinutes: 0,
    recordingSeconds: 0,
    initRecording: false,
    mediaStream: null,
    mediaRecorder: null,
    audio: null,
  };

  const [recorderState, setRecorderState] = useState(initialState);

  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { audio } = recorderState;

  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    if (audio)
      setRecordings((prevState) => {
        return [...prevState, { key: uuid(), audio }];
      });
  }, [audio]);

  useEffect(() => {
    const MAX_RECORDER_TIME = 5;
    let recordingInterval = null;

    if (recorderState.initRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState) => {
          if (
            prevState.recordingMinutes === MAX_RECORDER_TIME &&
            prevState.recordingSeconds === 0
          ) {
            clearInterval(recordingInterval);
            return prevState;
          }

          if (
            prevState.recordingSeconds >= 0 &&
            prevState.recordingSeconds < 59
          )
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1,
            };

          if (prevState.recordingSeconds === 59)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0,
            };
        });
      }, 1000);
    else clearInterval(recordingInterval);

    return () => clearInterval(recordingInterval);
  });

  useEffect(() => {
    if (recorderState.mediaStream)
      setRecorderState((prevState) => {
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream),
        };
      });
  }, [recorderState.mediaStream]);

  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks = [];

    if (recorder && recorder.state === "inactive") {
      recorder.start();

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];

        setRecorderState((prevState) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              audio: window.URL.createObjectURL(blob),
            };
          else return initialState;
        });
      };
    }

    return () => {
      if (recorder)
        recorder.stream.getAudioTracks().forEach((track) => track.stop());
    };
  }, [recorderState.mediaRecorder]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      setRecorderState((prevState) => {
        return {
          ...prevState,
          initRecording: true,
          mediaStream: stream,
        };
      });
    } catch (err) {
      console.log(err);
    }
  }

  function saveRecording() {
    if (recorderState.mediaRecorder.state !== "inactive")
      recorderState.mediaRecorder.stop();
  }

  return (
    <>
      <div className="controls-container">
        <div className="recorder-display">
          <div className="recording-time">
            {initRecording && <div className="recording-indicator"></div>}
            <span>{recordingMinutes}</span>
            <span>:</span>
            <span>{recordingSeconds}</span>
          </div>
          {initRecording && (
            <div className="cancel-button-container">
              <button
                className="cancel-button"
                title="Cancel recording"
                onClick={() => setRecorderState(initialState)}
              ></button>
            </div>
          )}
        </div>
        <div className="start-button-container">
          {initRecording ? (
            <button
              className="start-button"
              title="Save recording"
              disabled={recordingSeconds === 0}
              onClick={saveRecording}
            ></button>
          ) : (
            <button
              className="start-button"
              title="Start recording"
              onClick={startRecording}
            ></button>
          )}
        </div>
      </div>
      <div className="recordings-container">
        {recordings && recordings.length > 0 ? (
          <>
            <h1>Your recordings</h1>
            <div className="recordings-list">
              {recordings.map((record) => (
                <div className="record" key={record.key}>
                  <audio controls src={record.audio} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-records">
            <span>You don't have records</span>
          </div>
        )}
      </div>
    </>
  );
};
