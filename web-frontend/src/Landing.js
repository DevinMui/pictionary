import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {TagFaces} from '@material-ui/icons'
const PlayerComponent = styled.div`
    border-radius: 8px;
    border: 1px solid black;
    padding: 32px;
    font-weight: 200;
    font-size: 1.5rem;
    margin-bottom: 16px;
`
const Button = styled.div`
    background: green;
    text-align: center;
    padding: 16px;
    color: white;
    text-transform: uppercase;
    border-radius: 8px;
    transition: 1s ease;
    -webkit-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
    :hover{
        -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.75);
    }
`
const NoPlayerMessage = styled.div`
    padding: 1rem;
    border: 0.5px solid grey;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    font-size: 1.25rem;
    font-weight: 200;
    text-align: center;
    color: grey
`
const Player = (props) =>
    <PlayerComponent>
        {props.name}
    </PlayerComponent>

class Landing  extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
        this.addPlayer = this.addPlayer.bind(this)
    }
    noPlayerMessage(){
        if(!this.state.addingPlayer)
            return(
                <NoPlayerMessage>
                    <img src="/warning-sign.svg" height="150"/>
                    <br/>
                    No players yet... Add one by clicking the button below!
                </NoPlayerMessage>
            )
    }
    addPlayer(){
        this.setState(
            {addingPlayer: true}
        )
        setTimeout(()=>{
            this.setState({addingPlayer: false})
            this.props.addPlayerFunction("Devin")
        },5000)
    }
    drawAddPlayer(){
        return(
            <NoPlayerMessage>
                <img src="/face.svg" height="150"/>
                <br/>
                Introduce yourself with "My name is..." and your name five times.
            </NoPlayerMessage>
        )
    }
    render(){
        return(
        <div style={{padding: '8px', display:'flex', flexDirection: "column", justifyContent: "space-between"}}>
        <div>
            <h1>
                Pictionary
            </h1>
            {
                this.state.addingPlayer?this.drawAddPlayer():""
            }
            { this.props.players.length>=1?
                this.props.players.map(i => 
                    <Player key={i.key} name={i.name}/>    
                ):this.noPlayerMessage()
            }
            </div>
            <div>
                {this.state.addingPlayer?"": <Button onClick={this.addPlayer} style={{cursor: "pointer", marginBottom: '8px', background: "#2196f3"}}>
                Add player
            </Button>}
           
            {this.props.players.length >= 1?
                <Link to="/play">
                    <Button>
                        Start
                    </Button>
                </Link>:<br/>
            }
            
            </div>
        </div>)
    }
}
    
export default Landing