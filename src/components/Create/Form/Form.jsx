import React, {useState,useEffect} from 'react';
import { connect } from "react-redux";
import './Form.css';

const Form = ({question,idQ,isShow,close,create,editFormQ}) => {

  const [state,setState] = useState(idQ !== null ? question : [{title:'',isCorrect:false}]);
  useEffect(()=>{
   if(idQ !== null) setState(question);
  },[idQ])

    if(!isShow) return null;

    const stateTitle = idQ === null ? 
    (e) => {
      e.preventDefault();
     let id = e.target.id.split('');
     id = id[1];
     const value = e.target.value;
      setState(()=>{
       state[id].title = value;
       return state;
      })
    } :
    (e) => {
      e.preventDefault();
     let id = e.target.id.split('');
     id = +id[1]+1;
     const value = e.target.value;
      setState(()=>{
       state.matters['q'+id].title = value;
       return state;
      })
    }

    const titleEdit = (e) =>{
      e.preventDefault();
      console.log('asdasd')
      const value = e.target.value;
       setState(()=>{
        state.title = value;
        return state;
       })
    }

    const stateCorrect = idQ === null ? 
    (e) => {
      e.preventDefault();
      let id = e.target.id.split('');
     id = +id[2];
     setState(()=>{
       for(let i = 0;i<state.length;i++){
         if(id === i){
           state[i].isCorrect = true;
         }
         else{
          state[i].isCorrect = false;
         }
       }
       return state;
     })
    } :
    (e) => {
      e.preventDefault();
      let id = e.target.id.split('');
     id = +id[2]+1;
     setState(()=>{    
         for (const key in state.matters) {
           if(key === 'q'+id) state.matters[key].isCorrect = true;
           else state.matters[key].isCorrect = false;
         }       
       return state;
     })
    }

  const listF = idQ !== null ? null : state.map((item,id)=>{
    const listQ = Object.keys(item).map((q,id2) => {
      if(id2>0) return null;
      return (<>
      <h1 key={ 'title' + id}>question {id+1}</h1>
      <div className='createdQF' key={'div' + id}>
         <input type='radio' id={'ch' + id} name='question' onInput={stateCorrect} key={'check' + id}></input>
         <input type='text'  id={'t' + id} onChange={stateTitle} key={'text' + id}></input>
      </div>
      </>)
    })
    return listQ
  })

  const listEF = idQ !== null ? Object.keys(question.matters).map((q,id) => {
      return (<>
        <h1 key={ 'title' + id}>question {id+1}</h1>
        <div className='createdQF' key={'div' + id}>
            <input type='radio' id={'ch' + id} name='question' onInput={stateCorrect} key={'check' + id}></input> 
           <input type='text' defaultValue={question.matters[q].title} id={'t' + id} onChange={stateTitle} key={'text' + id}></input>
        </div>
        </>)    
  }) : null;
    
    const createQ = idQ === null ?
     (e) => {
      e.preventDefault();
      setState([...state,{title:'',isCorrect:false}])
    } :
    (e) => {
      e.preventDefault();
      setState(() => {
        let num = null;
        for(let key in state.matters){
          num = key.split('')[1];
          num = +num+1;
        }
        state.matters['q'+num] = {title:'', isCorrect:false}
        return {...state}
      }
      )
      console.log(state)
    }


    const createList = (e) => {
      e.preventDefault();

      let titleQ = document.querySelector('.inTitle').value;

      if(titleQ === '' || state.length === 1) return null;
    
     const myObj = {};

       for(let i = 0; i<state.length;i++){
         let q = `q${i+1}`;
         myObj[q] = state[i];
       };
       const newQQ = {
         title:titleQ,
         matters:myObj
       };

       create(newQQ);
       titleQ = '';
       setState([{title:'',isCorrect:false}]);
    }

    const editQ = (e) => {
      e.preventDefault();

     let titleQ = document.querySelector('.inTitle').value;
     if(titleQ === '' || state.length === 1) return null;
     setState([{title:'',isCorrect:false}]);
     editFormQ(idQ,state);
    }


    const closeForm = () => {
      close();
      setState([{title:'',isCorrect:false}]);
    }
    
    
    return (
        <div className='wrap'>
          <form className='root'>
            <h4>Create question</h4>
            <button className='del' onClick={closeForm}>X</button>
    
            <input
              className='inTitle'
              name="title"
              type="text"
              placeholder="Title"
              defaultValue={idQ !== null ? question.title : ''}
              onChange={idQ !== null ? titleEdit : null}
            />

            <div className='createdQ'>
             {idQ !== null ? listEF : listF}
            </div>

            <div className='contButtForm'>
            <button className='createQF' onClick={createQ}>
              New question
            </button>

            <button className='create' onClick={idQ === null ? createList : editQ}>
              {idQ === null ? 'Create' : 'Edit'}
            </button>
            </div>

          </form>
        </div>
      );
}

const toProps = state => {
    return {
      isShow:state.isShow,
      idQ:state.id,
      question:state.arr[state.id]
    };
  };

  const toState = dispatch => ({
    close:() => {dispatch({type:'CLOSE_FORM'})},
    create:(obj) => {dispatch({type:'CREATE_Q',payload:obj})},
    editFormQ:(id,obj) => {dispatch({type:'EDIT_FORM_Q',id:id,obj:obj})},
   });

export default connect(toProps,toState)(Form);