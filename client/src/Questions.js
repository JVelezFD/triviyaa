import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function QuestionForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter a question:
      <input 
        type="text" 
        name="question" 
        value={inputs.question || ""} 
        onChange={handleChange}
      />
      </label>
        <input type="submit" />
    </form>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<QuestionForm />);