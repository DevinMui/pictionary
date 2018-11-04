import React from 'react';
import styled from 'styled-components'
import {Switch, Route, Redirect} from 'react-router-dom'
import Landing from './Landing'
import NotFound from './404'
import Play from './Play'

const Main = styled.div`
  background: white;
  width: 100%;
  min-height: 100vh;
  @media(min-width: 666px){
    background: black;
  }
`
const B = styled.div`
max-width: 666px;
margin: 0 auto;
min-height: 100vh;
background: white;

`
const colors = [

]
class App extends React.Component {
  constructor(){
    super()
    this.state = {
      hasStarted : false,
      players : [
        // {key: 0, name: "Aaron", score:0},
        // {key: 1, name: "Devin", score:0},
        // {key: 2, name: "Catherine", score:0},
        // {key: 3, name: "Jaiveer", score:0}
      ]
    }
  }
  addPlayer(name){
    this.setState({
      players: [...this.state.players, {key: this.state.players.length, name: name, score: 0}]
    })
  }
  render() {
    return (
      <Main>
        <B>
      <Switch>
        <Route 
          path="/"
          exact
          render = {()=>{
            if(this.state.hasStarted) 
              return <Redirect/>
            else
              return <Landing addPlayerFunction = {(name)=>this.addPlayer(name)} players = {this.state.players}/>}}
          />
        <Route 
          path="/play"
          render = {()=><Play players={this.state.players}/>}
        />
        <Route
          component = {NotFound}
        />
        
      </Switch>
      </B>
      </Main>
    );
  }
}

export default App;
