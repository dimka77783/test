import React, { Component } from 'react';
import CustomersService from './CustomersService';

const customersService = new CustomersService();

class CustomerCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          customersService.getCustomer(params.pk).then((c)=>{
            this.refs.Date.value = c.Date;
            this.refs.Title.value = c.Title;
            this.refs.Amount.value = c.Amount;
            this.refs.Distance.value = c.Distance;
          })
        }
      }

      handleCreate(){
        customersService.createCustomer(
          {
            "Date": this.refs.Date.value,
            "Title": this.refs.Title.value,
            "Amount": this.refs.Amount.value,
            "Distance": this.refs.Distance.value
        }          
        ).then((result)=>{
          alert("Customer created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        customersService.updateCustomer(
          {
            "pk": pk,
            "Date": this.refs.Date.value,
            "Title": this.refs.Title.value,
            "Amount": this.refs.Amount.value,
            "Distance": this.refs.Distance.value
        }          
        ).then((result)=>{
          console.log(result);
          alert("Customer updated!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              First Name:</label>
              <input className="form-control" type="text" ref='Date' />

            <label>
              Last Name:</label>
              <input className="form-control" type="text" ref='Title'/>

            <label>
              Phone:</label>
              <input className="form-control" type="text" ref='Amount' />

            <label>
              Email:</label>
              <input className="form-control" type="text" ref='Distance' />
            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }  
}

export default CustomerCreateUpdate;
