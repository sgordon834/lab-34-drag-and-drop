import ExpenseItem from '../expense-item';
import React from 'react';

let emptyState = {
  name: '',
  cost: 0,
}

class ExpenseForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name: '',
      cost: 0,
      categoryID: this.props.categoryID,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
  }

  handleChange(e){
    let {name,value} = e.target;
    this.setState({[name]:value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

  handleDragOver(e){
    e.preventDefault();
    console.log('OVER');
  }

  handleDrop(e){
    e.preventDefault();
    let payload = e.dataTransfer.getData('text/json');
    let card = JSON.parse(payload);
    this.props.expenseDelete(card);
    card.categoryID = this.state.categoryID;
    console.log('DROP', card);
    this.props.onComplete(card);
  }



  render(){
    return(
      <div className='category-form' onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
        <form 
          className='expense-form'
          onSubmit={this.handleSubmit}
        >
          <input
            name='name'
            placeholder='expense item'
            type='text'
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            name='cost'
            type='number'
            value={this.state.cost}
            onChange={this.handleChange}
          />
          <button type='submit'> create expense </button>
        </form>

        <ExpenseItem 
          expenseDelete={this.props.expenseDelete}
          expenses={this.props.expenses} 
          categoryID={this.state.categoryID}/> 

      </div>
    )
  }
}

export default ExpenseForm;