import { useContext, useRef, useState } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext)
  const emailInputRef = useRef();

  const registrationHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter...",
      status: "pending"
    })

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
        .then(res => {
          if (res.ok) {
            return res.json()
          }

          return res.json().then(data => {
            throw new Error(data.message || "Something went wrong!")
          })
        })
        .then(data => {
          notificationCtx.showNotification({
            title: "Succsess!",
            message: "Succsessfully registered for newsletter!",
            status: "success"
          })
        })
        .catch(error => {
          notificationCtx.showNotification({
            title: "Error!",
            message: error.message || "Something went wrong!",
            status: "error"
          })
        })

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
    </section>
  );
}

export default NewsletterRegistration;
