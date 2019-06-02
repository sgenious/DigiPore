import React, { Component } from 'react';
import styled from "styled-components";
import {HTTP} from './http';
import { Link} from 'react-router-dom';
export class Hub extends Component {
    constructor(props){
        super(props);
        this.state={person:[]};
    }
    componentDidMount(){
        HTTP.get("/api/person").then(person => this.setState({person}));
    }
    
    
    render() {
        let arows=this.state.person.map(a => <Person person={a} />)
        return (
          <div className="main">
         {arows} 
          </div>
        );
      }
    }
    class Person extends Component{
        constructor(props){
            super(props);
            this.state={p:{id:0,name:"",address:"",image:"",email:"",cname:""}};
        }

     
    render() {
        const { id, name, address, image } = this.props.person;
         return (
           <PersonWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
           
              <div className="img-container p-5">  
                 <Link to={`/detail/${id}`}>
                    <img src={image} alt="" className="img-top" />
                 </Link>               
               </div>
                 <p className="align-self-center mb-0">{name}</p>
                 <h5 className="text-blue font-italic mb-0">
                   {address}
                 </h5>            
           </PersonWrapper>
         );
       }
     }
     const PersonWrapper = styled.div`
   

     &:hover {
       .main {
         border: 0.04rem solid rgba(0, 0, 0, 0.2);
         box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
       }
     }
     .img-container {
       position: relative;
       overflow: hidden;
     }
     .img-top {
       transition: all 1s linear;
     }
     .img-container:hover .img-top {
       transform: scale(1.2);
     }
   `;
  