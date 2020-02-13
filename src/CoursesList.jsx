import React from 'react';
import { Link } from 'react-router-dom';

export class CoursesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/kurzy')
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        isLoaded: true,
                        courses: result
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

    render() {
        const { courses } = this.state;
        return (
            <div>
                <h2>Seznam kurzů:</h2>
                <ul>
                    {courses.map(course => (
                        <li key={course.name}>
                            <Link to={`/kurzy/${course.url}`}>
                                {course.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
