import React from "react";
import { Runs } from "./Runs";

import { Link } from "react-router-dom";

export class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: undefined,
      selectedRunId: undefined
    };
  }

  fetchMyData(props) {
    const courseUrl = props.match.params.url;
    fetch(`http://localhost:3000/kurzy/${courseUrl}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            course: result.course,
            reservations: result.reservations
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          console.error(error);
        }
      );
  }

  componentWillReceiveProps(nextProps) {
    this.fetchMyData(nextProps);
  }

  componentDidMount() {
    this.fetchMyData(this.props);
  }

  render() {
    const { course, reservations } = this.state;
    return (
      <div>
        <Link to="/">Seznam kurzů</Link>
        <h2>{course && course.name}</h2>
        {course && (
          <div>
            <Runs course={course} reservations={reservations} runChanged={(run) => this.runChanged(run)} buyCourse={this.buyCourse.bind(this)}></Runs>
          </div>
        )}
      </div>
    );
  }

  runChanged(run) {
    this.setState({...this.state, selectedRunId: Number.parseInt(run.target.value, 10)});
  }

  buyCourse() {
      // not ideal to rely on initial order
    const run = this.state.selectedRunId ? this.state.course.runs.find(run => run.id === this.state.selectedRunId) : this.state.course.runs[0];
    console.log(run)
  }

}
