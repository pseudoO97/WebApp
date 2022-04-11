/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState, useForm } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function SingUpModal() {
  const { toggleModals, modalState, signUp } = useContext(UserContext);
  const navigate = useNavigate();

  const [Validation, setValidation] = useState("");

  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      setValidation("6 charcaters is not ok ");
      return;
    } else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("password do not match");
      return;
    }
    try {
      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );
      formRef.current.reset();
      setValidation("");
      // console.log(cred);
      navigate("/private/private-home");
      toggleModals("close");
    } catch (err) {
      console.dir(err);
      if (err.code === "auth/email-already-in-use") {
        setValidation("email already used");
      }
      if (err.code === "auth/invalid-email") {
        setValidation("email is not valide");
      }
    }
  };
  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signUpModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            onClick={closeModal}
            className="w-100 h-100 bg-dark bg-opacity-75"
          ></div>
          <div
            className="position-absolute  top-50 start-50
            translate-middle"
            style={{ minWidth: "400px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sign Up</h5>
                  <button className="btn-close" onClick={closeModal}></button>
                </div>

                <div className="modal-body">
                  <form
                    ref={formRef}
                    onSubmit={handleForm}
                    className="sing-up-form"
                  >
                    <div className="mb-3">
                      <label htmlFor="signupemail" className="form-label">
                        Email adress
                      </label>
                      <input
                        ref={addInputs}
                        name="email"
                        required
                        type="email"
                        className="form-control"
                        id="signUpEmail"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="signupPwd" className="form-label">
                        Password
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="signupPwd"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="reaptPwd" className="form-label">
                        Reapt Password
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="reaptPwd"
                      />
                      <p className="text-danger mt-1">{Validation}</p>
                    </div>

                    <button className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
