import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { useState, useEffect } from 'react';
import Names from './component/Names'
import Button from './component/Button';

function App() {
  let winner = false;
  const [begin, setBegin] = useState(false)
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')

  const [turn, setTurn] = useState(1)
  const [numberOfTurns, setNumberOfTurns] = useState(0);

  let grid = ['', '', '', '', '', '', '', '', ''];
  let [tablero, setTablero] = useState(grid);

  let [listaX, setListaX] = useState([]);
  let [listaO, setListaO] = useState([]);

  let resultSet = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  function handlePlayer1(event) {
    setPlayer1(event.target.value);
  }

  function handlePlayer2(event) {
    setPlayer2(event.target.value);
  }

  function Start() {
    if (player1.length > 0 && player2.length > 0) {
      setBegin(true);
      console.log(begin)
    }
    else
      alert('Por favor ingrese ambos nombres');
  }

  function boxClick(position) {
    let casillaMarcada = [...tablero];
    let listaXMarcada = [...listaX];
    let listaOMarcada = [...listaO];

    if (casillaMarcada[position] !== "") {
      alert("La casilla ya está marcada");
    }
    else {
      if (turn === 1 && winner ===false) {
        casillaMarcada[position] = 'x';
        listaXMarcada.push(position);
        setListaX(listaXMarcada);
        setTurn(2);
       
      } else if (turn === 2 && winner ===false) {
        casillaMarcada[position] = 'o';
        listaOMarcada.push(position);
        setListaO(listaOMarcada);
        setTurn(1);
      
      }
      setNumberOfTurns(numberOfTurns + 1);
      setTablero(casillaMarcada);
    }
  }

  useEffect(() => {
    if (numberOfTurns > 4) {
      resultSet.forEach(solution => {
        if (listaX.includes(solution[0]) &&
          listaX.includes(solution[1]) &&
          listaX.includes(solution[2])) {
          alert("Felicidades, " +player1 + " es el ganador!. Ahora puedes reiniciar el juego o limpiar el tablero");
          winner = true;
        }
        else if (listaO.includes(solution[0]) &&
          listaO.includes(solution[1]) &&
          listaO.includes(solution[2])) {
          alert("Felicidades, "+ player2 + " es el ganador!. Ahora puedes reiniciar el juego o limpiar el tablero");
          winner = true;
        }
      }
      );
      if (numberOfTurns === 9 && winner === false) {
        setNumberOfTurns(0);
        alert('Nadie ganó esta partida!');
        let grid = ['', '', '', '', '', '', '', '', ''];
        setTablero(grid);
        setTurn(1);
        setListaX([]);
        setListaO([]);
        console.log(winner)

      }
    }
  }, [numberOfTurns]);


  function resetGame() {
    let grid = ['', '', '', '', '', '', '', '', ''];
    setTablero(grid);
    setTurn(1);
    setNumberOfTurns(0);
    setListaX([]);
    setListaO([]);
    winner = false;
  }

  return (
    <>
      <div className='container d-flex'>
        <div className='row mx-auto mt-2'>
          <h1>Tic Tac Toe</h1>
        </div>
      </div>
      {begin === false ? (
        <form>
          <div className='row mt-5'>
            <Names className='col-2 m-2 ms-auto' placeholder="Nombre Jugador 1" onChange={handlePlayer1} value={player1} />
            {/* {player1} Elige: <button className="btn-primary" value='x' onChange={handleChoice}>X </button> o  <button className="btn-primary" value='o' onChange={handleChoice}>O </button>  */}
            <Names className='col-2 m-2 me-auto' placeholder="Nombre Jugador 2" onChange={handlePlayer2} value={player2} />
          </div>
        </form>
      ) : null
      }
      {begin === false ?
        <div className='row mt-5'>
          <Button className="col-2 btn btn-dark mx-auto" label="Comencemos!" onClick={Start} value="" />
        </div> : null
      }

      {begin === true ?
        <div className="gameArea">
          <div>
            <p>El jugador 1 es {player1} y usará X</p>
            <p>El jugador 2 es {player2} y usará O</p>
            <p>Ahora es el turno de: <b>{turn === 1 ? player1 : player2}</b></p>
          </div>
        </div> : null}

      {begin === true ?
        (<div className="tableArea mx-auto">
          <div className='row'>
            <div className='col'>
              <table border="1px">
                <tbody>
                  <tr>
                    <td><button className="boxButton" onClick={() => boxClick(0)}> {tablero[0]} </button></td>
                    <td><button className="boxButton" onClick={() => boxClick(1)}> {tablero[1]} </button></td>
                    <td><button className="boxButton" onClick={() => boxClick(2)}> {tablero[2]} </button></td>
                  </tr>
                  <tr>
                    <td><button className="boxButton" onClick={() => boxClick(3)}> {tablero[3]} </button></td>
                    <td><button className="boxButton" onClick={() => boxClick(4)}> {tablero[4]} </button></td>
                    <td><button className="boxButton" onClick={() => boxClick(5)}> {tablero[5]} </button></td>
                  </tr>
                  <tr>
                    <td><button className="boxButton" onClick={() => boxClick(6)}> {tablero[6]} </button></td>
                    <td><button className="boxButton" onClick={() => boxClick(7)}> {tablero[7]} </button></td>
                    <td><button className="boxButton" onClick={() => boxClick(8)}> {tablero[8]} </button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>) : null}

      {begin === true ?
        <div className="d-flex">
          <div className='row mx-auto d-flex'>
            <Button className="col-4 btn btn-light mx-auto " label="Reiniciar juego" onClick={() => { window.location.reload(false) }} value="" />
            <Button className="col-4 btn btn btn-info mx-auto" label="Limpiar tablero" onClick={resetGame} value="" />
          </div>
        </div>
        : null}

    </>

  );
}
export default App;
