import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./Pass.css";

function Pass({ questions, sendResult }) {
  const [state, setState] = useState({
    numberOfQ: 0,
    isCorrect: null,
    rating: 0,
  });
  const list = Object.keys(questions[state.numberOfQ]).map((q, id) => {
    if (id > 0) return null;
    const quest = Object.keys(questions[state.numberOfQ].matters).map(
      (q2, id2) => {
        const setCorrect = (e) => {
          e.preventDefault();
          const butt = document.querySelector(".checkButt");
          butt.removeAttribute("disabled");
          if (questions[state.numberOfQ].matters[q2].isCorrect)
            setState({ ...state, isCorrect: true });
          else setState({ ...state, isCorrect: false });
        };

        return (
          <li key={id2} className="qq">
            <input
              type="radio"
              name={"question" + state.numberOfQ}
              id={"radio" + state.numberOfQ}
              className="answers"
              onInput={setCorrect}
            ></input>
            <label htmlFor={"radio" + state.numberOfQ}>
              {questions[state.numberOfQ].matters[q2].title}
            </label>
          </li>
        );
      }
    );
    return (
      <div key={id} className="question">
        <h1>{questions[state.numberOfQ].title}</h1>
        {quest}
      </div>
    );
  });

  const checkAnswer = (e) => {
    e.preventDefault();
    if (state.isCorrect === null) return null;
    const container = document.querySelector(".contPass");
    const answers = document.querySelectorAll(".answers");
    const butt = document.querySelector(".checkButt");
    const buttRes = document.querySelector(".checkRes");

    if (state.isCorrect === true) {
      container.setAttribute("style", "background-color:green");
      butt.setAttribute("disabled", "true");
      buttRes.setAttribute("disabled", "true");
      for (let i = 0; i < answers.length; i++) {
        answers[i].checked = false;
        answers[i].setAttribute("disabled", "true");
      }
      setState({ ...state, isCorrect: null, rating: state.rating++ });
      if (questions.length - state.numberOfQ > 1) {
        setTimeout(() => {
          setState({ numberOfQ: state.numberOfQ++, ...state });

          for (let i = 0; i < answers.length; i++) {
            answers[i].removeAttribute("disabled");
          }
          container.setAttribute("style", "background-color:grey");
        }, 4000);
      } else setState({ ...state, ok: true });
    } else {
      container.setAttribute("style", "background-color:red");
      butt.setAttribute("disabled", "true");
      buttRes.setAttribute("disabled", "true");
      for (let i = 0; i < answers.length; i++) {
        answers[i].checked = false;
        answers[i].setAttribute("disabled", "true");
      }
      setState({ ...state, isCorrect: null });
      if (questions.length - state.numberOfQ > 1) {
        setTimeout(() => {
          setState({ numberOfQ: state.numberOfQ++, ...state });
          for (let i = 0; i < answers.length; i++) {
            answers[i].removeAttribute("disabled");
          }
          container.setAttribute("style", "background-color:grey");
        }, 4000);
      } else setState({ ...state, ok: true });
    }
  };

  const res = () => {
    sendResult(state.rating, questions.length);
  };

  return (
    <div className="contPass">
      <div className="progress">
        {state.numberOfQ + 1}/{questions.length}
      </div>
      {list}
      <div className="checkCont">
        <button className="checkButt" onClick={checkAnswer}>
          Check
        </button>
        <NavLink exact to="/result">
          <button
            className="checkRes"
            onClick={res}
            disabled={
              questions.length - state.numberOfQ === 1 && state.ok
                ? false
                : true
            }
          >
            Check u RESULT
          </button>
        </NavLink>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    questions: state.arr,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sendResult: (rating, max) => {
    dispatch({ type: "RESULT", rating: rating, max: max });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Pass);
