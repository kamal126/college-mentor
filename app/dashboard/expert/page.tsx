import Form from "@/components/expert/create-form";
import Breadcrumbs from "@/components/expert/breadcrumbs";
import { fetchUsers, fetchUserById } from "@/lib/data";
import { User } from "@/models/user.model";

export default async function Page() {
  // const user = await fetchUserById("1");
  // const user = await User.find()
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Expert", href: "/dashboard/mentor" },
          { label: "Join Expert", href: "/dashboard/expert" },
        ]}
      />
      <Form/>
    </main>
  );
}
