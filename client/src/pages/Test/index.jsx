import { useState } from "react";
import DropFile from "../../components/DropFile";

//firebase
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useEffect } from "react";

const Test = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log("Upload Progress : ", progress + "%");
  }, [progress]);

  const storage = getStorage();

  const upload = async () => {
    const storageRef = ref(storage, "pdf" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const currentProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(currentProgress);
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        // }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <DropFile file={file} setFile={setFile} />
      <button onClick={upload}>upload</button>
    </div>
  );
};

export default Test;
