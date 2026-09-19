import Container from "@/components/ui/Container";
import SectionHeading from "@/components/content/SectionHeading";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

// Content ported directly from the project's existing about.html draft.
const TEAM: TeamMember[] = [
  {
    name: "David Mwangi",
    role: "CEO & Co-Founder",
    bio: "12+ years optimizing localized regional architectures and commercial enterprise execution strategies across East Africa.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop"
  },
  {
    name: "Aminah Osei",
    role: "Head of Engineering",
    bio: "Systems architect specialized in complex cross-platform integrations, database replication, and automated ledger units.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
  },
  {
    name: "Joseph Kamau",
    role: "Head of Success",
    bio: "Directs our localized support desks, prioritizing deployment setups, branch configurations, and emergency service delivery timelines.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop"
  },
  {
    name: "Elena Rostova",
    role: "Lead Solutions Architect",
    bio: "Manages configuration mapping for multi-tier warehouses, production plants, and complex corporate distribution nodes.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop"
  }
];

export default function TeamGrid() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Team" heading="The people behind Daltar" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="rounded-lg border border-daltar-border bg-daltar-bg-card p-5"
            >
              <div className="h-[180px] w-full overflow-hidden rounded-md">
                {/* eslint-disable-next-line @next/next/no-img-element -- swapped for next/image in Phase 16 */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h4 className="mt-4 text-base font-bold text-daltar-text-bright">{member.name}</h4>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-daltar-accent-blue">
                {member.role}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-daltar-text-muted">{member.bio}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
