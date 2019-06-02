import React from 'react';
import styled from "styled-components";
import { PersonDetail } from './app.persondetail';
import {HTTP} from './http';
import {HashRouter as Router, Route, Link} from 'react-router-dom';

export class AuthorList extends React.Component{
    constructor(props){
        super(props);
        this.state={person:[]};
    }

    componentDidMount(){
        HTTP.get("/api/person").then(person => this.setState({person}));
    }

    render(){
        let arows=this.state.person.map(a => <li key={a.id}><Link to={`/detail/${a.id}`}>{a.name}</Link></li>)
        return <Router><div>
       
            <h2>person</h2>
            <ul>
                {arows}
            </ul>
            <Route path="/detail/:id" component={PersonDetail} />
        </div></Router>
    }

}
export  class Person extends React.Component {
    constructor(props){
        super(props);
        this.state={person:[],p:{id:1,name:"Fair Skin",address:"not yet",image:"",email:"",company_id:"3"}};
    }

    componentDidMount(){
        HTTP.get("/api/person").then(person => this.setState({person}));
    }
    handleDetail(id){
      console.log("id",id);
      HTTP.get("/api/person/"+id).then (p =>  this.setState({p}) );
  }
    render() {
     const { id, name, address, img,  email, company_id } = this.state.p;
      return (
        <Router><PersonWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
         <Link to={`/detail/${id}`}>
          </Link>
          <div className="main">
            <div>
           
                  <div
                    className="img-container p-5"
                    onClick={this.handleDetail(id)}
                  >
                    <Link to={`/detail/${id}`}>
                      <img src={`/img/${company_id}.jpg`} alt="" className="img-top" />
                    </Link>
                    <button
                      className="cart-btn"
                      onClick={() => { console.log("clicked");
                       
                      }}
                    >
                    </button>
                  </div>
            </div>
            <div className="main-footer d-flex justify-content-between">
              <p className="align-self-center mb-0">{name}</p>
              <h5 className="text-blue font-italic mb-0">
                {address}
              </h5>
            </div>
          </div>
          <Route path="/detail/:id" component={PersonDetail} />
        </PersonWrapper></Router>
      );
    }
  }
  const PersonWrapper = styled.div`
.main {
    border-color: transparent;
    transition: all 1s linear;
  }
  .main-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .main {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .main-footer {
      background: rgba(247, 247, 247);
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
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s ease-in-out;
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }
  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }
`;
