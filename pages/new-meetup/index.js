import Head from "next/head";
import { useRouter } from "next/router";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();

  const handleAddMeetup = async (newMeetupData) => {
    try {
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(newMeetupData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta name="description" content="Add your own meetup" />
      </Head>
      <NewMeetupForm onAddMeetup={handleAddMeetup} />
    </>
  );
}

export default NewMeetupPage;
