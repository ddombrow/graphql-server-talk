// Import React
import React from "react";

// Import Spectacle Core tags
import { Deck, Heading, ListItem, List, Slide, Text, Image } from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

const theme = createTheme(
	{
		primary: "white",
		secondary: "#1F2022",
		tertiary: "#273CB4",
		quarternary: "#EFF0F3"
	},
	{
		primary: "Montserrat",
		secondary: "Helvetica"
	}
);
const stLogo = require("../assets/st-logo.svg");
const qglDiagramFig = require("../assets/graphql1.svg");
const gqlOptionsFig = require("../assets/graphql-options.svg");
const gqlExecutionFig = require("../assets/graphql-flow.svg");
const toTheInternet = require("../assets/to-the-INTERNET.gif");
const alarmClockApp = require("../assets/set-an-alarm.png");
const questions = require("../assets/confused-puppies.gif");
export default class Presentation extends React.Component {
	render() {
		return (
			<Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>
				<Slide transition={["zoom"]} bgColor="primary">
					<Heading size={1} fit lineHeight={1} textColor="secondary">
						GraphQL
					</Heading>
					<Heading size={1} fit caps lineHeight={1} textColor="secondary">
						From the Ground Up
					</Heading>
					<Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
						demystifying the GraphQL server-side
					</Text>
				</Slide>
				<Slide transition={["zoom"]} bgColor="primary">
					<Heading size={3} lineHeight={1} textColor="secondary">
						What is it?
					</Heading>
					<Image src={qglDiagramFig} />
				</Slide>
				<Slide transition={["zoom"]} bgColor="primary">
					<Heading size={3} lineHeight={1} textColor="secondary">
						What is it good for?
					</Heading>
					<List>
						<ListItem textSize={36}>Can be used as an alternative to REST apis</ListItem>
						<List>
							<ListItem margin={"0px 0px 0px 50px"} textSize={28}>
								Strong schema built in
							</ListItem>
							<ListItem margin={"0px 0px 0px 50px"} textSize={28}>
								Client controls shape of data - no overfetching
							</ListItem>
							<ListItem margin={"0px 0px 0px 50px"} textSize={28}>
								Strong opinions - no RESTfulness arguments
							</ListItem>
						</List>
					</List>
				</Slide>
				<Slide transition={["zoom"]} bgColor="primary">
					<Heading size={3} lineHeight={1} textColor="secondary">
						What else?
					</Heading>
					<List>
						<ListItem textSize={36}>Can be used as a generic query language:</ListItem>
						<List>
							<ListItem margin={"0px 0px 0px 50px"} textSize={28}>
								GatsbyJS - wrangles assets to generate a static site
							</ListItem>
							<ListItem margin={"0px 0px 0px 50px"} textSize={28}>
								Prisma.io - used as a data access layer
							</ListItem>
							<ListItem margin={"0px 0px 0px 50px"} textSize={28}>
								DGraph.io - used to query a graph database
							</ListItem>
						</List>
					</List>
				</Slide>
				<Slide transition={["zoom"]} bgColor="primary">
					<Heading size={5} lineHeight={1} textColor="secondary">
						There&apos;s a dizzying array of tools...
					</Heading>
					<Image src={gqlOptionsFig} />
				</Slide>
				<Slide transition={["zoom"]} bgColor="primary">
					<Heading size={5} lineHeight={1} textColor="secondary">
						Two main options for node servers:
					</Heading>
					<List>
						<ListItem>
							<strong>express-graphql</strong> - open source contributed by facebook
						</ListItem>
						<ListItem>
							<strong>apollo-server</strong> - community open source by the makers of apollo client
						</ListItem>
					</List>
				</Slide>
				<Slide transition={["zoom"]} bgColor="primary">
					<Heading size={5} lineHeight={1} textColor="secondary">
						Let&apos;s see how they work...
					</Heading>
					<Image src={toTheInternet} />
				</Slide>
				<Slide transition={["zoom"]} bgColor="primary">
					<Heading size={5} lineHeight={1} textColor="secondary">
						Building a mental model
					</Heading>
					<Image src={gqlExecutionFig} />
				</Slide>
				<Slide transition={["zoom"]} bgColor="primary">
					<Heading size={5} lineHeight={1} textColor="secondary">
						Let&apos;s build a thing.
					</Heading>
					<Image src={alarmClockApp} />
				</Slide>
				<Slide transition={["zoom"]} bgColor="primary">
					<Heading size={5} lineHeight={1} textColor="secondary">
						You&apos;ll need these...
					</Heading>
					<List>
						<ListItem>
							<strong>graphql.js</strong> - the language and the type system with functions to make
							it work (parse, validate, execute, subscribe)
						</ListItem>
						<ListItem>
							<strong>graphql-tools</strong> - swiss army knife for building schemas, mocking them,
							combining them, etc.
						</ListItem>
					</List>
				</Slide>
				<Slide transition={["zoom"]} bgColor="primary">
					<Heading size={5} lineHeight={1} textColor="secondary">
						and for Subscriptions you&apos;ll need...
					</Heading>
					<List>
						<ListItem>
							<strong>subscriptions-transport-ws</strong> - a transport server for GraphQL
							subscriptions
						</ListItem>
						<ListItem>
							<strong>iterall</strong> - a polyfill for async iterators (until you&apos;re on Node
							10+)
						</ListItem>
					</List>
				</Slide>
				<Slide transition={["zoom"]} bgColor="primary">
					<Heading size={5} lineHeight={1} textColor="secondary">
						In the real world you&apos;ll probably want...
					</Heading>
					<List>
						<ListItem>
							<strong>apollo-server</strong> - http framework with implementations in your flavor of
							choice (express, koa, restify, etc.)
						</ListItem>
						<ListItem>
							<strong>graphql-subscriptions</strong> - pubsub and helpers for async iterators
						</ListItem>
					</List>
				</Slide>
				<Slide transition={["zoom"]} bgColor="primary">
					<Heading size={5} lineHeight={1} textColor="secondary">
						Questions?
					</Heading>
					<Image src={questions} />
				</Slide>
				<Slide transition={["zoom"]} bgColor="primary">
					<Heading size={3} lineHeight={1} textColor="secondary">
						We&apos;re hiring!
					</Heading>
					<Image width={800} style={{ padding: "50px 0px" }} src={stLogo} />
					<Text size={2} textColor="tertiary">
						daniel@socialtables.com | @crunchnode
					</Text>
				</Slide>
			</Deck>
		);
	}
}
