import React from 'react';
import WorkflowRow from './WorkflowRow';
import { groupWorkflowsByName } from '../utils/helpers';

// WorkflowTable component displays all workflows in a table format
// Groups workflow runs by name and renders a row for each workflow

function WorkflowTable({ workflows }) {
    // group all workflow runs by their workflow name
    const groupedWorkflows = groupWorkflowsByName(workflows);

    // get workflow names and sort alphabetically
    const workflowNames = Object.keys(groupedWorkflows).sort();

    // handle empty state
    if (workflowNames.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">📭</div>
                <div className="empty-message">No workflows found</div>
                <div className="empty-hint">Try adjusting your filters</div>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="workflow-table">
                <thead>
                    <tr>
                        <th>Workflow</th>
                        <th>Branch</th>
                        <th>Status</th>
                        <th>Pass Rate</th>
                        <th>Stability</th>
                        <th>Last Run</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {workflowNames.map(name => (
                        <WorkflowRow
                            key={name}
                            workflowName={name}
                            runs={groupedWorkflows[name]}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WorkflowTable;
