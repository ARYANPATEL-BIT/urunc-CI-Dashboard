import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import {
    calculatePassRate,
    getPassFailStatus,
    getWeatherIcon,
    formatDate
} from '../utils/helpers';

// WorkflowRow component displays a single workflow with expandable run history
// Shows workflow name, branch, status, pass rate, stability, and last run date

function WorkflowRow({ workflowName, runs }) {
    // track whether the row is expanded to show run history
    const [isExpanded, setIsExpanded] = useState(false);

    // toggle the expanded state when user clicks
    function toggleExpand() {
        setIsExpanded(!isExpanded);
    }

    // calculate statistics for this workflow
    const passRate = calculatePassRate(runs);
    const weather = getWeatherIcon(passRate);

    // get the most recent run for status and date
    const latestRun = runs[0];
    const status = getPassFailStatus(latestRun.conclusion);
    const lastRunDate = formatDate(latestRun.createdAt);
    const branch = latestRun.branch;

    // get the last 10 runs for the expanded view
    const recentRuns = runs.slice(0, 10);

    return (
        <>
            {/* Main row with workflow info */}
            <tr className="workflow-row" onClick={toggleExpand}>
                <td className="cell-name">
                    <a
                        href={latestRun.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="workflow-link"
                    >
                        {workflowName}
                    </a>
                </td>
                <td className="cell-branch">
                    <span className="branch-tag">{branch}</span>
                </td>
                <td className="cell-status">
                    <StatusBadge status={status} />
                </td>
                <td className="cell-passrate">{passRate}%</td>
                <td className="cell-stability" title={weather.label}>
                    <span className="weather-icon">{weather.icon}</span>
                </td>
                <td className="cell-date">{lastRunDate}</td>
                <td className="cell-expand">
                    <button className="expand-button" aria-label={isExpanded ? 'Collapse' : 'Expand'}>
                        {isExpanded ? '▲' : '▼'}
                    </button>
                </td>
            </tr>

            {/* Expanded row showing recent run history */}
            {isExpanded && (
                <tr className="expanded-row">
                    <td colSpan="7">
                        <div className="run-history">
                            <div className="history-title">Last {recentRuns.length} Runs</div>
                            <div className="run-indicators">
                                {recentRuns.map(run => (
                                    <a
                                        key={run.id}
                                        href={run.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`run-indicator ${getPassFailStatus(run.conclusion)}`}
                                        title={`${formatDate(run.createdAt)} - ${run.conclusion || 'pending'}`}
                                    >
                                        {getPassFailStatus(run.conclusion) === 'pass' ? '✓' :
                                            getPassFailStatus(run.conclusion) === 'fail' ? '✗' : '○'}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}

export default WorkflowRow;
