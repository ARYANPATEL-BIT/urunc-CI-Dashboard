import React from 'react';

// StatusBadge component displays a colored badge showing pass/fail status
// Green for PASS, red for FAIL, gray for pending

function StatusBadge({ status }) {
    // determine the CSS class based on status
    let badgeClass = 'status-badge';
    let displayText = 'PENDING';

    if (status === 'pass') {
        badgeClass += ' status-pass';
        displayText = 'PASS';
    } else if (status === 'fail') {
        badgeClass += ' status-fail';
        displayText = 'FAIL';
    } else {
        badgeClass += ' status-pending';
        displayText = 'PENDING';
    }

    return (
        <span className={badgeClass}>
            {displayText}
        </span>
    );
}

export default StatusBadge;
