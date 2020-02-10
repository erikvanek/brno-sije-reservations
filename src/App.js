import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Route,
  useParams,
  Switch,
  BrowserRouter as Router,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          Brno šije prototyp rezervačního systému
        </header>
        <Route exact path="/">
        <CoursesList></CoursesList>
        </Route>
        <Route path="/kurzy/:url" component={Course} />
      </div>
    </Router>
  );
}

export default App;

class CoursesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }


  componentDidMount() {
    fetch("http://localhost:3000/kurzy")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            courses: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.error(error)
        }
      )
  }

  render() {
    const { courses } = this.state;
    return <div>
      <h2>Seznam kurzů:</h2>
      <ul>
        {courses.map((course) => (<li key={course.name}><Link to={`/kurzy/${course.url}`}>{course.name}</Link></li>))}
      </ul>
    </div>
  }
}

class Course extends React.Component  {
  constructor(props) {
    super(props);
    console.log('ctor')
    this.state = {
      course: undefined
    };
  }

  fetchMyData(props) {
     // console.log('lol')
     const courseUrl = props.match.params.url;
     fetch(`http://localhost:3000/kurzy/${courseUrl}`)
       .then(res => res.json())
       .then(
         (result) => {
           this.setState({
             course: result.course,
             reservations: result.reservations
           });
         },
         // Note: it's important to handle errors here
         // instead of a catch() block so that we don't swallow
         // exceptions from actual bugs in components.
         (error) => {
           console.error(error)
         }
       )
  }

  componentWillReceiveProps(nextProps) {
    this.fetchMyData(nextProps)
  }

  componentDidMount() {
    this.fetchMyData(this.props);
  }

  render() {
    const { course, reservations } = this.state;
    return <div>
      <Link to="/">Seznam kurzů</Link>
      <h2>{course && course.name}</h2>
      <span>Volná místa {course && course.size - reservations.length}</span>
    </div>
  }
}