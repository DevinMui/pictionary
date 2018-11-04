import React from 'react'
import styled from 'styled-components'
import Vivus from 'vivus'
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button'
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import {KeyboardArrowUp, KeyboardArrowDown} from '@material-ui/icons'

const Main = styled.div`
    height: 100%;
    background: black;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
`
const Canvas = styled.div`
    height: 100vw;
    max-height: 666px;
    align-self: center;
    width: 100%;
    background: white;
`
const Title = styled.span`
    position: absolute;
    color: white;
    top: 16px;
    left: 8px;
    font-size: 1.5rem;
    font-weight: 200
`
const ScoreBoardTitle = styled.div`
    background: #87CEFA;
    height: 64px;
    padding-top: 16px;
    text-transform: capitalize;
    font-weight: 200;
    color: white;
    font-size: 24px;
    display: flex;
    justify-content: space-around   
`
const PlayerItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
`
const Name = styled.div``
const Score = styled.div``
class Play extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dialogShowing: false, 
            strokes: [
                {
                    pathType: "circle",
                    cx: 70,
                    cy: 95,
                    r: 50
                }, {
                    pathType: "circle",
                    cx: 55,
                    cy: 80,
                    r: 5
                }, {
                    pathType: "circle",
                    cx: 85,
                    cy: 80,
                    r: 5
                }, {
                    pathType: "line",
                    x1: "75",
                    y1: '95',
                    x2: '135',
                    y2: '85'
                },{
                    pathType: "line",
                    x1: "75",
                    y1: '95',
                    x2: '135',
                    y2: '105'
                },{
                    pathType: "line",
                    x1: "60",
                    y1: '95',
                    x2: '0',
                    y2: '85'
                },{
                    pathType: "line",
                    x1: "60",
                    y1: '95',
                    x2: '0',
                    y2: '105'
                }, {
                    pathType: "line",
                    x1: "108",
                    y1: "62",
                    x2: "90",
                    y2: "10"
                }, {
                    pathType: "line",
                    x1: "70",
                    y1: "45",
                    x2: "50",
                    y2: "10"
                }, 
                {pathType: "path", d:"M108 62, 90 10, 70 45, 50, 10, 32, 62"},
                {pathType: "path", d:"M 75 90 L 65 90 A 5 10 0  0 0 75 90"},
            ],
            status: "Guess",
            guess: "cat",
            winner: {color: 'red', name:"Devin"}
        }
        this.addLine = this.addLine.bind(this)
        this.drawCanvas = this.drawCanvas.bind(this)
        this.newRound = this.newRound.bind(this)
    }
    componentDidMount(){
        this.setState({canvasWidth: Number(this.canvas.offsetWidth), canvasHeight: Number(this.canvas.offsetHeight)})
        this.addLine("M70 60 C 70 80, 110 80, 110 60")
    }
    addLine(){
        this.setState({status:"What am I drawing?"}, ()=>{
                new Vivus('working-canvas',
                    {duration: 500, type:'oneByOne', pathTimingFunction: Vivus.EASE},
                    ()=>{
                        this.setState({
                            status: "Guess!", 
                        })
                    })
  
        })
    }
    drawCanvas(){
        if(this.state.canvasWidth && this.state.canvasHeight)
            return this.state.strokes.map((el, index) => 
                  <path key={index} d={el} stroke="black" fill="transparent"/>
            )
    }
    newRound(){
        this.setState({dialogShowing: false, strokes: [], guess: "dog", winner: {}})
    }
    render(){
        return(
        <Main>
           
            <Dialog 
                disableBackdropClick
                disableEscapeKeyDown
                open={this.state.dialogShowing}
                >
                <DialogContent style={{fontSize: '1.1rem'}}>
                    Congratulations! <span style={{color: this.state.winner.color}}>{this.state.winner.name} </span>  
                    won the round with "{this.state.guess}!" 
                </DialogContent>
                <DialogActions>
          <Button color="red" onClick={this.newRound}>
            Next Round
          </Button>
        </DialogActions>
            </Dialog>
            <Title>{this.state.status}</Title>
            <Canvas ref={i => {this.canvas = i}}>
                <svg id="working-canvas" style={{position: "absolute", background: "transparent"}}>
                   {this.state.strokes.map(i=>this.draw(i))}
                </svg>
            </Canvas>
            <SwipeableBottomSheet
                onChange={(open)=>{this.setState({scoreboardIsOpen: open})}}
				overflowHeight={56}
                marginTop={128}
                style={{cursor: "pointer"}}
			>
				<ScoreBoardTitle>
                    {this.state.scoreboardIsOpen?<KeyboardArrowDown/>:<KeyboardArrowUp/>} Scoreboard  {this.state.scoreboardIsOpen?<KeyboardArrowDown/>:<KeyboardArrowUp/>}
				</ScoreBoardTitle>
				{
                    this.props.players.map((i)=>
                        <PlayerItem key={i.key}>
                            <Name>
                                {i.name}
                            </Name>
                            <Score>
                                {i.score}
                            </Score>
                        </PlayerItem>
                    )
                }
                <div id="spacer" style={{height: '20px', background: 'white'}}/>
            </SwipeableBottomSheet>
        </Main>
        )
    }
    draw(i){
        switch(i.pathType){
            case "circle":
                return(
                    <circle cx={i.cx} cy={i.cy} r={i.r} stroke="black" fill="transparent"/>
                )
            case "line":
                return(
                    <line x1={i.x1} y1={i.y1} x2={i.x2} y2={i.y2} stroke="black" fill="transparent"/>
                )
            case "path":
                return(
                    <path d={i.d} stroke="black" fill="transparent"/>   
                )
            default:
                return <div/>
        }

    }

}
export default Play