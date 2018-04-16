// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Image
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#273CB4",
  quarternary: "#EFF0F3"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});
const stLogo = require("../assets/st-logo.svg");
const qglDiagramFig = require("../assets/graphql1.svg");
const gqlOptionsFig = require("../assets/graphql-options.svg");
const gqlExecutionFig = require("../assets/graphql-flow.svg");
const toTheInternet = require("../assets/to-the-INTERNET.gif");
const alarmClockApp = require("../assets/set-an-alarm.png")

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
          <Image src={qglDiagramFig}></Image>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={3} lineHeight={1} textColor="secondary">
            What is it good for?
          </Heading>
          <List>
              <ListItem textSize={36}>Can be used as an alternative to REST apis</ListItem>
              <List>
                <ListItem margin={"0px 0px 0px 50px"} textSize={28}>Strong schema built in</ListItem>
                <ListItem margin={"0px 0px 0px 50px"} textSize={28}>Client controls shape of data - no overfetching</ListItem>
                <ListItem margin={"0px 0px 0px 50px"} textSize={28}>Strong opinions - no RESTfulness arguments</ListItem>
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
                <ListItem margin={"0px 0px 0px 50px"} textSize={28}>GatsbyJS - wrangles assets to generate a static site</ListItem>
                <ListItem margin={"0px 0px 0px 50px"} textSize={28}>Prisma.io - used as a data access layer</ListItem>
                <ListItem margin={"0px 0px 0px 50px"} textSize={28}>DGraph.io - used to query a graph database</ListItem>
              </List>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={5} lineHeight={1} textColor="secondary">
            There&apos;s a dizzying array of tools...
          </Heading>
          <Image src={gqlOptionsFig}></Image>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={5} lineHeight={1} textColor="secondary">
            Two main options for node servers:
          </Heading>
          <List>
              <ListItem><strong>express-graphql</strong> - open source contributed by facebook</ListItem>
              <ListItem><strong>apollo-server</strong> - community open source by the makers of apollo client</ListItem>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={5} lineHeight={1} textColor="secondary">
            Let&apos;s see how they work...
          </Heading>
          <Image src={toTheInternet}></Image>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={5} lineHeight={1} textColor="secondary">
            Building a mental model
          </Heading>
          <Image src={gqlExecutionFig}></Image>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={5} lineHeight={1} textColor="secondary">
            Let&apos;s build a thing.
          </Heading>
          <Image src={alarmClockApp}></Image>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={3} lineHeight={1} textColor="secondary">
           We&apos;re hiring!
          </Heading>
          <Image width={800} style={{padding:"50px 0px"}} src={stLogo}></Image>
          <Text size={2} textColor="tertiary">daniel@socialtables.com | @crunchnode</Text>
        </Slide>
      </Deck>
    );
  }
}
