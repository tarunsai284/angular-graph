export interface Repository {
    node : {
        id: string
        name: string
        description: string
        url: string
        watchers: Watchers;
        forks: number,
        pullRequests: PullRequests,
        stargazers: Stargazers,
        openIssues: {
            totalCount: number
        },
        totalIssues: {
            totalIssues: number
        },
        primaryLanguage: PrimaryLanguage,
        owner: Owner
    }
}

export interface Watchers {
    watchers: number;
}

export interface PullRequests {
    pullRequests: number
}

export interface Stargazers {
    stars: number
}

export interface PrimaryLanguage {
    primaryLanguage: string
}

export interface Languages {
    primaryLanguage: string
}

export interface Owner {
    id: string,
    login: string,
    avatarUrl: string
}