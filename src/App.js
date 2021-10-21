import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Weather from './components/Weather';
import Error from './components/Error';

function App() {
  //Form state
  const [search, setSearch] = useState({
    city: '',
    country: ''
  });

  const [consult, setConsult] = useState(false);
  const [result, setResult] = useState({});
  const[error, setError] = useState(false);

  //Extract city and country
  const {city, country} = search;

  useEffect(() => {
    const consultAPI = async () => {
      if(consult){
        const appID = '65d29efdd546593e990fc128b3f1f71d';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appID}`;

        const answer = await fetch(url);
        const result = await answer.json();

        setResult(result);
        setConsult(false);

        //Detect wrong consult
        if(result.cod === "404"){
          setError(true);
        }else{
          setError(false);
        }
      }
    }
    consultAPI();
  }, [consult, city, country]);

  let component;
  if(error){
    component = <Error message="0 Resultados" />
  }else{
  component =<Weather
                result={result}
              />
  }

  return (
    <Fragment>
      <Header
      title='Clima React'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form
              search={search}
              setSearch={setSearch}
              setConsult={setConsult}
              />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
