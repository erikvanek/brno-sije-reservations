import React from 'react';
import { Runs } from './Runs';

import { Link } from 'react-router-dom';

export class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: undefined
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
                    <Runs course={course} reservations={reservations}></Runs>
                )}
            </div>
        );
    }
}
