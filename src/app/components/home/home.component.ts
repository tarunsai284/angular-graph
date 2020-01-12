import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Repository } from 'src/app/common/Response';
import { Observable } from 'rxjs';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	response: Observable<Repository[]>;
	githubImage = require('../../common/github-image.svg')
	eyeImage = require('../../common/eye.svg')
	issueImage = require('../../common/problem.svg')

	constructor(private apollo: Apollo) { }

	ngOnInit() {
		this.response = this.apollo.watchQuery<any>({
			query: gql`
			query MyQuery {
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
									avatarUrl(size: 200)
								}
							}
						}
					}
				}
			}	
			`
		})
			.valueChanges
			.pipe(
				map(result => result.data.search.edges)
			);

		this.response.subscribe(x => console.log(JSON.parse(JSON.stringify(x))));	
	}
}

