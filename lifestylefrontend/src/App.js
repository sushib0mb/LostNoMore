import React, { useState } from 'react';

function App() {
  const [designData, setDesignData] = useState(null);

  // This useEffect isn't necessary if you're just embedding the iframe
  // but can be used if you want to fetch and display data.
  // useEffect(() => {
  //   fetch('https://api.figma.com/v1/files/your-file-id', {
  //     method: 'GET',
  //     headers: {
  //       'X-Figma-Token': 'your-figma-api-token',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => setDesignData(data));
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Figma Design Embed</h1>
        <iframe
          style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
          width="800"
          height="450"
          src="https://embed.figma.com/design/QPebY5x0bK6Y6tyZDX5sT6/Hack-Beanpot?node-id=0-1&embed-host=share"
          allowFullScreen
        ></iframe>
      </header>
    </div>
  );
}

export default App;