import React, { useState, useEffect, useCallback } from 'react';
import { fetchWorkflowRuns } from './services/githubApi';
import {
    calculatePassRate,
    getPassFailStatus,
    filterWorkflows,
    getUniqueBranches
} from './utils/helpers';
import SummaryCards from './components/SummaryCards';
import Filters from './components/Filters';
import WorkflowTable from './components/WorkflowTable';

// Main App component for the CI Dashboard
// Handles data fetching, state management, and layout

function App() {
    // workflow data from the API
    const [workflows, setWorkflows] = useState([]);

    // loading and error states
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // filter states
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [branchFilter, setBranchFilter] = useState('all');

    // fetch workflow data from GitHub API
    const loadWorkflows = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchWorkflowRuns();
            setWorkflows(data);
        } catch (err) {
            setError('Failed to load workflow data. Please try again.');
            console.error('Error loading workflows:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // load data on initial mount
    useEffect(() => {
        loadWorkflows();
    }, [loadWorkflows]);

    // set up auto-refresh every 60 seconds
    useEffect(() => {
        const refreshInterval = setInterval(() => {
            loadWorkflows();
        }, 60000);

        // clean up interval on unmount
        return () => clearInterval(refreshInterval);
    }, [loadWorkflows]);

    // apply filters to get the displayed workflows
    const filteredWorkflows = filterWorkflows(
        workflows,
        searchText,
        statusFilter,
        branchFilter
    );

    // calculate summary statistics
    const totalWorkflows = filteredWorkflows.length;
    const totalPass = filteredWorkflows.filter(
        w => getPassFailStatus(w.conclusion) === 'pass'
    ).length;
    const totalFail = filteredWorkflows.filter(
        w => getPassFailStatus(w.conclusion) === 'fail'
    ).length;
    const passRate = calculatePassRate(filteredWorkflows);

    // get unique branches for the filter dropdown
    const branches = getUniqueBranches(workflows);

    // handle refresh button click
    function handleRefresh() {
        loadWorkflows();
    }

    return (
        <div className="app">
            {/* Dashboard header */}
            <header className="header">
                <div className="header-content">
                    <h1 className="header-title">
                        <span className="header-icon">🚀</span>
                        CI Dashboard
                    </h1>
                    <p className="header-subtitle">
                        Monitor GitHub Actions workflow runs for urunc.
                    </p>
                </div>
            </header>

            <main className="main-content">
                {/* Error message display */}
                {error && (
                    <div className="error-banner">
                        <span className="error-icon">⚠️</span>
                        <span className="error-message">{error}</span>
                        <button className="error-retry" onClick={handleRefresh}>
                            Retry
                        </button>
                    </div>
                )}

                {/* Summary statistics cards */}
                <SummaryCards
                    totalWorkflows={totalWorkflows}
                    totalPass={totalPass}
                    totalFail={totalFail}
                    passRate={passRate}
                />

                {/* Filter controls */}
                <Filters
                    searchText={searchText}
                    onSearchChange={setSearchText}
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                    branchFilter={branchFilter}
                    onBranchChange={setBranchFilter}
                    branches={branches}
                    onRefresh={handleRefresh}
                    isLoading={isLoading}
                />

                {/* Loading state */}
                {isLoading && workflows.length === 0 ? (
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <div className="loading-text">Loading workflows...</div>
                    </div>
                ) : (
                    /* Workflow table */
                    <WorkflowTable workflows={filteredWorkflows} />
                )}
            </main>

            {/* Dashboard footer */}
            <footer className="footer">
                <p>Data from GitHub Actions API • Auto-refreshes every 60 seconds</p>
            </footer>
        </div>
    );
}

export default App;
