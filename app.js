let countDisplay = document.getElementById('count');
let button = document.getElementById('increment');

// Firestore document reference
const docRef = db.collection('counter').doc('global');

// Load initial count
docRef.get().then(doc => {
  if (doc.exists) {
    countDisplay.textContent = 'Count: ' + doc.data().value;
  } else {
    // If doc doesn't exist, create it
    docRef.set({ value: 0 });
    countDisplay.textContent = 'Count: 0';
  }
});

// Increment count on button click
button.addEventListener('click', () => {
  docRef.update({
    value: firebase.firestore.FieldValue.increment(1)
  }).then(() => {
    docRef.get().then(doc => {
      countDisplay.textContent = 'Count: ' + doc.data().value;
    });
  });
});
