import React from 'react';

// Filters component provides search and filter controls for the workflow table
// Includes search input, status dropdown, branch dropdown, and refresh button

function Filters({
    searchText,
    onSearchChange,
    statusFilter,
    onStatusChange,
    branchFilter,
    onBranchChange,
    branches,
    onRefresh,
    isLoading
}) {
    // handle search input changes
    function handleSearchInput(event) {
        onSearchChange(event.target.value);
    }

    // handle status dropdown changes
    function handleStatusSelect(event) {
        onStatusChange(event.target.value);
    }

    // handle branch dropdown changes
    function handleBranchSelect(event) {
        onBranchChange(event.target.value);
    }

    return (
        <div className="filters-section">
            {/* Search input */}
            <div className="filter-group">
                <label htmlFor="search-input" className="filter-label">Search</label>
                <input
                    type="text"
                    id="search-input"
                    className="filter-input"
                    placeholder="Search workflows..."
                    value={searchText}
                    onChange={handleSearchInput}
                />
            </div>

            {/* Status filter dropdown */}
            <div className="filter-group">
                <label htmlFor="status-filter" className="filter-label">Status</label>
                <select
                    id="status-filter"
                    className="filter-select"
                    value={statusFilter}
                    onChange={handleStatusSelect}
                >
                    <option value="all">All Status</option>
                    <option value="pass">Pass</option>
                    <option value="fail">Fail</option>
                </select>
            </div>

            {/* Branch filter dropdown */}
            <div className="filter-group">
                <label htmlFor="branch-filter" className="filter-label">Branch</label>
                <select
                    id="branch-filter"
                    className="filter-select"
                    value={branchFilter}
                    onChange={handleBranchSelect}
                >
                    <option value="all">All Branches</option>
                    {branches.map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                    ))}
                </select>
            </div>

            {/* Refresh button */}
            <div className="filter-group filter-actions">
                <button
                    className="refresh-button"
                    onClick={onRefresh}
                    disabled={isLoading}
                >
                    {isLoading ? '⏳ Loading...' : '🔄 Refresh'}
                </button>
            </div>
        </div>
    );
}

export default Filters;
