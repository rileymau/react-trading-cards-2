
//commented out on step 2, pulling data from server.py @app.route("/cards.json") instead. 
// const tradingCardData = [
//   {
//     name: 'Balloonicorn',
//     skill: 'video games',
//     imgUrl: '/static/img/balloonicorn.jpg',
//     cardId: 1,
//   },
//   {
//     name: 'Float',
//     skill: 'baking pretzels',
//     imgUrl: '/static/img/float.jpg',
//     cardId: 2,
//   },
//   {
//     name: 'Llambda',
//     skill: 'knitting scarves',
//     imgUrl: '/static/img/llambda.jpg',
//     cardId: 3,
//   },
//   {
    // name: 'Off-By-One',
    // skill: 'climbing mountains',
  //   // imgUrl: '/static/img/off-by-one.jpeg',
  //   cardId: 4,
  // },
  // {
  //   name: 'Seed.py',
  //   skill: 'making curry dishes',
  //   imgUrl: '/static/img/seedpy.jpeg',
  //   cardId: 5,
  // },
  // {
  //   name: 'Polymorphism',
  //   skill: 'costumes',
  //   imgUrl: '/static/img/polymorphism.jpeg',
//   //   cardId: 6,
//   },
//   {
//     name: 'Short Stack Overflow',
//     skill: 'ocean animal trivia',
//     imgUrl: '/static/img/shortstack-overflow.jpeg',
//     cardId: 7,
//   },
//   {
//     name: 'Merge',
//     skill: 'bullet journaling',
//     imgUrl: '/static/img/merge.png',
//     cardId: 8,
//   },
// ];

//make a div for each trading card and its props
function TradingCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <img src={props.imgUrl} alt="profile" />
      <p>Skill: {props.skill} </p>
    </div>
  );
}

function TradingCardContainer() {

  // make placeholder. commented out on step 2. 
  // const floatCard = {
  //   name: 'Float',
  //   skill: 'baking pretzels',
  //   imgUrl: '/static/img/float.jpg'
  // };
  
  //useState hook with initial float card
  const [cards, setCards] = React.useState([])

  //added with step 2 to useState in loop. 
  //jsonify on servery.py, receive as .json on jsx page.  
  // response line 82 feeds in to date line 83.  
  React.useEffect(() => {
    fetch('/cards.json')

    // this gets the json from server.py
    .then((response) => response.json())
    
    //this will give us a set of dictionaries, which are the values 
    //of the key 'cards'
    .then((data) => setCards(data.cards))
  }, [])

  //loop card in card date from server.py, append to array of components
  const tradingCards = [];

  //loop through cards and call the TradingCard function, using these key/name pairings
  
  for (const currentCard of cards) {
    tradingCards.push(
      <TradingCard
        key={currentCard.cardId}
        name={currentCard.name}
        skill={currentCard.skill}
        imgUrl={currentCard.imgUrl}
      />
    );
  }
// displays a div of the trading card array
  return (<div>{tradingCards}</div>);
}

// // tried further study...
// function AddTradingCard(props) {
//   const [name, setName] = React.useState("");
//   const [skill, setSkill] = React.useState("");
//   function addNewCard() {
//     fetch("/add-card", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name, skill }),
//     }).then((response) => {
//       response.json().then((jsonResponse) => {
//         alert(`Card added! Response: ${jsonResponse}`)
//       });
//     });
//   }
//   return (
//     <React.Fragment>
//       <h2>Add New Trading Card</h2>
//       <label htmlFor="nameInput">Name</label>
//       <input
//         value={name}
//         onChange={(event) => setName(event.target.value)}
//         id="nameInput"
//         style={{ marginLeft: "5px" }}
//       ></input>
//       <label
//         htmlFor="skillInput"
//         style={{ marginLeft: "10px", marginRight: "5px" }}
//       >
//         Skill
//       </label>
//       <input
//         value={skill}
//         onChange={(event) => setSkill(event.target.value)}
//         id="skillInput"
//       ></input>
//       <button style={{ marginLeft: "10px" }} onClick={addNewCard}>
//         Add
//       </button>
//     </React.Fragment>
//   );
// }



//render all of it in trading card continer on cards.html
ReactDOM.render(<TradingCardContainer />, document.getElementById('container'));
