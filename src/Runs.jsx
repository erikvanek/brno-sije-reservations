import React from 'react';

export function Runs(props) {
    const hasRuns = props.course.runs;
    return (
        <div>
            {hasRuns && (
                <div>
                    <h3>Termíny:</h3>
                    <ul>{props.course.runs.map(run => (
                        <li key={run.id}>
                            <span>
                                {run.start} - {run.end}
                            </span>
                            <br />
                            {props.course && (
                                <span>
                                    Volna mista:{' '}
                                    {props.course.size -
                                        props.reservations.filter(
                                            reservation =>
                                                reservation.runId === run.id
                                        ).length}
                                </span>
                            )}
                        </li>
                        ))}
                    </ul>
                </div>
            )}
            {!hasRuns && <h4>Pro tento kurz nejsou aktuálně k dispozici žádné volné termíny.</h4>}
        </div>
    );
}
