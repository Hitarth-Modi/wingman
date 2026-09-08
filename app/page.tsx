import { CallPilotApp } from "@/components/CallPilotApp";
import { getCallPilotContent } from "@/data/callPilotContent";

export default async function Home() {
  const content = await getCallPilotContent();

  return (
    <CallPilotApp
      industryOptions={content.industryLabels}
      playbooks={content.playbooks}
    />
  );
}
