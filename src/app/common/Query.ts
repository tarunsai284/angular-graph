export const Queries = {
    fetchRepository : `
        search(query: "is:Public stars:>1000 fork:>10", type: REPOSITORY, first: 50) {
            edges {
            node {
                ... on Repository {
                id
                name
                description
                name
                description
                url
                watchers {
                    watchers: totalCount
                }
                forks: forkCount
                pullRequests {
                    pullRequests: totalCount
                }
                stargazers {
                    stars: totalCount
                }
                openIssues: issues(states: OPEN) {
                    totalCount
                }
                totalIssues: issues {
                    totalIssues: totalCount
                }
                primaryLanguage {
                    primaryLanguage: name
                }
                languages(first: 3) {
                    nodes {
                    name
                    }
                }
                owner {
                    id
                    login
                }
                }
            }
            }
        }
    `
} 