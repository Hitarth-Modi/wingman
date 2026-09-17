import { CallPilotApp } from "@/components/CallPilotApp";
import { getCallPilotContent } from "@/data/callPilotContent";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  await requireUser();
  const content = await getCallPilotContent();

  return (
    <CallPilotApp
      industryOptions={content.industryLabels}
      playbooks={content.playbooks}
    />
  );
}
