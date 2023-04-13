function handleSubmit(event) {
    event.preventDefault();
  
    const data = new FormData(event.target);
  
    const value = data.get('email');
  
    console.log({ value });
  }
  
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
