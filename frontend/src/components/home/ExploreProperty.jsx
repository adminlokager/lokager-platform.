import { SectionHeader } from "@/components/home/SectionHeader";
import { CategoryCard } from "@/components/home/CategoryCard";
import { Reveal } from "@/components/home/motion";
import { CATEGORIES } from "@/data/home";

export const ExploreProperty = ({ onCategory }) => (
  <section id="explore" data-testid="category-cards-section" className="bg-ivory-light">
    <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-12">
      <SectionHeader
        eyebrow="Explore Property"
        title="Every kind of property, one platform."
        description="Start from where you are in your property journey — buying, renting, investing or building."
        testId="explore-header"
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.id} delay={(i % 3) * 0.08} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
            <CategoryCard title={c.title} note={c.note} image={c.image} onClick={() => onCategory?.(c)} testId={`category-card-${c.id}`} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
