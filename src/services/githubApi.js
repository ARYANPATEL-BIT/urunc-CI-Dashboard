// GitHub API service for fetching workflow runs
// This module handles all API communication with GitHub

const API_URL = 'https://api.github.com/repos/urunc-dev/urunc/actions/runs?per_page=100';

/**
 * Fetch workflow runs from the GitHub API
 * Returns a simplified array of workflow run data
 */
export async function fetchWorkflowRuns() {

    const token = process.env.REACT_APP_GITHUB_TOKEN;

    const response = await fetch(API_URL, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    const workflows = data.workflow_runs
        .map(run => ({
            id: run.id,
            name: run.name,
            branch: run.head_branch,
            conclusion: run.conclusion,
            createdAt: run.created_at,
            url: run.html_url,
            status: run.status
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return workflows;
}