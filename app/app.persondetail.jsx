import React from 'react';
import {HTTP} from './http';
export class PersonDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={ person:{id:0,name:"not",address:"not yet",image:"",email:"",company_id:"",cname:""}};
    }

    componentDidMount(){
        let personId=this.props.match.params.id;
        HTTP.get("/api/person/"+personId,'P').then (person =>  this.setState({person}));
    }


    back(){
        if (this.state.person.id){
         this.props.history.goBack(); 
        }
    }

    render(){
        return <div>
            <h3>Person Details</h3><br />
            <img src={this.state.person.image} alt="" className="img-top" /> <br /><br />
            <h4>Name: </h4 >{this.state.person.name}
            <h4>Address:</h4>  {this.state.person.address}
            <h4>Email: </h4>{this.state.person.email} 
            <h4>Company: </h4> {this.state.person.cname} <br/><br />
            <input type="button" value="Back" onClick={e => this.back()} />
        </div>
    }
}