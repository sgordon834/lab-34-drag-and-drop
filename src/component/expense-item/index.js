import './expense-item.scss';
import React from 'react';

class ExpenseItem extends React.Component{
  constructor(props){
    super(props);

    this.handleDragStart = this.handleDragStart.bind(this);
  }

  handleDragStart(e){
    console.log('drag working');
    let card = this.props.expenses[this.props.categoryID].filter(exp => {
      return exp.id === e.target.id;
    })[0];
    e.dataTransfer.setData('text/json', JSON.stringify(card));
    console.log('card', card);
    console.log(this.props.expenses, this.props.categoryID);
  }



  render(){
    return(
      <div className='expense-item'>
        {this.props.expenses[this.props.categoryID].map((expense,i) => 
          <div key={expense.id} id={expense.id} draggable="true" onDragStart={this.handleDragStart}>
            <p> {(expense.name)} </p>
            <button onClick={() => this.props.expenseDelete(expense)}> x </button>
          </div>
        )}
      </div>
    );
  }
};

export default ExpenseItem;
