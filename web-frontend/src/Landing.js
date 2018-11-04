import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

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
const Player = (props) =>
    <PlayerComponent>
        {props.name}
    </PlayerComponent>

const Landing = (props) => 
    <div style={{padding: '8px', display:'flex', flexDirection: "column", justifyContent: "space-between"}}>
    <div>
        <h1>
            Pictionary
        </h1>
        {
            props.players.map(i => 
                <Player key={i.key} name={i.name}/>    
            )
        }
        </div><div>
        <Link to="/play">
            <Button>
                Start
            </Button>
        </Link>
        </div>
    </div>
export default Landing