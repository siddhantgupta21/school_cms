import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to events page
  redirect("/events")
}

