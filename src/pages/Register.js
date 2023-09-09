import React, { useState } from "react";
import "../style.scss";
import Add from "../img/add-avatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    const res = await createUserWithEmailAndPassword(auth, email, password);

    const date = new Date().getTime();

    const storageRef = ref(storage, `${displayName + date}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    //   uploadTask.on(
    //     (error) => {
    //       // Handle unsuccessful uploads
    //       setErr(true);
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //         //console.log("File available at", downloadURL);
    //         await updateProfile(res.user, {
    //           displayName,
    //           photoURL: downloadURL,
    //         });

    //         await setDoc(doc(db, "users", res.user.uid), {
    //           uid: res.user.uid,
    //           displayName,
    //           email,
    //           photoURL: downloadURL,
    //         });

    //         await setDoc(doc(db, "chat", res.user.uid), {});
    //         navigate("/");
    //       });
    //     }
    //   );
    // } catch (error) {
    //   console.log("Error", error);
    //   setErr(true);
    // }
    uploadTask
      .then(() => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "Userchats", res.user.uid), {});
          navigate("/");
        });
      })
      .catch((error) => {
        console.error(error);
        setErr(true);
      });
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Let's Chat</span>
        <span className="title">Register</span>
        <form onSubmit={HandleSubmit}>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" style={{ height: 30, width: 30 }} />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong...</span>}
        </form>
        <p>
          You do have a account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
