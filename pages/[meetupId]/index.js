import Head from "next/head";
import { ObjectId } from "mongodb";

import { getMeetupsCollection } from "../utils/MongoAtlasDB";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

// can be async
// to specify which dynamic paths are pre generated
export async function getStaticPaths() {
  // get mongo client & collection
  const { client, meetupsCollection } = await getMeetupsCollection();

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // there might be more valid pages
    // will generate on demand & cache it
    // true will immediately render page & then get data
    // blocking will render only after getting data
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // to get meetupId, cannot use React Hooks
  // cannot use useRouter()
  // fetch data for single meetup

  // use Context to extract url params

  const { params } = context;

  const { meetupId } = params;

  // get mongo client & collection
  const { client, meetupsCollection } = await getMeetupsCollection();

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
