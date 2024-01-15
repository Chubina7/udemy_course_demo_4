import { useRef, useState } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [validatorMessage, setValidatorMessage] = useState({})
  const emailInputRef = useRef();

  const registrationHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    if (
      enteredEmail == "" ||
      !enteredEmail.includes(".") ||
      !enteredEmail.includes("@")
    ) {
      setValidatorMessage({ message: "Try again" })
    } else {
      const reqBody = { email: enteredEmail }

      fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => res.json())
        .then(data => {
          setValidatorMessage({ message: `${data.user.email} succsesfuly registered!` })
        });

      emailInputRef.current.value = ""
    }
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
      <p className="center">{validatorMessage.message}</p>
    </section>
  );
}

export default NewsletterRegistration;
