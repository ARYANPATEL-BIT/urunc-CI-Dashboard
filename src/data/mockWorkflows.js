// Helper to generate dates relative to now
function daysAgo(days, hours = 0) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    date.setHours(date.getHours() - hours);
    return date.toISOString();
}

// Workflow names used in the urunc project
const workflowNames = [
    'urunc CI',
    'Dependency Review',
    'CodeQL',
    'Unit Tests',
    'Build',
    'Lint',
    'Integration Tests'
];

// Branches commonly used
const branches = [
    'main',
    'dev',
    'feature-x',
    'test-branch',
    'hotfix-auth',
    'refactor-core'
];

// Generate realistic workflow data
const mockWorkflows = [
    // Recent successful runs on main branch
    { id: 1001, name: 'urunc CI', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(0, 1), url: 'https://github.com/urunc-dev/urunc/actions/runs/1001' },
    { id: 1002, name: 'Unit Tests', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(0, 2), url: 'https://github.com/urunc-dev/urunc/actions/runs/1002' },
    { id: 1003, name: 'Build', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(0, 3), url: 'https://github.com/urunc-dev/urunc/actions/runs/1003' },
    { id: 1004, name: 'Lint', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(0, 4), url: 'https://github.com/urunc-dev/urunc/actions/runs/1004' },
    { id: 1005, name: 'CodeQL', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(0, 5), url: 'https://github.com/urunc-dev/urunc/actions/runs/1005' },

    // Feature branch with mixed results
    { id: 1006, name: 'urunc CI', branch: 'feature-x', conclusion: 'failure', status: 'completed', createdAt: daysAgo(0, 6), url: 'https://github.com/urunc-dev/urunc/actions/runs/1006' },
    { id: 1007, name: 'Unit Tests', branch: 'feature-x', conclusion: 'failure', status: 'completed', createdAt: daysAgo(0, 7), url: 'https://github.com/urunc-dev/urunc/actions/runs/1007' },
    { id: 1008, name: 'Lint', branch: 'feature-x', conclusion: 'success', status: 'completed', createdAt: daysAgo(0, 8), url: 'https://github.com/urunc-dev/urunc/actions/runs/1008' },

    // Currently running workflow
    { id: 1009, name: 'Integration Tests', branch: 'dev', conclusion: null, status: 'in_progress', createdAt: daysAgo(0, 0), url: 'https://github.com/urunc-dev/urunc/actions/runs/1009' },
    { id: 1010, name: 'urunc CI', branch: 'dev', conclusion: null, status: 'queued', createdAt: daysAgo(0, 0), url: 'https://github.com/urunc-dev/urunc/actions/runs/1010' },

    // Yesterday's runs
    { id: 1011, name: 'urunc CI', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(1, 2), url: 'https://github.com/urunc-dev/urunc/actions/runs/1011' },
    { id: 1012, name: 'Dependency Review', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(1, 3), url: 'https://github.com/urunc-dev/urunc/actions/runs/1012' },
    { id: 1013, name: 'CodeQL', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(1, 4), url: 'https://github.com/urunc-dev/urunc/actions/runs/1013' },
    { id: 1014, name: 'Unit Tests', branch: 'dev', conclusion: 'success', status: 'completed', createdAt: daysAgo(1, 5), url: 'https://github.com/urunc-dev/urunc/actions/runs/1014' },
    { id: 1015, name: 'Build', branch: 'dev', conclusion: 'failure', status: 'completed', createdAt: daysAgo(1, 6), url: 'https://github.com/urunc-dev/urunc/actions/runs/1015' },

    // 2 days ago
    { id: 1016, name: 'urunc CI', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(2, 1), url: 'https://github.com/urunc-dev/urunc/actions/runs/1016' },
    { id: 1017, name: 'Integration Tests', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(2, 2), url: 'https://github.com/urunc-dev/urunc/actions/runs/1017' },
    { id: 1018, name: 'Lint', branch: 'test-branch', conclusion: 'failure', status: 'completed', createdAt: daysAgo(2, 3), url: 'https://github.com/urunc-dev/urunc/actions/runs/1018' },
    { id: 1019, name: 'Unit Tests', branch: 'test-branch', conclusion: 'success', status: 'completed', createdAt: daysAgo(2, 4), url: 'https://github.com/urunc-dev/urunc/actions/runs/1019' },
    { id: 1020, name: 'Build', branch: 'test-branch', conclusion: 'success', status: 'completed', createdAt: daysAgo(2, 5), url: 'https://github.com/urunc-dev/urunc/actions/runs/1020' },

    // 3 days ago - hotfix branch
    { id: 1021, name: 'urunc CI', branch: 'hotfix-auth', conclusion: 'success', status: 'completed', createdAt: daysAgo(3, 1), url: 'https://github.com/urunc-dev/urunc/actions/runs/1021' },
    { id: 1022, name: 'Unit Tests', branch: 'hotfix-auth', conclusion: 'success', status: 'completed', createdAt: daysAgo(3, 2), url: 'https://github.com/urunc-dev/urunc/actions/runs/1022' },
    { id: 1023, name: 'Integration Tests', branch: 'hotfix-auth', conclusion: 'success', status: 'completed', createdAt: daysAgo(3, 3), url: 'https://github.com/urunc-dev/urunc/actions/runs/1023' },
    { id: 1024, name: 'Build', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(3, 4), url: 'https://github.com/urunc-dev/urunc/actions/runs/1024' },
    { id: 1025, name: 'CodeQL', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(3, 5), url: 'https://github.com/urunc-dev/urunc/actions/runs/1025' },

    // 4 days ago
    { id: 1026, name: 'urunc CI', branch: 'main', conclusion: 'failure', status: 'completed', createdAt: daysAgo(4, 1), url: 'https://github.com/urunc-dev/urunc/actions/runs/1026' },
    { id: 1027, name: 'urunc CI', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(4, 3), url: 'https://github.com/urunc-dev/urunc/actions/runs/1027' },
    { id: 1028, name: 'Dependency Review', branch: 'dev', conclusion: 'success', status: 'completed', createdAt: daysAgo(4, 4), url: 'https://github.com/urunc-dev/urunc/actions/runs/1028' },
    { id: 1029, name: 'Lint', branch: 'dev', conclusion: 'success', status: 'completed', createdAt: daysAgo(4, 5), url: 'https://github.com/urunc-dev/urunc/actions/runs/1029' },
    { id: 1030, name: 'Unit Tests', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(4, 6), url: 'https://github.com/urunc-dev/urunc/actions/runs/1030' },

    // 5 days ago - refactor branch
    { id: 1031, name: 'urunc CI', branch: 'refactor-core', conclusion: 'failure', status: 'completed', createdAt: daysAgo(5, 1), url: 'https://github.com/urunc-dev/urunc/actions/runs/1031' },
    { id: 1032, name: 'urunc CI', branch: 'refactor-core', conclusion: 'failure', status: 'completed', createdAt: daysAgo(5, 3), url: 'https://github.com/urunc-dev/urunc/actions/runs/1032' },
    { id: 1033, name: 'Unit Tests', branch: 'refactor-core', conclusion: 'failure', status: 'completed', createdAt: daysAgo(5, 4), url: 'https://github.com/urunc-dev/urunc/actions/runs/1033' },
    { id: 1034, name: 'Build', branch: 'refactor-core', conclusion: 'success', status: 'completed', createdAt: daysAgo(5, 5), url: 'https://github.com/urunc-dev/urunc/actions/runs/1034' },
    { id: 1035, name: 'Lint', branch: 'refactor-core', conclusion: 'success', status: 'completed', createdAt: daysAgo(5, 6), url: 'https://github.com/urunc-dev/urunc/actions/runs/1035' },

    // 6-7 days ago
    { id: 1036, name: 'urunc CI', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(6, 2), url: 'https://github.com/urunc-dev/urunc/actions/runs/1036' },
    { id: 1037, name: 'Integration Tests', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(6, 4), url: 'https://github.com/urunc-dev/urunc/actions/runs/1037' },
    { id: 1038, name: 'CodeQL', branch: 'dev', conclusion: 'success', status: 'completed', createdAt: daysAgo(6, 6), url: 'https://github.com/urunc-dev/urunc/actions/runs/1038' },
    { id: 1039, name: 'urunc CI', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(7, 1), url: 'https://github.com/urunc-dev/urunc/actions/runs/1039' },
    { id: 1040, name: 'Dependency Review', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(7, 3), url: 'https://github.com/urunc-dev/urunc/actions/runs/1040' },

    // Older runs
    { id: 1041, name: 'urunc CI', branch: 'feature-x', conclusion: 'success', status: 'completed', createdAt: daysAgo(8, 2), url: 'https://github.com/urunc-dev/urunc/actions/runs/1041' },
    { id: 1042, name: 'Build', branch: 'feature-x', conclusion: 'success', status: 'completed', createdAt: daysAgo(8, 4), url: 'https://github.com/urunc-dev/urunc/actions/runs/1042' },
    { id: 1043, name: 'Unit Tests', branch: 'feature-x', conclusion: 'failure', status: 'completed', createdAt: daysAgo(9, 1), url: 'https://github.com/urunc-dev/urunc/actions/runs/1043' },
    { id: 1044, name: 'Lint', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(9, 3), url: 'https://github.com/urunc-dev/urunc/actions/runs/1044' },
    { id: 1045, name: 'urunc CI', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(10, 2), url: 'https://github.com/urunc-dev/urunc/actions/runs/1045' },
    { id: 1046, name: 'CodeQL', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(10, 5), url: 'https://github.com/urunc-dev/urunc/actions/runs/1046' },
    { id: 1047, name: 'Integration Tests', branch: 'dev', conclusion: 'success', status: 'completed', createdAt: daysAgo(11, 1), url: 'https://github.com/urunc-dev/urunc/actions/runs/1047' },
    { id: 1048, name: 'urunc CI', branch: 'dev', conclusion: 'failure', status: 'completed', createdAt: daysAgo(12, 2), url: 'https://github.com/urunc-dev/urunc/actions/runs/1048' },
    { id: 1049, name: 'Build', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(13, 3), url: 'https://github.com/urunc-dev/urunc/actions/runs/1049' },
    { id: 1050, name: 'urunc CI', branch: 'main', conclusion: 'success', status: 'completed', createdAt: daysAgo(14, 1), url: 'https://github.com/urunc-dev/urunc/actions/runs/1050' }
];

// Sort by date (newest first) and export
mockWorkflows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

export default mockWorkflows;
