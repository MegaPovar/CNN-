import * as React from "react";
import { animated } from "react-spring";
import { useWiggle } from "../hooks/wiggle";
import { Link } from "wouter";
import { useNN } from "../hooks/nn";


export default function Home() {
  const { isLoaded, predict } = useNN();
  const ref = React.useRef(null);
  const [image, setImage] = React.useState(null);
  const [prediction, setPrediction] = React.useState("Model is loading...");
  
  React.useEffect(() => {
    if(isLoaded) {
      setPrediction("Ready.");
    }
  }, [isLoaded]);
  
  const goPredict = async () => {
    if(!isLoaded){
      setPrediction("Model is still loading");
      return; 
    }
    try{
      const ps = await predict(image);
      console.log(ps);
      setPrediction(`${ps[0].className} | ${ps[1].className} | ${ps[2].className}`);
    }
    catch {
      setPrediction("Failed to predict!");
    }
  }
  
  const onImageChange = (event) => {
   if (event.target.files && event.target.files[0]) {
     const img = new Image();
     img.src = URL.createObjectURL(event.target.files[0]);
     setImage(img);
   }
  }
  
  return <>
    <h1>Upload image</h1>
    <input type="file" disabled={!isLoaded} onChange={onImageChange} className="filetype" />
    <img src={image ? image.src : undefined} className="preview" />
    <button onClick={goPredict} disabled={!isLoaded}>Predict</button>
    <p>{prediction}</p>
  </>;
}
