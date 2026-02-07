import React, { useState } from 'react';
// Using mock data instead of API - see src/data/mockWorkflows.js
import mockWorkflows from './data/mockWorkflows';
import {
    calculatePassRate,
    getPassFailStatus,
    filterWorkflows,
    getUniqueBranches
} from './utils/helpers';
import SummaryCards from './components/SummaryCards';
import Filters from './components/Filters';
import WorkflowTable from './components/WorkflowTable';

// =============================================================================
// Main App Component - CI Dashboard
// =============================================================================
// This dashboard uses mock data for demonstration purposes.
// All data comes from src/data/mockWorkflows.js - no API calls.
// 
// To switch back to real API:
// 1. Import fetchWorkflowRuns from './services/githubApi'
// 2. Add useEffect to fetch data on mount
// 3. Add loading/error states
// =============================================================================

function App() {
    // Workflow data from mock file (no API loading needed)
    const [workflows] = useState(mockWorkflows);

    // Filter states
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [branchFilter, setBranchFilter] = useState('all');

    // Apply filters to get displayed workflows
    const filteredWorkflows = filterWorkflows(
        workflows,
        searchText,
        statusFilter,
        branchFilter
    );

    // Calculate summary statistics
    const totalWorkflows = filteredWorkflows.length;
    const totalPass = filteredWorkflows.filter(
        w => getPassFailStatus(w.conclusion) === 'pass'
    ).length;
    const totalFail = filteredWorkflows.filter(
        w => getPassFailStatus(w.conclusion) === 'fail'
    ).length;
    const passRate = calculatePassRate(filteredWorkflows);

    // Get unique branches for filter dropdown
    const branches = getUniqueBranches(workflows);

    // Refresh handler (resets filters in mock mode)
    function handleRefresh() {
        setSearchText('');
        setStatusFilter('all');
        setBranchFilter('all');
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
                        <span style={{ opacity: 0.7, marginLeft: '8px' }}>(Demo Mode)</span>
                    </p>
                </div>
            </header>

            <main className="main-content">
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
                    isLoading={false}
                />

                {/* Workflow table */}
                <WorkflowTable workflows={filteredWorkflows} />
            </main>

            {/* Dashboard footer */}
            <footer className="footer">
                <p>Demo Mode • Using mock data for demonstration</p>
            </footer>
        </div>
    );
}

export default App;
