import React from 'react';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import './Create.css';
import Form from './Form/Form';

function Create({questions,show,deleteQ,editQ}) {

  const list = questions.map((cont,id)=>{

    const deleteActionQ = (e) => {
      e.preventDefault();
      deleteQ(id);
    }

    const editActionQ = (e) => {
      e.preventDefault();
      editQ(id);
    }

return (
<div key={id} className='question'>
   <h1>{cont.title}</h1>
   <button className='editButt' onClick={editActionQ}>Edit</button>
   <button className='delButt' onClick={deleteActionQ}>Delete</button>
</div>
)
});



  return (
      <>
   <div className='createCont'>
       {list}
    </div>
     <div className='contButt'>
     <button className='createNew' type='button' onClick={show}>New question</button>
    <NavLink exact to="/pass">
     <button className='toPass' type='button'>Go to test</button>
    </NavLink>
     </div>
    <Form />
    </>
  );
}

const mapStateToProps = state => {
    return {
      questions:state.arr
    };
  };
  
   const mapDispatchToProps = dispatch => ({
     show:() => {dispatch({type:'SHOW_FORM'})},
     deleteQ:(id) => {dispatch({type:'DELETE_Q',id:id})},
     editQ:(id) => {dispatch({type:'EDIT_Q',id:id})}
    });
  
  export default connect(mapStateToProps,mapDispatchToProps)(Create);
  
