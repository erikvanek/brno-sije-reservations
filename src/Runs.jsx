import React from 'react';

export class Runs extends React.Component {
    render() {
        const props = this.props;
        const hasRuns = props.course.runs;
    return (
        <div>
            {hasRuns && (
                <div>
                    <h3>Termíny:</h3>
                    <select onChange={(course) => props.runChanged(course)}>
                        {props.course.runs.map(run => (<option value={run.id} key={run.id}>{run.start} - {run.end}; {props.course.size - props.reservations.filter(
                                            reservation =>
                                                reservation.runId === run.id
                                        ).length} volných míst</option>))}
                    </select>
                    <button onClick={() => props.buyCourse()}>Zakoupit kurz</button>
                </div>
            )}
            {!hasRuns && <h4>Pro tento kurz nejsou aktuálně k dispozici žádné volné termíny.</h4>}
        </div>
    );
}

}
