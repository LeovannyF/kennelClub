import React, {Component} from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import {HashRouter, Route, Link} from 'react-router-dom'


class Main extends Component { // render always needs to return something! what it returns needs to be in parenthesis
  render() {
    return(
      <HashRouter>
      <div id='container'>

        <div id='navbar'>
          <button> <Link to ='/'> Home </Link> </button>
          <button> <Link to ='/dogs'> Dogs </Link> </button>
          <button> <Link to='/dogs/create'> Add Dog </Link> </button>
        </div>

        <div id='nav-helper'>
          <Route path='/dogs' component = {AllDogs}/>
          <Route path='/dogs/create' component = {Form} />
          <Route path='/dogs/edit/:id' component = {Edit} />
          <Route exact path='/' />
        </div>
      </div>
      </HashRouter>
   )
  }
}

//****************************************************************************

class AllDogs extends Component {
  constructor() {
    super()
      this.state = {
        dogs: []
      }
  }
  componentDidMount() {
    axios.get('/api/dogs')
    .then(res => res.data)
    .then(dogs => this.setState({dogs}))
    .catch(console.log.bind(console))
  }
  render() {
    const dogs = this.state.dogs
    return (
    <div>
      <div>
        <h1> All Members! </h1>
        <hr></hr>
      </div>

      <div>
      {
        dogs.map(dog => ( /* in the above the whole statement needs to be set in curly braces because it is accepting javescript code */
          <div className='story' key={dog.id}>
          <div>
          <p> <Link to={`/dogs/edit/${dog.id}`}>{dog.name}</Link> <button onClick={()=> {this.removeDog(dog.id)}}> Delete </button>  </p>
          </div>
          </div>
        ))
      }
      </div>
    </div>
    )
  }
  removeDog(dogId) {
    axios.delete(`/api/dogs/${dogId}`)
    .then(response => this.setState({
      dogs: this.state.dogs.filter(dog => dog.id !== dogId)
    }))
    .catch()
  }

}

//****************************************************************************

class Form extends Component {
  constructor() {
    super()
    this.state = {
      name:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
    <div>
      <div id='heading'>
        <h2> Create Dog</h2>
        <hr></hr>
      </div>
      <div id='container'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'> Name </label>
          <input type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
          <button type='submit'> Submit </button>
        </form>
      </div>
    </div>
    )
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/dogs', this.state) // this send the data from the submit handler before it clears that data
    .then
    this.setState({
      name:''
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
}

//****************************************************************************

class Edit extends Component {
  constructor() {
    super()
    this.state = {
      name:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
    <div>
      <div id='heading'>
        <h2> Edit Dog</h2>
        <hr></hr>
      </div>
      <div id='container'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'> Name </label>
          <input type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
          <button type='submit'> Submit </button>
        </form>
      </div>
    </div>
    )
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event)
    const id =  this.props.match.params.id;  // this is where we are getting the information from the router in order to pass down the information
    axios.put(`/api/dogs/${id}`, this.state) // this send the data from the submit handler before it clears that data
    this.setState({ //using the spread operator reset the state with the new
      name:''
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

}

ReactDom.render(<Main />, document.getElementById('main'))
