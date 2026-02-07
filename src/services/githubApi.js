// GitHub API service for fetching workflow runs
// This module handles all API communication with GitHub

const API_URL = 'https://api.github.com/repos/urunc-dev/urunc/actions/runs';

/**
 * Fetch workflow runs from the GitHub API
 * Returns a simplified array of workflow run data
 */
export async function fetchWorkflowRuns() {
    try {
        // make the API request
        const response = await fetch(API_URL, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        // check if request was successful
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        // parse the JSON response
        const data = await response.json();

        // extract only the fields we need from each workflow run
        const workflows = data.workflow_runs.map(run => ({
            id: run.id,
            name: run.name,
            branch: run.head_branch,
            conclusion: run.conclusion,
            createdAt: run.created_at,
            url: run.html_url,
            status: run.status
        }));

        return workflows;

    } catch (error) {
        // log the error for debugging
        console.error('Failed to fetch workflow runs:', error);
        throw error;
    }
}
