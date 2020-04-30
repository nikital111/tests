import React from 'react';
import { NavLink} from "react-router-dom";
import { connect } from "react-redux";
import './Result.css';


function Result({rating,max,reset}) {

    const balls = rating*(12/max);
   
    const emotion = () => {
        if (balls<4) return <h1>You so bad((</h1>
        else if (balls<8) return <h1>So-So</h1>
        else if (balls<10) return <h1>Not bad!</h1>
        else if (balls<13) return <h1>Very Nice!!!</h1>
    }
    console.log(balls)
  return (
   <div className='result'>
     <div className='balls'>
         {rating}/{max}
      <div>You got {balls} balls!!!</div>
     </div>
     <div className='emotion'>
         {balls<4 ? 'You so bad(' : balls<8 ? 'So-So)' : balls<10 ? 'Not bad!' : 'Very nice!!!'}
     </div>
     <NavLink exact to='/'><button className='startNew' onClick={reset}>Start a new test!</button></NavLink>
    </div>
  );
}

const mapStateToProps = state => {
    return {
      rating:state.rating,
      max:state.max
    };
  };

  const mapDispatchToProps = dispatch => ({
    reset:() => {dispatch({type:'RESET'})},
   });
   
  export default connect(mapStateToProps,mapDispatchToProps)(Result);
  