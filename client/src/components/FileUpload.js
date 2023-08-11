import {useState} from "react";
import axios from "axios";
import "./FileUpload.css"

const FileUpload=({contract, account, provider})=>{
    const [file,setFile] = useState(null);
    const [fileName,setFileName] = useState("No record Selected");
   const handleSubmit=async(e)=>{
e.preventDefault();
if(file){
    try{
const formData = new FormData();
formData.append("file",file);

const resFile = await axios({
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data: formData,
    headers: {
      pinata_api_key: `e1cb341bed155451a55f`,
      pinata_secret_api_key: `8bd72ac6c71bd0a5dd72147346158e6015e34274b1b795db1e8b4a76b174e323`,
      "Content-Type": "multipart/form-data",
    },
  });
const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
//const signer  = contract.connect(provider.getSigner());
contract.add(account,ImgHash);
alert("Successfully record uploaded");
setFileName("No record selected");
setFile(null);


    }catch(e){
        alert("Unable to upload record to pinata")
    }
}
   }
   const retrieveFile=(e)=>{
const data = e.target.files[0];
console.log(data)
const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
   };
   return <div className="top">
        <form className="form" onSubmit={handleSubmit}>
           <label htmlFor="file-upload" className="choose">
            Choose record
           </label>
           <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile}/>
<span className="textArea">record: {fileName}</span>
<button type="submit" className="upload" disabled={!file}>Upload record</button>       
       
        </form>
        </div>;
    };
    export default FileUpload;