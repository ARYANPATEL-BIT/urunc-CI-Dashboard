import React from 'react';

// SummaryCards component displays the top-level dashboard statistics
// Shows total workflows, passes, fails, and overall pass rate

function SummaryCards({ totalWorkflows, totalPass, totalFail, passRate }) {
    return (
        <div className="summary-cards">
            {/* Total workflows card */}
            <div className="summary-card">
                <div className="card-icon">📊</div>
                <div className="card-content">
                    <div className="card-value">{totalWorkflows}</div>
                    <div className="card-label">Total Workflows</div>
                </div>
            </div>

            {/* Passed workflows card */}
            <div className="summary-card card-pass">
                <div className="card-icon">✅</div>
                <div className="card-content">
                    <div className="card-value">{totalPass}</div>
                    <div className="card-label">Passed</div>
                </div>
            </div>

            {/* Failed workflows card */}
            <div className="summary-card card-fail">
                <div className="card-icon">❌</div>
                <div className="card-content">
                    <div className="card-value">{totalFail}</div>
                    <div className="card-label">Failed</div>
                </div>
            </div>

            {/* Pass rate percentage card */}
            <div className="summary-card card-rate">
                <div className="card-icon">📈</div>
                <div className="card-content">
                    <div className="card-value">{passRate}%</div>
                    <div className="card-label">Pass Rate</div>
                </div>
            </div>
        </div>
    );
}

export default SummaryCards;
