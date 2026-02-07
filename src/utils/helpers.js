// Helper utility functions for the CI Dashboard
// These functions handle calculations, formatting, and filtering

/**
 * Calculate the pass rate as a percentage
 * Returns a number between 0 and 100
 */
export function calculatePassRate(workflows) {
    // handle empty array case
    if (!workflows || workflows.length === 0) {
        return 0;
    }

    // count how many workflows passed
    const passedCount = workflows.filter(w => getPassFailStatus(w.conclusion) === 'pass').length;

    // calculate percentage and round to nearest integer
    const rate = (passedCount / workflows.length) * 100;
    return Math.round(rate);
}

/**
 * Determine if a workflow passed or failed based on its conclusion
 * GitHub uses various conclusion values, we simplify to pass/fail
 */
export function getPassFailStatus(conclusion) {
    // success means the workflow passed
    if (conclusion === 'success') {
        return 'pass';
    }

    // null conclusion means the run is still in progress
    if (conclusion === null) {
        return 'pending';
    }

    // anything else (failure, cancelled, timed_out, etc.) is a fail
    return 'fail';
}

/**
 * Get a weather icon based on pass rate to show stability
 * Higher pass rate = better weather
 */
export function getWeatherIcon(passRate) {
    // 90% or higher = sunny, very stable
    if (passRate >= 90) {
        return { icon: '☀️', label: 'Sunny - Very Stable' };
    }

    // 70-89% = partly cloudy, mostly stable
    if (passRate >= 70) {
        return { icon: '⛅', label: 'Cloudy - Mostly Stable' };
    }

    // 40-69% = rainy, unstable
    if (passRate >= 40) {
        return { icon: '🌧️', label: 'Rainy - Unstable' };
    }

    // below 40% = stormy, very unstable
    return { icon: '⛈️', label: 'Stormy - Very Unstable' };
}

/**
 * Format a date string into a human-readable format
 * Example: "Feb 7, 2026, 5:30 PM"
 */
export function formatDate(dateString) {
    // parse the ISO date string
    const date = new Date(dateString);

    // format using browser's locale settings
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}

/**
 * Filter workflows based on search text, status, and branch
 * Returns a filtered array of workflows
 */
export function filterWorkflows(workflows, searchText, statusFilter, branchFilter) {
    // start with all workflows
    let filtered = [...workflows];

    // filter by search text (matches workflow name)
    if (searchText && searchText.trim() !== '') {
        const searchLower = searchText.toLowerCase();
        filtered = filtered.filter(w =>
            w.name.toLowerCase().includes(searchLower)
        );
    }

    // filter by status (pass or fail)
    if (statusFilter && statusFilter !== 'all') {
        filtered = filtered.filter(w =>
            getPassFailStatus(w.conclusion) === statusFilter
        );
    }

    // filter by branch
    if (branchFilter && branchFilter !== 'all') {
        filtered = filtered.filter(w => w.branch === branchFilter);
    }

    return filtered;
}

/**
 * Group workflows by name to show aggregated stats
 * Returns an object with workflow name as key and array of runs as value
 */
export function groupWorkflowsByName(workflows) {
    const groups = {};

    workflows.forEach(workflow => {
        // create array for this workflow name if it doesn't exist
        if (!groups[workflow.name]) {
            groups[workflow.name] = [];
        }
        // add this run to the group
        groups[workflow.name].push(workflow);
    });

    return groups;
}

/**
 * Get unique branches from workflow list
 * Used to populate the branch filter dropdown
 */
export function getUniqueBranches(workflows) {
    // use Set to get unique values
    const branchSet = new Set(workflows.map(w => w.branch));

    // convert to array and sort alphabetically
    return Array.from(branchSet).sort();
}
