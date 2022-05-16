import { useEffect, useState } from 'react';

const App = () => {
  const [zooAnimal, setZooAnimal] = useState([]);

  // asynchronous function so we can wait for data to be fetched
  const fetchData = async () => {
    // try code in the 'try' block and if error occurs/is thrown then run catch block
    try {
      // wait for fetch request from API endpoint and store rsponse in variable
      const response = await fetch('https://zoo-animal-api.herokuapp.com/animals/rand/5');

      // check to see if the response was successful otherwise throw error
      if(!response.ok){
        throw new Error(response.statusText)
      }
      // parse JSON response into normal javascript
      const data = await response.json();

      // see returned data in console and set that data as new state value
      console.log(data)
      setZooAnimal(data)
    } catch (err) {
      // catch an error that occurs in the try block
      // console log the error
      console.log(err)
    }
  }

  // useEffect only runs once when component is first rendered
  useEffect(() => {
    // call the fetchData function which gets data from API
    fetchData()
  // empty array makes sure useEffect only runs when component mounts and not when component updates
  }, [])

  return (
    <div className="App">
      <h1>Random Zoo Animal</h1>
      {zooAnimal.map((animal, index) => {
        // map through API data stored in the state and display it to the user
        return (
          <div key={index}>
            <h3>Name: {animal.name}</h3>
            <img src={animal.image_link} alt="animal"/>
          </div>
        )
      })}
    </div>
  );
}

export default App;