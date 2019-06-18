
import React from 'react';
import { HTTP } from './http';


export const TextInput = ({ id, label, value, onChange }) => <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input className="form-control" id={id} type="text" value={String(value)} onChange={onChange} />
</div>


export function ObjectList({ id, items, display, value, onChange }) {
    let options = items.map(item => <option value={item.id} key={item.id}>{item[display]}</option>)
    return <select id={id} className="form-control" value={value} onChange={onChange} size="10">
        <option value="0">-Create new-</option>
        {options}
    </select>
}

export const Button = (props) => <input type="button" className="form-control" {...props} />

export class PersonComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { person: { id: 0, name: "", address: "", image: "", email: "" }, persons: [], filter: "" };
    }

    componentDidMount() {
        HTTP.get("/api/person").then(persons => this.setState({ persons }));
    }

    personChange(ev) {
        this.state.person[ev.target.id] = ev.target.value;
        this.forceUpdate();
    }

    personSelected(ev) {
        let id = Number(ev.target.value);
        if (!id) this.setState({ person: {id:0,name:"not",address:"not yet",image:"",email:"",company_id:""} });
        else HTTP.get("/api/person/" + id).then(person => 
            this.setState({ person }));
    }


    deletePerson() {
        let person = this.state.person;

        if (!this.state.person.id) return;
        HTTP.delete("/api/person/"+person.id).then(() => HTTP.get("/api/person").then(persons => this.setState({  persons })));
    }

    savePerson() {
        let person = this.state.person;
        if(person.id)
        HTTP.put("/api/person/"+person.id,person).then(person => HTTP.get("/api/person").then(persons => this.setState({ person, persons })));
        else
        HTTP.post("/api/person",person).then(person => HTTP.get("/api/person").then(persons => this.setState({ person, persons })));
    }

    render() {  

        let person = this.state.person;
        let valid = person.name && person.address;
        let saveText = person.id ? "Save" : "Create";
        return <div style={{ width: "60%", margin: "5px auto" }}>
            <h2>Persons</h2>
            <div className="row">
                <div className="col-md-3">
                    <ObjectList id="persons" items={this.state.persons} value={person.id} display="name" onChange={ev => this.personSelected(ev)} />
                </div>
                <div className="col-md-9">
                    <TextInput id="name" label="Name" value={person.name} onChange={ev => this.personChange(ev)} />
                    <TextInput id="address" label="Address" value={person.address} onChange={ev => this.personChange(ev)} />
                    <TextInput id="image" label="Image" value={person.image} onChange={ev => this.personChange(ev)} /> 
                    <TextInput id="email" label="Email" value={person.email} onChange={ev => this.personChange(ev)} />
                    <TextInput id="company_id" label="Company Id" value={person.company_id} onChange={ev => this.personChange(ev)}/>
            </div>
            </div>
            <div className="row">
            <div className="col-md-3"> </div>
                <div className="col-md-3">
                    <Button value="Delete" onClick={ev => this.deletePerson()} disabled={person.id == 0} />
                </div>
                <div className="col-md-3 col-md-offset-3">
                    <Button value={saveText} onClick={ev => this.savePerson()} disabled={!valid} />
                </div>
                
            </div>
        </div>
    }
}