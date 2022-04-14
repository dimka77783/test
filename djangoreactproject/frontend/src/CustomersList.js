import  React, { Component } from  'react';
import  CustomersService  from  './CustomersService';

const  customersService  =  new  CustomersService();

class  CustomersList  extends  Component {

constructor(props) {
	super(props);
	this.state  = {
		customers: [],
		nextPageURL:  ''
	};
	this.nextPage  =  this.nextPage.bind(this);
	this.handleDelete  =  this.handleDelete.bind(this);
}

componentDidMount() {
	var  self  =  this;
	customersService.getCustomers().then(function (result) {
		console.log(result);
		self.setState({ customers:  result.data, nextPageURL:  result.nextlink})
	});
}
handleDelete(e,pk){
	var  self  =  this;
	customersService.deleteCustomer({pk :  pk}).then(()=>{
		var  newArr  =  self.state.customers.filter(function(obj) {
			return  obj.pk  !==  pk;
		});

		self.setState({customers:  newArr})
	});
}

nextPage(){
	var  self  =  this;
	console.log(this.state.nextPageURL);
	customersService.getCustomersByURL(this.state.nextPageURL).then((result) => {
		self.setState({ customers:  result.data, nextPageURL:  result.nextlink})
	});
}
render() {

	return (
		<div  className="customers--list">
			<table  className="table">
			<thead  key="thead">
			<tr>
				<th>#</th>
				<th>Date</th>
				<th>Title</th>
				<th>Amount</th>
				<th>Distance</th>
				<th>Actions</th>
			</tr>
			</thead>
			<tbody>
			{this.state.customers.map( c  =>
				<tr  key={c.pk}>
				<td>{c.pk}  </td>
				<td>{c.Date}</td>
				<td>{c.Title}</td>
				<td>{c.Amount}</td>
				<td>{c.Distance}</td>
				<td>
				<button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
				<a  href={"/customer/" + c.pk}> Update</a>
				</td>
			</tr>)}
			</tbody>
			</table>
			<button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
		</div>
		);
  }
}
export  default  CustomersList;