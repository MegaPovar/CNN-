import '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { useEffect, useRef, useState } from "react";

export function useNN(){
  const [model, setModel] = useState(undefined);
  const [modelState, setModelState] = useState(-1);
  
  const warmUp = async () => {
    console.log("Warming up mobilenet.");
    setModelState(0);
    setModel(await mobilenet.load({version: 1, alpha: 1.0}));
    setModelState(1);
    console.log("NN Ready.");
  }
  
  useEffect(() => {
    if(modelState == -1){
      warmUp();
    }
  }, []);
    
  const predict = async (img) => {
    if(!modelState) throw new Error("Model has not loaded yet");
    
    const predictions = await model.classify(img);
    
    return predictions;
  }
  
  return {
    predict, 
    isLoaded: modelState == 1,
    modelState: modelState
  };
}
