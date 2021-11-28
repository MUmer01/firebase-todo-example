import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase, { auth, firestore, functions } from "./firebase";

const addTodo = functions.httpsCallable("addTodo");

const Todos = () => {
  const [todo, setTodo] = React.useState("");
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const [todos, loading] = useCollectionData(todosRef, { idField: "id" });

  const signOut = () => {
    auth.signOut();
  };
  const submitTodo = (e) => {
    e.preventDefault();
    // todosRef.add({
    addTodo({
      text: todo,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTodo("");
  };
  return (
    <>
      <header>
        <button onClick={signOut}>Sign Out</button>
      </header>
      <main>
        <form onSubmit={submitTodo}>
          <input
            required
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            placeholder="What's Next?"
          />
          <button type="submit">Add</button>
        </form>
        {loading ? (
          <span>Loading todos...</span>
        ) : todos?.length ? (
          todos.map((todo, i) => <Todo key={i} {...todo} />)
        ) : null}
      </main>
    </>
  );
};

const Todo = ({ id, complete, text }) => {
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);

  const onComplete = () => {
    todosRef.doc(id).set({ complete: !complete }, { merge: true });
  };

  const onDelete = () => {
    todosRef.doc(id).delete();
  };
  return (
    <div className="todo">
      <button
        className={`todo-item ${complete ? "complete" : ""}`}
        tabIndex="0"
        onClick={() => onComplete()}
      >
        {text}
      </button>
      <button onClick={() => onDelete()}>x</button>
    </div>
  );
};

export default Todos;
