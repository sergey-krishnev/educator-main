import { useRecognizeSpeechMutation } from '@/api/speechApi';
import { useState, useRef, useCallback } from 'react';

const VoiceRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const requestRef = useRef<number | null>(null);

  const [recognizeSpeech, { isLoading, error }] = useRecognizeSpeechMutation();

  const cleanupAudio = useCallback(() => {
    audioContextRef.current?.close();
    audioContextRef.current = null;

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
    cleanupAudio();
  }, [cleanupAudio]);

  const detectSilence = useCallback(
    (analyser: AnalyserNode, onSilence: () => void, timeout: number, thresholdDb = -50) => {
      const dataArray = new Uint8Array(analyser.fftSize);

      const checkSilence = () => {
        analyser.getByteTimeDomainData(dataArray);
        let sumSquares = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const val = dataArray[i] - 128;
          sumSquares += val * val;
        }
        const rms = Math.sqrt(sumSquares / dataArray.length);
        const db = 20 * Math.log10(rms / 128);

        if (db < thresholdDb) {
          if (!silenceTimerRef.current) {
            silenceTimerRef.current = setTimeout(onSilence, timeout);
          }
        } else if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }

        if (recording) {
          requestRef.current = requestAnimationFrame(checkSilence);
        }
      };

      checkSilence();
    },
    [recording]
  );

  const startRecording = async () => {
    if (recording) return;

    setRecognizedText(null);
    cleanupAudio();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        cleanupAudio();

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        audioChunksRef.current = [];

        try {
          const response = await recognizeSpeech(audioBlob).unwrap();
          setRecognizedText(response.text || 'Речь не распознана');
        } catch (err) {
          console.error('Ошибка при распознавании:', err);
          setRecognizedText('Ошибка при распознавании речи');
        }
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setRecording(true);

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      detectSilence(analyser, stopRecording, 5000, -50);
    } catch (err) {
      console.error('Ошибка доступа к микрофону:', err);
    }
  };

  return (
    <div className="p-4 rounded-xl shadow-md bg-white w-full max-w-md mx-auto text-center">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-6 py-3 rounded-full font-semibold transition ${
          recording ? 'bg-red-500' : 'bg-green-500'
        } text-white`}
      >
        {recording ? 'Стоп' : 'Запись'}
      </button>
      {isLoading && <p className="mt-4 text-gray-600">Распознавание...</p>}
      {recognizedText && <p className="mt-4 text-black font-medium">Результат: {recognizedText}</p>}
      {error && <p className="mt-4 text-red-500">Ошибка: не удалось распознать речь</p>}
    </div>
  );
};

export default VoiceRecorder;
