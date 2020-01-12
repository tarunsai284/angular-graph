import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from "apollo-link-context";
import { AppConstants } from './common/AppConstants';
import { HomeComponent } from './components/home/home.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ApolloModule,
		HttpLinkModule,
		AngularFontAwesomeModule
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule {
	constructor(apollo: Apollo, httpLink: HttpLink) {
		let authLink = this.addToken();
		apollo.create({
			link: 		authLink.concat(httpLink.create({ uri: 'https://api.github.com/graphql' })),
			cache: new InMemoryCache()
		});
	}

	addToken() {
		let authLink = setContext((_, { headers }) => {
			// get the authentication token from local storage if it exists
			const token = AppConstants.token;
			// return the headers to the context so httpLink can read them
			return {
				headers: {
					...headers,
					authorization: token ? `Bearer ${token}` : "",
				}
			}
		});
		return authLink;
	}
}
