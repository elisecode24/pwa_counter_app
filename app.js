let countDisplay = document.getElementById('count');
let button = document.getElementById('increment');

const docRef = db.collection('counter').doc('global');

// init count
docRef.get().then(doc => {
  if (doc.exists) {
    countDisplay.textContent = 'Count: ' + doc.data().value;
  } else {
    docRef.set({ value: 0 });
    countDisplay.textContent = 'Count: 0';
  }
});

// click button to increment count
button.addEventListener('click', () => {
  docRef.update({
    value: firebase.firestore.FieldValue.increment(1)
  }).then(() => {
    docRef.get().then(doc => {
      countDisplay.textContent = 'Count: ' + doc.data().value;
    });
  });
});
