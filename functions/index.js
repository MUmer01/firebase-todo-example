const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firestore = admin.initializeApp().firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addTodo = functions.https.onCall(async (data, context) => {
  const todosRef = firestore.collection(`/users/${context.auth.uid}/todos`);
  const todosSnapshot = await todosRef.get();
  const todos = todosSnapshot.docs.map((ss) => ss.data());
  const exists = todos.some((todo) => todo.text === data.text);
  if (!exists) {
    await todosRef.add(data);
  }
});
