import { useState } from 'react';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="card-container">
      <div className="card">
        <div
          className="text-box"
          onClick={() => setCount((count) => count + 1)}
        >
          <a href="#" className="btn btn-white btn-animate">
            count is {count}
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
