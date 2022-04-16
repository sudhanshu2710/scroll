import { useEffect, useState } from 'react';
import './App.css';

let PAGE_NUMBER = 1

function App() {
  const [state, setState] = useState([]);
  const [value, setValue] = useState(true);

  const [page, setPage] = useState(PAGE_NUMBER);
  console.log(page);

  useEffect(() => {
		fetch(
			`https://api.instantwebtools.net/v1/passenger?page=${page}&size=5`
		)
			.then((res) => res.json())
      .then((json) => {
        console.log(json);
        setState([...state, ...json.data]);
        
      });
  }, [page]);

  const scrollToEnd = () => {
    setValue(!value)
    setPage(page + 1);
  }

  window.onscroll = function (ev) {
  //   console.log(
	// 	window.innerHeight + window.pageYOffset >= document.body.offsetHeight
	// );
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
		// console.log("scrolled");
		scrollToEnd();
	} else {
		console.log("no");
	}
  }

  return (
    <div className="App">
      {
        state.map((el, i) => {
          return (
				<div key={i} className={"container"}>
					<h4>{el._id}</h4>
					<h4>{el.name}</h4>
					<h4>{el.trips}</h4>
				</div>
			);
        })
      }
    </div>
  );
}

export default App;
