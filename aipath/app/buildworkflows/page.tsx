'use client'
import React, { useRef, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from '@/components/Header';
import clsx from 'clsx';
import { MdEmail, MdEvent, MdFileUpload } from 'react-icons/md';
import axios from 'axios'; // Add this import statement

interface WorkflowData {
    name: string;
    description: string;
    trigger: string;
    video_filename: string;
}





const ScreenRecorder = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // State to hold the uploaded file
  const [isRecording, setIsRecording] = useState(false);
  const recordedData = useRef<Blob[]>([]);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const screenRecordingStream = useRef<MediaStream | null>(null);
  const [isRecordingComplete, setIsRecordingComplete] = useState(false);
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [workflowPath, setWorkflowPath] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null); // State to track selected file

  const requestPermissionFromUserToAccessScreen = async () => {
    try {
      const stream: MediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: {
          noiseSuppression: true,
        },
      });
      screenRecordingStream.current = stream;
      return stream;
    } catch (error) {
      console.error("Error accessing display media: ", error);
    }
  };




interface WorkflowData {
  name: string;
  description: string;
  trigger: string;
  video_filename: string;
}


  const sendWorkflowData = async (workflowData: WorkflowData) => {
    const url = 'https://53db-4-39-199-2.ngrok-free.app/create_new_workflow';

    try {
      const workflowData: WorkflowData = {
        name: "Test Workflow",
        description: "This is a test.",
        trigger: "manual",
        video_filename: "recording.webm" // Use the full path
    };
    
        const response = await axios.post(url, workflowData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Workflow data sent successfully:', response.data);
    } catch (error) {
        console.error('An error occurred while sending workflow data:', error);
    }
};


  const startRecording = async () => {
    //const stream = await requestPermissionFromUserToAccessScreen();

    const screenStream = await requestPermissionFromUserToAccessScreen();
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const stream = new MediaStream([
      ...screenStream.getTracks(),
      ...audioStream.getTracks(),
    ]);


    if (stream) {
      recordedData.current = [];
      recorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
      recorderRef.current.addEventListener("dataavailable", collectVideoData);
      recorderRef.current.addEventListener("stop", () => {
        setIsRecording(false);
        setIsRecordingComplete(true);
      });
      recorderRef.current.addEventListener("start", () => setIsRecording(true));
      recorderRef.current.start(100);
    }
  };

  const collectVideoData = (ev: BlobEvent) => {
    recordedData.current.push(ev.data);
  };

  const stopRecording = () => {
    if (recorderRef.current) {
        recorderRef.current.stop();
        screenRecordingStream.current?.getTracks().forEach((track) => track.stop());

        // Set the workflowPath to the path where the recording is saved
        setWorkflowPath('path/to/saved/recording.webm'); // Update this with the actual path
    }
  };

  const rerecord = () => {
    stopRecording();
    startRecording();
  };

  const uploadRecording = async () => {
    const videoBlob = new Blob(recordedData.current, {
      type: 'video/webm',
    });
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3005/api/save-recording?fileName=' + encodeURIComponent(workflowName || 'recording.webm'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: videoBlob,
        mode: 'no-cors'
      });
      if (response.ok) {
        console.log('Recording saved successfully');
      } else {
        console.error('Failed to save recording');
      }
    } catch (error) {
      console.error('Error uploading recording:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderVideo = () => {
    const videoBlob = new Blob(recordedData.current, {
      type: 'video/webm',
    });
    const videoURL = window.URL.createObjectURL(videoBlob);
    return (
      <div className="mt-8">
        <video controls src={videoURL} className="w-full rounded-md shadow-md"></video>
        <Button 
          className='mt-4 px-6 py-3 text-lg rounded-md font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all ease-in-out'
          onClick={handleSubmission}
        >
          Complete & Submit
        </Button>
      </div>
    );
  };

  const handleSubmission = async () => {
    await uploadRecording();
    setIsSubmitting(true);
    // Simulate a loading state to show submission feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRecordingComplete(false);


      const workflowData: WorkflowData = {
        name: workflowName,
        description: workflowDescription,
        trigger: 'manual',
        video_filename: workflowPath,
    };

    // Call the function
    sendWorkflowData(workflowData);

      alert("Your workflow has been submitted. Check back in a few minutes and it should be in the My Workflows page.");
    }, 2000);
  };

  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Uploaded file:", file); // Log the uploaded file
      setUploadedFile(file);
    } else {
      console.log("No file selected."); // Log if no file is selected
    }
  };

  // Function to render the uploaded video or image
  const renderUploadedFile = () => {
    if (!uploadedFile) return null;

    const fileURL = URL.createObjectURL(uploadedFile);
    const isVideo = uploadedFile.type.startsWith('video/');

    return (
      <div className="mt-4">
        {isVideo ? (
          <video controls src={fileURL} className="w-full rounded-md shadow-md"></video>
        ) : (
          <img src={fileURL} alt="Uploaded" className="w-full rounded-md shadow-md" />
        )}
        <Button 
          className='mt-4 px-6 py-3 text-lg rounded-md font-semibold bg-green-600 hover:bg-green-700 text-white shadow-md transition-all ease-in-out'
          onClick={() => alert('Upload Complete!')} // Replace with your complete logic
        >
          Completex
        </Button>
      </div>
    );
  };

  // Function to handle file selection from the dropdown
  const handleFileSelect = (value: string) => {
    setSelectedFile(value); // Update the selected file state
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto py-8 relative">
        {/* Alert */}
        <Alert className="mb-8 bg-white shadow-sm border border-gray-200">
          <AlertTitle className="text-xl font-semibold text-gray-800">Build a New Workflow</AlertTitle>
          <AlertDescription className="text-md text-gray-600">
            Please provide the required information to build a new workflow.
          </AlertDescription>
        </Alert>

        {/* Workflow Name Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-800 mb-2">Workflow Name:</label>
          <Input 
            placeholder="Enter workflow name" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent" 
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
          />
        </div>

        {/* Workflow Description Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-800 mb-2">Workflow Description:</label>
          <Textarea 
            placeholder="Enter workflow description" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent" 
            value={workflowDescription} // Bind the state variable
            onChange={(e) => setWorkflowDescription(e.target.value)} // Update state on change
          />
        </div>

        {/* Add Trigger Section */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-800 mb-2">Add Trigger:</label>
          <Select>
            <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent">
              <SelectValue placeholder="Select a trigger" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-md shadow-lg">
              <SelectItem value="email">
                <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
                  <MdEmail className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-500 text-sm">Trigger workflow when an email is received.</p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="calendar">
                <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
                  <MdEvent className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Calendar Event</p>
                    <p className="text-gray-500 text-sm">Trigger workflow when a calendar event is created.</p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="file">
                <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
                  <MdFileUpload className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-gray-800">File Upload</p>
                    <p className="text-gray-500 text-sm">Trigger workflow when a file is uploaded.</p>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Instructions Section */}
        <div className="mb-6">
          <Card className="shadow-md rounded-md overflow-hidden border border-gray-200">
            <CardHeader className="bg-gray-800 text-white p-4">
              <CardTitle className="text-lg">Instructions</CardTitle>
            </CardHeader>
            <CardContent className="p-5 bg-white">
              <ol className="list-decimal pl-5 text-md space-y-4 text-gray-700">
                <li>
                  <span className="font-semibold">Enter Details & Add Trigger:</span> Fill in the workflow name and description, then select a trigger to initiate your workflow.
                </li>
                <li>
                  <span className="font-semibold">Start & Record Actions:</span> Click "Start Recording" and share your window to capture all actions and tabs. Speak clearly about what you're doing.
                </li>
                <li>
                  <span className="font-semibold">Stop & Review:</span> Click "Stop Recording" when done. Review the recording and use "Rerecord" if needed.
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Start/Stop Recording Button */}
        <div className="flex gap-4 items-center">
          <Button 
            className='px-6 py-3 text-lg rounded-md font-semibold bg-black hover:bg-gray-800 text-white shadow-md transition-all ease-in-out'
            onClick={startRecording}
          >
            Start Recording
          </Button>
          {!isRecording && recordedData.current.length > 0 && (
            <Button 
              className='px-6 py-3 text-lg rounded-md font-semibold bg-yellow-600 hover:bg-yellow-700 text-white shadow-md transition-all ease-in-out'
              onClick={rerecord}
            >
              Rerecord
            </Button>
          )}
          
          {/* Dropdown for recent local files */}
          <Select onValueChange={handleFileSelect}> {/* Update to handle file selection */}
            <SelectTrigger className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent">
              <SelectValue placeholder="Recent Local Files" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-md shadow-lg">
              <SelectItem value="vc_example.mp4">vc_example.mp4</SelectItem>
              <SelectItem value="aws_ec2_init.mp4">aws_ec2_init.mp4</SelectItem>
              <SelectItem value="salesforce.mp4">salesforce.mp4</SelectItem>
              <SelectItem value="datadog.mp4">datadog.mp4</SelectItem>
            </SelectContent>
          </Select>

          {renderUploadedFile()} {/* Render the uploaded file */}

          {/* Show Complete button if a file is selected */}
          {selectedFile && (
            <Button 
            className='px-6 py-3 text-lg rounded-md font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all ease-in-out'
            onClick={handleSubmission}
          >
            Complete & Submit
          </Button>
          )}
        </div>

        {/* Render Video Section */}
        {isRecordingComplete && renderVideo()}

        {/* Loading State */}
        {isSubmitting && (
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-gray-800">Your workflow has been submitted. Check back in a few minutes and it should be in the My Workflows page.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenRecorder;