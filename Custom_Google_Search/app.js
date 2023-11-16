const formEle = document.querySelector('form');

document.addEventListener('keydown', (event) => {
  // Check if the pressed key is Enter (key code 13)
  if (event.key === 'Enter') {
    formEle.submit();
  }
});
