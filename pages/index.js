// import { useState, useEffect } from "react";
// will not included in client bundle // handled by NextJS
import Head from "next/head";

import { getMeetupsCollection } from "../utils/MongoAtlasDB";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // executed the function after component is rendered
  // in the beginnine, loadedMeetups is empty
  // prerenderd page byt NextJS does not contain the items
  // React will hydrate only in client side
  // useEffect(() => {
  //   //send http request & fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  // return <MeetupList meetups={loadedMeetups} />;
  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta
          name="description"
          content="Next.js App to view &and; add meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// // resereved function for NextJS
// executes function during pre-rendering process
// will first call this function before executing components
// can return a promise
export async function getStaticProps() {
  // any code here will neveexecute in client side
  // executed during build process
  // eg. fetch data from API / db
  // read data from file system
  // return an obj
  // { props: { } }

  // get mongo client & collection
  const { client, meetupsCollection } = await getMeetupsCollection();

  const meetups = await meetupsCollection.find().toArray();

  const transformedMeetups = meetups.map((meetup) => ({
    id: meetup._id.toString(),
    image: meetup.image,
    title: meetup.title,
    address: meetup.address,
  }));

  client.close();

  return {
    props: {
      // problem: data could be outdated
      // need to redeploy each time db updates
      // partially solved by ISG (see below)
      // meetups: DUMMY_MEETUPS,
      meetups: transformedMeetups,
    },
    // Incremental Static Generation
    // regenerate every "" seconds for incoming request
    //      => data is never older than "" seconds
    revalidate: 1,
  };
}

// // resereved function for NextJS
// // will not run during build process
// // will always run on the server for every incoming request
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data
//   // sensitive credentials, etc
//   // never runs on client
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
