import { useState, useEffect, useContext } from "react";
import { RecordingContext } from "../contexts/RecordingsProvider";
import { startRecording, saveRecording } from "./handlers";

const initialState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
  key: null,
};

export default function useRecorder() {
  const [recorderState, setRecorderState] = useState(initialState);
  const { setRecordings } = useContext(RecordingContext);

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

        setRecordings((prevState) => {
          return [...prevState, { audio: window.URL.createObjectURL(blob) }];
        });
      };
    }

    return () => {
      if (recorder)
        recorder.stream.getAudioTracks().forEach((track) => track.stop());
    };
  }, [recorderState.mediaRecorder]);

  function saveRecordingFunc() {
    saveRecording(recorderState.mediaRecorder);
  }

  function startRecordingFunc() {
    startRecording(setRecorderState);
  }

  return {
    recorderState,
    startRecordingFunc,
    cancelRecording: () => setRecorderState(initialState),
    saveRecordingFunc,
  };
}
