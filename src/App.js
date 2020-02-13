import React from 'react';
import {CoursesList}  from './CoursesList';
import {Course}  from './Course';
import './App.css';
import {
    Route,
    BrowserRouter as Router,
} from 'react-router-dom';

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
