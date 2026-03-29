import { redirect } from "next/navigation";

/** Legacy URL — canonical index is `/service-areas` (Website Brief / PROJECT_CONTEXT.md). */
export default function AreasLegacyPage() {
  redirect("/service-areas");
}
