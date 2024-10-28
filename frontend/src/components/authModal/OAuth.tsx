import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../../config/firebaseConfig";

// implement display name

const OAuth = () => {
  const auth = getAuth(firebaseApp);
  const handleOAuthClick = async () => {
    const provider = new GoogleAuthProvider();

    // always ask user to select account
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const googleResults = await signInWithPopup(auth, provider);
      const res = await fetch("/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: googleResults.user.displayName,
          email: googleResults.user.email,
          displayPicture: googleResults.user.photoURL,
        }),
      });

      const data = await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button className="w-full" onClick={handleOAuthClick}>
      <div className="flex-row flex items-center gap-2">
        <AiFillGoogleCircle className="w-6 h-6" />
        Sign in with Google
      </div>
    </Button>
  );
};

export default OAuth;
