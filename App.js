import React,{Component} from 'react';

import './App.css';


import {TodoBanner} from "./TodoBanner";
import {TodoRow} from "./TodoRow";
import {TodoCreater} from "./TodoCreater";
import {VisibilityControl} from "./VisibilityControl";

//adding dynamic data

export default class App extends Component
{
    constructor(props)
    {
      super(props);
      this.state=
      {
        userName: "Avnika",
       todoItems:[{ action:"Buy a Flower", done:false},

                  {action:"Do workout",done:true},
                  {action:"Study Programming",done:false},
                  {action:"Pray",done:true}
       ],

       showCompleted :true
      // newItemText:" "
      }
    }


   updateNewTextValue=(event)   =>
   {

    this.setState({  newItemText:event.target.value

    });


   }

    createNewTodo =(task)=>

    {
      if(!this.state.todoItems
            .find(item=>item.action === task))

            {
              this.setState({

                todoItems :[...this.state.todoItems,
                            {action : task,
                              done :false}]
                            },
                            () => localStorage.setItem("todos",JSON.stringify(this.state)));
                //newItemText:""
          
            }
          
    }
    toggleTodo=(todo)=> this.setState
    ({ todoItems: this.state.todoItems.map(

    item=>item.action===todo.action?
    { ...item, done :!item.done} : item)});


    todoTableRows =(doneValue) => this.state.todoItems
    .filter(item =>item.done===doneValue)
    .map
      (item=>

        <TodoRow key= {item.action} item={item}
        callback={this.toggleTodo}
         
        ></TodoRow> )

        //load/get the kept data
        componentDidMount =() =>
        {

            let data =localStorage.getItem("todos");
            this.setState(data!=null? JSON.parse(data):
           
            {
              userName: "Avnika",
             todoItems:[{ action:"Buy a Flower", done:false},
      
                        {action:"Do workout",done:true},
                        {action:"Study Programming",done:false},
                        {action:"Pray",done:true}
             ],
      
             showCompleted :true
            // newItemText:" "
            } );


        }
     

   render()
   {
      return(
    <div>

     


      <TodoBanner name={this.state.userName}
        tasks={this.state.todoItems} ></TodoBanner>


         <div className="container-fluid">


          

           <TodoCreater callback={this.createNewTodo}/>
            <table className="table table-striped table-bordered">


              <thead>

                <tr>
                  <th>
                    todo Task Name
                  </th>
                  <th>done</th>

                </tr>
              </thead>

              <tbody>
               { /**show incomplete tasks */}
                { this.todoTableRows(false) }
              </tbody>

            </table>
                     <div className="bg-danger text-white text-center p-2">
                       <VisibilityControl description ="Completed Tasks"
                       isChecked={this.state.showCompleted}
                       callback={(checked) =>
                      this.setState({showCompleted:checked})}
                      ></VisibilityControl>
                     </div>
                     {
                         this.state.showCompleted &&
                        <table className="table table-striped table-border">


                          <thead>
                            <tr>
                              <td>Task Name</td> <td>Status</td>
                            </tr>
                          </thead>
                          <tbody>
                          { /**show complete tasks */}
                            { this.todoTableRows(true) }

                          </tbody>
                        </table>
                     }
           </div> 


     </div>   
      )
  
   };

}
